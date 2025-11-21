import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { prisma } from "../../../database/prisma.js";
import { authPlugin } from "../../plugins/auth.ts";

export const listUsers = (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .get(
      "/usuarios",
      {
        schema: {
          tags: ["Usuários"],
          summary: "Listar todos os usuários",
          response: {
            200: z.object({
              users: z.array(
                z.object({
                  id: z.uuid(),
                  name: z.string(),
                  email: z.string(),
                  role: z.string(),
                })
              ),
            }),
          },
        },
      },
      async (_, reply) => {
        const users = await prisma.user.findMany({
          select: { id: true, name: true, email: true, role: true },
          orderBy: { name: "asc" },
        });

        return reply.send({ users });
      }
    );
};
