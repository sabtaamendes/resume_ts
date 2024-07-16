import { prisma } from "@/configs";
export async function getAllCandidates() {
  return prisma.candidates.findMany();
}

export async function getPdfByIdCandidate(userId: number) {
  return prisma.candidates.findUnique({
    where: {
      id: userId,
    },
    include: {
      resume: true,
    },
  });
}

export async function post(
  fullname: string,
  email: string,
  phone: string,
  desired_position: string,
  filename: string,
  pdf: Buffer
) {
  return prisma.candidates.create({
    data: {
      fullname,
      email,
      phone,
      resume: {
        create: {
          desired_position,
          filename,
          pdf,
        },
      },
    },
    include: {
      resume: true,
    },
  });
}
