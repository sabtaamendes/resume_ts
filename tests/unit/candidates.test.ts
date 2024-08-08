import servicesCandidates from "@/services/candidates-services";

jest.mock("@/services/candidates-services");

describe("Candidates service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getCandidates", () => {
    it("should respond with empty array when there is no candidates", async () => {
      jest.spyOn(servicesCandidates, "getCandidates").mockResolvedValue([]);

      await expect(servicesCandidates.getCandidates()).resolves.toEqual([]);
    });

    describe("getPdfByIdCandidate", () => {
      const mockUserId = 1;

      it("should throw status 404 when there is no pdf who belongs to the id", async () => {
        jest.spyOn(servicesCandidates, "getPdfByIdCandidate").mockResolvedValue(null);

        const result = await servicesCandidates.getPdfByIdCandidate(mockUserId);

        expect(result).toBeNull();
      });

      const candidateInfo = {
        id: mockUserId,
        fullname: "John Doe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        resume: [
          {
            id: 1,
            desired_position: "Software Engineer",
            filename: "resume.pdf",
            pdf: Buffer.from("mock pdf content"),
            candidates_id: mockUserId,
          },
        ],
        created_at: new Date(),
      };

      it("should return the PDF when found", async () => {
        jest
          .spyOn(servicesCandidates, "getPdfByIdCandidate")
          .mockResolvedValue(candidateInfo);

        const result = await servicesCandidates.getPdfByIdCandidate(mockUserId);
        expect(result).toBe(candidateInfo);
        expect(servicesCandidates.getPdfByIdCandidate).toHaveBeenCalledWith(
          mockUserId
        );
      });
    });
  });
});
