-- CreateTable
CREATE TABLE "candidates" (
    "id" SERIAL NOT NULL,
    "fullname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resume" (
    "id" SERIAL NOT NULL,
    "desired_position" VARCHAR(50) NOT NULL,
    "filename" TEXT NOT NULL,
    "pdf" BYTEA NOT NULL,
    "candidates_id" INTEGER NOT NULL,

    CONSTRAINT "resume_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "candidates_email_key" ON "candidates"("email");

-- AddForeignKey
ALTER TABLE "resume" ADD CONSTRAINT "resume_candidates_id_fkey" FOREIGN KEY ("candidates_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
