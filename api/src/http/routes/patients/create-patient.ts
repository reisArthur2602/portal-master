import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { prisma } from "../../../database/prisma.ts";
import { BadRequestError } from "../_errors/bad-request-error.ts";

export const createPatient = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/paciente/novo",
    {
      schema: {
        tags: ["Pacientes"],
        summary: "Criar novo paciente",
        body: z.object({
          name: z.string().min(3),
          cpf: z.string().min(11).max(11),
          phone: z.string().min(8),
          birthDate: z.string(),
        }),
        response: {
          204: z.null(),
        },
      },
      preHandler: [async (request) => request.hasPermission(["Admin"])],
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();

      const { name, cpf, phone, birthDate } = request.body;

      const exists = await prisma.patient.findUnique({
        where: { cpf },
      });

      if (exists) {
        throw new BadRequestError(
          "Já existe um paciente cadastrado com este CPF."
        );
      }

      const patient = await prisma.patient.create({
        data: {
          name,
          cpf,
          phone,
          birthDate: new Date(birthDate),
        },
      });

      await prisma.log.create({
        data: {
          event: "PatientCreated",
          message: `Paciente criado: ${patient.name} `,
          userId,
        },
      });

      return reply.status(204).send();
    }
  );
};
