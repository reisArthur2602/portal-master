import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../../database/prisma.ts";
import { ExamStatus, ExamType } from "../../../generated/prisma/enums.ts";
import { BadRequestError } from "../_errors/bad-request-error.ts";

export const getExamForPickup = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/exames/consulta",
    {
      schema: {
        tags: ["Exames"],
        summary: "Buscar exame para retirada (CPF + registro)",
        querystring: z.object({
          cpf: z.string().length(11, "CPF inválido"),
          registro: z.coerce.number(),
        }),
        response: {
          200: z.object({
            exam: z.object({
              id: z.uuid(),
              createdAt: z.date(),
              description: z.string(),
              status: z.nativeEnum(ExamStatus),
              type: z.nativeEnum(ExamType),
              performedBy: z.string(),
              patient: z.object({
                name: z.string(),
                cpf: z.string(),
              }),
              attachments: z.array(
                z.object({
                  id: z.uuid(),
                  filename: z.string(),
                  url: z.string(),
                })
              ),
            }),
          }),
        },
      },
    },

    async (request, reply) => {
      const { cpf, registro } = request.query;

      const exam = await prisma.exam.findUnique({
        where: { registry: registro, patient: { cpf } },

        select: {
          id: true,
          createdAt: true,
          description: true,
          status: true,
          type: true,
          performedBy: true,
          patient: { select: { name: true, cpf: true } },
          attachments: {
            select: {
              id: true,
              filename: true,
              url: true,
            },
          },
        },
      });

      if (!exam) {
        throw new BadRequestError("Nenhum exame encontrado");
      }

      return reply.send({ exam });
    }
  );
};
