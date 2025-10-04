-- CreateTable
CREATE TABLE "Collaborators" (
    "Id" TEXT NOT NULL,
    "Name" VARCHAR(250) NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DeletedAt" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Collaborators_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collaborators_Name_key" ON "Collaborators"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Collaborators_user_id_key" ON "Collaborators"("user_id");

-- AddForeignKey
ALTER TABLE "Collaborators" ADD CONSTRAINT "Collaborators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
