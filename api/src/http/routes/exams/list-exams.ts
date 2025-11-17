import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../../database/prisma.ts";
import { ExamStatus, ExamType } from "../../../generated/prisma/enums.ts";

export const listExams = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/exames",
    {
      schema: {
        tags: ["Exames"],
        summary: "Listar exames",
        querystring: z.object({
          status: z.nativeEnum(ExamStatus).optional(),
          tipo: z.nativeEnum(ExamType).optional(),
        }),
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            exams: z.array(
              z.object({
                id: z.uuid(),
                description: z.string(),
                status: z.nativeEnum(ExamStatus),
                type: z.nativeEnum(ExamType),
                performedBy: z.string(),
                createdAt: z.date(),
              })
            ),
          }),
        },
      },
      preHandler: [
        async (request) => request.hasPermission(["Admin", "Member"]),
      ],
    },
    async (request, reply) => {
      const { status, tipo } = request.query;

      const exams = await prisma.exam.findMany({
        where: {
          status: status ?? undefined,
          type: tipo ?? undefined,
        },

        select: {
          id: true,
          createdAt: true,
          description: true,
          status: true,
          type: true,
          performedBy: true,
        },
      });

      return reply.status(200).send({ exams });
    }
  );
};
