import "fastify";
import type { UserRole } from "../generated/prisma/enums.ts";

declare module "fastify" {
  interface FastifyRequest {
    getCurrentUserId(): Promise<string>;
    hasPermission: (allowedRoutes: UserRole[]) => Promise<boolean>;
  }
}
