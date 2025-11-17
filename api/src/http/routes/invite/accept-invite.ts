import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import bcrypt from "bcryptjs";
import { prisma } from "../../../database/prisma.js";
import { BadRequestError } from "../_errors/bad-request-error.js";

export const acceptInvite = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/convites/:id/aceitar",
    {
      schema: {
        tags: ["Convite"],
        summary: "Aceitar convite e criar conta",
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string(),
          password: z.string().min(6),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { name, password } = request.body;

      const invite = await prisma.invite.findUnique({ where: { id } });
      if (!invite) throw new BadRequestError("Convite inválido.");

      if (invite.expiredAt < new Date()) {
        throw new BadRequestError("Convite expirado.");
      }

      await prisma.user.create({
        data: {
          name,
          email: invite.email,
          password: await bcrypt.hash(password, 10),
          role: "Member",
        },
      });

      await prisma.invite.delete({ where: { id } });

      return reply.status(204).send();
    }
  );
};
