import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { prisma } from "../../../database/prisma.js";
import { UserRole } from "../../../generated/prisma/enums.ts";
import { authPlugin } from "../../plugins/auth.ts";
import { BadRequestError } from "../_errors/bad-request-error.js";

export const updateUserRole = (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .patch(
      "/usuarios/:id/role",
      {
        schema: {
          tags: ["Usuários"],
          summary: "Atualizar função do usuário",
          params: z.object({
             id: z.uuid(),
          }),
          body: z.object({
            role: z.nativeEnum(UserRole),
          }),
          response: {
            204: z.null(),
          },
        },
        onRequest: [async (request) => request.hasPermission(["Admin"])],
      },
      async (request, reply) => {
        const { id } = request.params;
        const { role } = request.body;

        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) throw new BadRequestError("Usuário não encontrado.");

        await prisma.user.update({
          where: { id },
          data: { role },
        });

        return reply.status(204).send();
      }
    );
};
