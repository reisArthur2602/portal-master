import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { prisma } from "../../../database/prisma.ts";
import { BadRequestError } from "../_errors/bad-request-error.ts";

export const me = (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()

    .get(
      "/auth/me",
      {
        schema: {
          tags: ["Autenticação"],
          summary: "Retorna informações do usuário autenticado",
          response: {
            200: z.object({
              user: z.object({
                id: z.string(),
                name: z.string(),
                email: z.string(),
                role: z.string(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId();

        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        });

        if (!user) {
          throw new BadRequestError("Usuário não encontrado.");
        }
        return reply.status(200).send({
          user,
        });
      }
    );
};
