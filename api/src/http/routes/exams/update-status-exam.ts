import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { prisma } from "../../../database/prisma.ts";
import { ExamStatus, SystemEvent } from "../../../generated/prisma/enums.ts";
import { BadRequestError } from "../_errors/bad-request-error.ts";

export const updateExamStatus = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/exames/:id/status",
    {
      schema: {
        tags: ["Exames"],
        summary: "Atualizar status do exame",
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          status: z.nativeEnum(ExamStatus),
        }),
        response: {
          204: z.null(),
        },
      },
      onRequest: [
        async (request) => request.hasPermission(["Admin", "Member"]),
      ],
    },

    async (request, reply) => {
      const { id } = request.params;
      const { status } = request.body;
      const userId = await request.getCurrentUserId();

      const exam = await prisma.exam.findUnique({
        where: { id },
      });

      if (!exam) {
        throw new BadRequestError("O exame não foi encontrado.");
      }

      const updated = await prisma.exam.update({
        where: { id },
        data: { status },
      });

      const statusLogMap = {
        Pending: {
          event: "ExamCreated",
          message: "Exame criado e aguardando anexação de documentos.",
        },
        Ready: {
          event: "ExamReady",
          message: "Exame pronto e disponível para visualização pelo paciente.",
        },
        AwaitingPickup: {
          event: "ExamPickup",
          message: "Paciente solicitou retirada e está aguardando autorização.",
        },
        Delivered: {
          event: "ExamDelivered",
          message: "Exame retirado pelo paciente.",
        },
      } satisfies Record<ExamStatus, { event: SystemEvent; message: string }>;

      const { event, message } = statusLogMap[status];

      await prisma.log.create({
        data: {
          event,
          message: `${message} (Exame ID: ${updated.id}, Registro: ${updated.registry})`,
          userId,
        },
      });

      return reply.status(204).send();
    }
  );
};
