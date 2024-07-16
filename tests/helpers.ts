import { prisma } from "@/configs";

export async function cleanDb() {
  await prisma.resume.deleteMany({});
  await prisma.candidates.deleteMany({});
}