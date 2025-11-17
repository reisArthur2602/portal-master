import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { prisma } from "../../../database/prisma.js";

export const listPatients = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/pacientes",
    {
      schema: {
        tags: ["Pacientes"],
        summary: "Listar pacientes",

        response: {
          200: z.object({
            patients: z.array(
              z.object({
                id: z.uuid(),
                name: z.string(),
                cpf: z.string(),
                createdAt: z.date(),
              })
            ),
          }),
        },
      },
      preHandler: [
        async (request) => request.hasPermission(["Admin", "Member"]),
      ],
    },
    async (_, reply) => {
      const patients = await prisma.patient.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          cpf: true,
          createdAt: true,
        },
      });

      return reply.send({ patients });
    }
  );
};
