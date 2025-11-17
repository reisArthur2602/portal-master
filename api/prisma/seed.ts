
import { hash } from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client.ts";

const client = new PrismaClient();

export const seed = async () => {
  const password = await hash("12345", 6);

  await client.user.create({
    data: {
      email: "arthurdesouzareis222@gmail.com",
      name: "Arthur Reis",
      password,
      role: "Admin",
    },
  });
};

seed();
