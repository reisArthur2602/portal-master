import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { prisma } from "../../../database/prisma.js";
import { authPlugin } from "../../plugins/auth.ts";
import { BadRequestError } from "../_errors/bad-request-error.js";

export const revokeInvite = (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .delete(
      "/convites/:id/revogar",
      {
        schema: {
          tags: ["Convite"],
          summary: "Revogar convite",
          params: z.object({
            id: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
        preHandler: [async (request) => request.hasPermission(["Admin"])],
      },
      async (request, reply) => {
        const { id } = request.params;
        const invite = await prisma.invite.findUnique({ where: { id } });
        if (!invite) throw new BadRequestError("Convite não encontrado.");

        await prisma.invite.delete({ where: { id } });

        return reply.status(204).send();
      }
    );
};
