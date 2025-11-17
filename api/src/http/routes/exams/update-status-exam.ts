import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { prisma } from "../../../database/prisma.ts";
import { ExamStatus } from "../../../generated/prisma/enums.ts";
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

      const exam = await prisma.exam.findUnique({ where: { id } });

      if (!exam) {
        throw new BadRequestError("O exame não foi encontrado.");
      }

      await prisma.exam.update({
        where: { id },
        data: { status },
      });

      return reply.status(204).send();
    }
  );
};
