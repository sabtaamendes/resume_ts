import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  let event = await prisma.candidates.findFirst();
  if (!event) {
    event = await prisma.candidates.create({
      data: {
        fullname: "Teste de evento",
        email: "testedeevento@gmail.com",
        phone: "92992586600",
        resume: {
          create: {
            desired_position: "Developer Fullstack",
            filename: "resume.pdf",
            pdf: Buffer.from("teste"),
          },
        },
      },
    });
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
