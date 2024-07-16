import { prisma } from "../../configs/database";
async function getAllCandidates() {
  return await prisma.candidates.findMany();
}

async function getPdfByIdCandidate(userId: number) {
  return await prisma.candidates.findUnique({
    where: {
      id: userId,
    },
    include: {
      resume: true,
    },
  });
}

async function post(data: any) {
  return await prisma.candidates.create({
    data: {
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      resume: {
        create: {
          desired_position: data.desired_position,
          filename: data.originalname,
          pdf: data.pdf,
        },
      },
    },
    include: {
      resume: true,
    },
  });
}

const repositoryCandidates = {
  getAllCandidates,
  getPdfByIdCandidate,
  post,
};
export default repositoryCandidates;
