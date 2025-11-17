import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { BadRequestError } from "../_errors/bad-request-error.js";

import bcrypt from "bcryptjs";
import { prisma } from "../../../database/prisma.ts";

export const authenticatedUser = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/auth/login",
    {
      schema: {
        tags: ["Autenticação"],
        summary: "Autenticar usuário",
        body: z.object({
          email: z.string().email("E-mail inválido"),
          password: z.string().min(3, "Senha obrigatória"),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
        },
      });

      if (!user) throw new BadRequestError("Credenciais inválidas.");

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new BadRequestError("Credenciais inválidas");

      const token = await reply.jwtSign({ sub: user.id }, { expiresIn: "7d" });

      reply.setCookie("portal-master-token", token);

      return reply.status(204).send();
    }
  );
};
