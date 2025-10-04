-- CreateTable
CREATE TABLE "Tasks" (
    "Id" TEXT NOT NULL,
    "Name" VARCHAR(250) NOT NULL,
    "Description" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DeletedAt" TIMESTAMP(3),
    "project_id" TEXT NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_Name_key" ON "Tasks"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_Description_key" ON "Tasks"("Description");

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_project_id_key" ON "Tasks"("project_id");

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
