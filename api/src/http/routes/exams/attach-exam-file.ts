import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { prisma } from "../../../database/prisma.ts";

import { uploadToFtp } from "../../lib/ftp.ts";
import { BadRequestError } from "../_errors/bad-request-error.ts";

export const attachExamFile = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/exames/:id/anexos",
    {
      schema: {
        tags: ["Exames"],
        summary: "Enviar anexo para o exame",
        consumes: ["multipart/form-data"],
        params: z.object({
          id: z.string(),
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
      const file = await request.file();

      if (!file) throw new BadRequestError("Nenhum arquivo enviado.");

      if (!file.mimetype.includes("pdf"))
        throw new BadRequestError("Somente PDFs são aceitos.");

      const exam = await prisma.exam.findUnique({ where: { id } });
      if (!exam) throw new BadRequestError("Exame não encontrado.");

      const uploaded = await uploadToFtp(file);

      await prisma.attachment.create({
        data: {
          examId: id,
          filename: file.filename,
          path: uploaded.remotePath,
          size: uploaded.size,
          url: uploaded.url,
        },
      });

      return reply.status(204).send();
    }
  );
};
