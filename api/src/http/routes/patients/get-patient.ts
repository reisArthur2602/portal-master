import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { prisma } from "../../../database/prisma.ts";
import { ExamStatus } from "../../../generated/prisma/enums.ts";
import { BadRequestError } from "../_errors/bad-request-error.ts";

export const getPatient = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/pacientes/:id",
    {
      schema: {
        tags: ["Pacientes"],
        summary: "Buscar paciente e seus exames",
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            patient: z.object({
              id: z.uuid(),
              name: z.string(),
              cpf: z.string(),
              phone: z.string(),
              birthDate: z.date(),
              createdAt: z.date(),
              exams: z.array(
                z.object({
                  id: z.uuid(),
                  registry: z.number(),
                  description: z.string(),
                  performedBy: z.string(),
                  status: z.nativeEnum(ExamStatus),
                  createdAt: z.date(),
                  attachments: z.array(
                    z.object({
                      id: z.string(),
                      filename: z.string(),
                      url: z.string(),
                    })
                  ),
                })
              ),
            }),
          }),
        },
      },
      onRequest: [
        async (request) => request.hasPermission(["Admin", "Member"]),
      ],
    },
    async (request, reply) => {
      const { id } = request.params;

      const patient = await prisma.patient.findUnique({
        where: { id },
        include: {
          exams: {
            include: {
              attachments: {
                select: { id: true, filename: true, url: true },
              },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (!patient) {
        throw new BadRequestError("Paciente não encontrado.");
      }

      return reply.send({ patient });
    }
  );
};
