import type { FastifyInstance } from "fastify";
import { fastifyPlugin } from "fastify-plugin";

import { prisma } from "../../database/prisma.js";
import type { UserRole } from "../../generated/prisma/enums.ts";
import { UnauthorizedError } from "../routes/_errors/unauthorized-error.js";

export const authPlugin = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook("onRequest", async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const decoded = await request.jwtVerify<{ sub: string }>();

        if (!decoded.sub) {
          throw new UnauthorizedError(
            "Não foi possível confirmar sua identidade."
          );
        }

        return decoded.sub;
      } catch {
        throw new UnauthorizedError(
          "Sessão inválida ou expirada. Faça login novamente."
        );
      }
    };

    request.hasPermission = async (allowedRoles: UserRole[]) => {
      const userId = await request.getCurrentUserId();

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      if (!user) {
        throw new UnauthorizedError(
          "Não foi possível validar o usuário atual."
        );
      }

      if (!allowedRoles.includes(user.role)) {
        throw new UnauthorizedError(
          "Você não possui permissão para acessar este recurso."
        );
      }

      return true;
    };
  });
});
