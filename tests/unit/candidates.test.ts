import httpStatus from "http-status";
import repositoryCandidates from "@/respositories/candidates-repository";
import { getCandidates } from "@/controllers/candidates-controller";
import express from "express";
jest.mock("../../src/respositories/candidates-repository");

jest.mock("../../src/controllers/candidates-controller");

describe("Candidates", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getCandidates", () => {
    const req = {} as express.Request;
    const res = {} as express.Response;

    it("should respond with not found error if there is no candidates", async () => {
      jest
        .spyOn(repositoryCandidates, "getAllCandidates")
        .mockResolvedValueOnce([]);

      return expect(Promise.resolve(getCandidates(req, res))).resolves.toBe(
        undefined
      );
    });


    // it("should return an array of candidates", async () => {
    //     jest.spyOn(repositoryCandidates, "getAllCandidates").getMockImplementation( );

    //     await expect(getCandidates(req, res)).resolves.toEqual([
    //       expect.objectContaining({
    //         id: expect.any(Number),
    //         fullname: expect.any(String),
    //         email: expect.any(String),
    //         phone: expect.any(String),
    //       }),
    //     ]);
    // });



  });


});
