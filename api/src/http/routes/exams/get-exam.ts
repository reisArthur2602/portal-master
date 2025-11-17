import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../../database/prisma.ts";
import { ExamStatus, ExamType } from "../../../generated/prisma/enums.ts";
import { BadRequestError } from "../_errors/bad-request-error.ts";

export const getExam = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/exames/:id",
    {
      schema: {
        tags: ["Exames"],
        summary: "Buscar exame",
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z.object({
            exam: z.object({
              id: z.uuid(),
              description: z.string(),
              status: z.nativeEnum(ExamStatus),
              type: z.nativeEnum(ExamType),
              performedBy: z.string(),
              createdAt: z.date(),
            }),
          }),
        },
      },
      preHandler: [
        async (request) => request.hasPermission(["Admin", "Member"]),
      ],
    },
    async (request, reply) => {
      const { id } = request.params;

      const exam = await prisma.exam.findUnique({
        where: { id },
        select: {
          id: true,
          createdAt: true,
          description: true,
          status: true,
          type: true,
          performedBy: true,
        },
      });

      if (!exam) {
        throw new BadRequestError("O exame não foi encontrado");
      }

      return reply.status(200).send({ exam });
    }
  );
};
