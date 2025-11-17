import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { prisma } from "../../../database/prisma.js";

export const listInvites = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/convites",
    {
      schema: {
        tags: ["Convite"],
        summary: "Listar convites pendentes",
        response: {
          200: z.object({
            invites: z.array(
              z.object({
                id: z.uuid(),
                email: z.string(),
                createdAt: z.date(),
                expiredAt: z.date(),
              })
            ),
          }),
        },
      },

      preHandler: [async (request) => request.hasPermission(["Admin"])],
    },
    async (_, reply) => {
      const invites = await prisma.invite.findMany({
        orderBy: { createdAt: "desc" },
      });

      return reply.send({ invites });
    }
  );
};
