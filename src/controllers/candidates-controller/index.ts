import { Request, Response } from "express";
import fs from "fs";
import httpStatus from "http-status";

import repositoryCandidates from "../../respositories/candidates-repository";
import servicesCandidates from "../../services/candidates-services";

export async function getCandidates(req: Request, res: Response) {
  try {
    const result = await servicesCandidates.getCandidates();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    switch (error.name) {
      case "NotFoundError":
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      default:
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}

export async function getPdfByIdCandidate(req: Request, res: Response) {
  const userId = req.params.id as unknown as number;

  try {
    const result = await servicesCandidates.getPdfByIdCandidate(Number(userId));

    const pdfBUffer = Buffer.from(result.resume[0].pdf);
    const toString = pdfBUffer.toString("base64");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${result.resume[0].filename}"`
    );

    return res.send(pdfBUffer);
  } catch (error) {
    switch (error.name) {
      case "NotFoundError":
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      default:
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
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

  try {
    if (!req.file)
      return res
        .status(httpStatus.BAD_REQUEST)
        .send("Arquivo pdf não enviado.");

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
    switch (error.name) {
      case "invalidDataError":
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
      default:
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}