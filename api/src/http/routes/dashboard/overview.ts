import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { prisma } from "../../../database/prisma.ts";
import { ExamStatus } from "../../../generated/prisma/enums.ts";

export const overviewData = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/dashboard/visao-geral",
    {
      schema: {
        tags: ["Dashboard"],
        summary: "Visão geral do sistema",
        response: {
          200: z.object({
            pending: z.number(),
            ready: z.number(),
            awaitingPickup: z.number(),
            deliveredToday: z.number(),
            totalDelivered: z.number(),
          }),
        },
      },
      preHandler: [
        async (request) => request.hasPermission(["Admin", "Member"]),
      ],
    },

    async (_, reply) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const [pending, ready, awaitingPickup, deliveredToday, totalDelivered] =
        await Promise.all([
          prisma.exam.count({
            where: { status: ExamStatus.Pending },
          }),

          prisma.exam.count({
            where: { status: ExamStatus.Ready },
          }),

          prisma.exam.count({
            where: { status: ExamStatus.AwaitingPickup },
          }),

          prisma.exam.count({
            where: {
              status: ExamStatus.Delivered,
              createdAt: {
                gte: today,
                lt: tomorrow,
              },
            },
          }),

          prisma.exam.count({
            where: { status: ExamStatus.Delivered },
          }),
        ]);

      return reply.send({
        pending,
        ready,
        awaitingPickup,
        deliveredToday,
        totalDelivered,
      });
    }
  );
};
