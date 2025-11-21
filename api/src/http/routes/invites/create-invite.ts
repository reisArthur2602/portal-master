import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import crypto from "crypto";
import { prisma } from "../../../database/prisma.js";
import { BadRequestError } from "../_errors/bad-request-error.js";

export const createInvite = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/convites/novo",
    {
      schema: {
        tags: ["Convite"],
        summary: "Criar um novo convite",
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          204: z.null(),
        },
      },
      preHandler: [async (request) => request.hasPermission(["Admin"])],
    },
    async (request, reply) => {
      const { email } = request.body;

      const inviteExists = await prisma.invite.findUnique({
        where: { email },
      });

      if (inviteExists) {
        throw new BadRequestError(
          "Já existe um convite ou conta associada a este email."
        );
      }

      const token = crypto.randomBytes(32).toString("hex");

      await prisma.invite.create({
        data: {
          email,
          token,
          expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      return reply.status(204).send();
    }
  );
};
