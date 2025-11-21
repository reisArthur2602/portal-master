import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { prisma } from "../../../database/prisma.ts";
import { BadRequestError } from "../_errors/bad-request-error.ts";

export const removePatient = (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()

    .delete(
      "/paciente/:id/deletar",
      {
        schema: {
          tags: ["Pacientes"],
          summary: "Excluir um paciente",
          params: z.object({
            id: z.uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
        preHandler: [async (request) => request.hasPermission(["Admin"])],
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId();

        await request.hasPermission(["Admin", "Member"]);

        const { id } = request.params;

        const patient = await prisma.patient.findUnique({
          where: { id },
        });

        if (!patient) {
          throw new BadRequestError("O paciente não foi encontrado.");
        }

        await prisma.patient.delete({ where: { id: patient.id } });

        await prisma.log.create({
          data: {
            event: "PatientRemoved",
            message: `Paciente removido: ${patient.name} (ID: ${patient.id})`,
            userId,
          },
        });

        return reply.status(204).send();
      }
    );
};
