import type { MultipartFile } from "@fastify/multipart";
import crypto from "crypto";
import { Readable } from "stream";
import { BadRequestError } from "../routes/_errors/bad-request-error.js";

import ftp from "basic-ftp";

const connectionFtp = async () => {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  await client.access({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    secure: false,
  });

  return client;
};

interface UploadResult {
  fileName: string;
  remotePath: string;
  url: string;
  size: number;
}

export async function uploadToFtp(file: MultipartFile): Promise<UploadResult> {
  if (!file) {
    throw new BadRequestError("Nenhum arquivo enviado.");
  }

  const buffer = await file.toBuffer();

  if (!buffer || buffer.length === 0) {
    throw new BadRequestError("O arquivo enviado está vazio.");
  }

  const safeFilename = file.filename.replace(/\s+/g, "_").trim();
  const fileName = `${crypto.randomUUID()}_${safeFilename}`;

  const remoteDir = `/public_html/uploads/exames`;
  const remotePath = `${remoteDir}/${fileName}`;

  const ftp = await connectionFtp();

  const stream = Readable.from(buffer);

  await ftp.ensureDir(remoteDir);
  await ftp.uploadFrom(stream, remotePath);
  ftp.close();

  return {
    fileName,
    remotePath,
    url: `https://mastertelecom-claro.com.br/uploads/exames/${fileName}`,
    size: file.file.bytesRead,
  };
}
