import "dotenv/config";

import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { fastifyMultipart } from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import scalarUI from "@scalar/fastify-api-reference";
import fastify from "fastify";

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { authenticatedUser } from "./routes/auth/authenticated-user.ts";

import { authPlugin } from "./plugins/auth.ts";
import { me } from "./routes/auth/me.ts";
import { errorHandler } from "./routes/error-handler.ts";
import { getExamForPickup } from "./routes/exams/get-exam-for-pickup.ts";
import { getExam } from "./routes/exams/get-exam.ts";
import { listExams } from "./routes/exams/list-exams.ts";
import { updateExamStatus } from "./routes/exams/update-status-exam.ts";
import { acceptInvite } from "./routes/invite/accept-invite.ts";
import { createInvite } from "./routes/invite/create-invite.ts";
import { listInvites } from "./routes/invite/list-invites.ts";
import { revokeInvite } from "./routes/invite/revoke-invite.ts";
import { createPatient } from "./routes/patient/create-patient.ts";
import { getPatient } from "./routes/patient/get-patient.ts";
import { listPatients } from "./routes/patient/list-patient.ts";
import { listUsers } from "./routes/user/list-users.ts";
import { updateUserRole } from "./routes/user/update-user-role.ts";

const PORT = Number(process.env.PORT) || 3010;

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);
server.setErrorHandler(errorHandler);

server.register(fastifyCors, {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

server.register(fastifyCookie, {
  secret: process.env.SECRET!,
  parseOptions: {
    httpOnly: true,
    path: "/",
    sameSite:"lax",
    secure:false,
    maxAge: 60 * 60 * 24 * 7,
  },
});

server.register(fastifyJwt, {
  secret: process.env.SECRET!,
  verify: {
    onlyCookie: true,
  },
});

server.register(fastifyMultipart, {
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 1,
    fields: 10,
  },
});

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Portal Master — API",
      version: "1.0.0",
    },
  },

  transform: jsonSchemaTransform,
});

server.register(scalarUI, {
  routePrefix: "/docs",
});

server.register(authPlugin);

server.register(authenticatedUser);
server.register(me);

server.register(createInvite);
server.register(acceptInvite);
server.register(revokeInvite);
server.register(listInvites);

server.register(listUsers);
server.register(updateUserRole);

server.register(createPatient);
server.register(listPatients);
server.register(getPatient);

server.register(getExamForPickup);
server.register(getExam);
server.register(listExams);
server.register(updateExamStatus);

server.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
  console.clear();
  console.log("🌐 URL:                http://localhost:" + PORT);
  console.log("📘 Documentação:       http://localhost:" + PORT + "/docs");
});
