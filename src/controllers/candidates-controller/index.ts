import { Request, Response } from "express";
import httpStatus from "http-status";
import fs from "fs";
import repositoryCandidates from "../../respositories/candidates-repository";

export async function getCandidates(req: Request, res: Response) {
  try {
    const result = await repositoryCandidates.getAllCandidates();
    if (result.length === 0) {
      return res.status(404).send("Nenhum usuário encontrado");
    }

    return res.send(result);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function getPdfByIdCandidate(req: Request, res: Response) {
  const userId = req.params.id as unknown as number;

  try {
    const result = await repositoryCandidates.getPdfByIdCandidate(
      Number(userId)
    );

    if (!result) {
      return res.status(404).send("pdf não encontrado");
    }

    const pdfBUffer = Buffer.from(result.resume[0].pdf);
    const toString = pdfBUffer.toString("base64");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${result.resume[0].filename}"`
    );

    return res.send(pdfBUffer);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function getPagination(req: Request, res: Response) {
  const { page = 1, limit = 10 } = req.query as unknown as {
    page: number;
    limit: number;
  };

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const candidates = await repositoryCandidates.getAllCandidates();

    const results = candidates.slice(startIndex, endIndex);

    const totalCount = candidates.length;

    const totalPages = Math.ceil(totalCount / limit);

    return res.json({
      results: results,
      page: page,
      totalPages: totalPages,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function postJobsCandidates(req: Request, res: Response) {
  const { fullname, email, phone, desired_position } = req.body as {
    fullname: string;
    email: string;
    phone: string;
    desired_position: string;
  };
  const file = req.file;

  try {
    if (!file) {
      res.status(400).send("Arquivo não enviado");
      return;
    }

    const { originalname, path } = req.file;
    const pdf = fs.readFileSync(path);

    await repositoryCandidates.post({
      fullname,
      email,
      phone,
      desired_position,
      originalname,
      pdf,
    });

    return res.status(201).send("Usuário e arquivo PDF salvos com sucesso.");
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
