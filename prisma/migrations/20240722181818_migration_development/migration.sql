-- CreateTable
CREATE TABLE "candidates" (
    "id" SERIAL NOT NULL,
    "fullname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(11) NOT NULL,

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

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(50) NOT NULL,
    "users_id" INTEGER NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(10) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "resume" ADD CONSTRAINT "resume_candidates_id_fkey" FOREIGN KEY ("candidates_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
