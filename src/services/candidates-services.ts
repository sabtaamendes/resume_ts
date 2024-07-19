import { notFoundError, invalidDataError } from "../errors";
import repositoryCandidates from "../respositories/candidates-repository";

async function getCandidates() {
  const result = await repositoryCandidates.getAllCandidates();
  if (!result) throw notFoundError();

  return result;
}

async function getPdfByIdCandidate(userId: number) {
    const result = repositoryCandidates.getPdfByIdCandidate(userId);
    if (!result) throw notFoundError();

    return result;
}

async function post(data: {
  fullname: string;
  email: string;
  phone: string;
  desired_position: string;
  originalname: string;
  pdf: Buffer;
}) {
  if (!data) throw invalidDataError(["data"]);

  const result = await repositoryCandidates.post(data);

  return result;
}

const servicesCandidates = {
    getCandidates,
    getPdfByIdCandidate,
    post
}
export default servicesCandidates;