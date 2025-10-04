-- CreateTable
CREATE TABLE "TimeTrackers" (
    "Id" TEXT NOT NULL,
    "StartDate" TIMESTAMP(3) NOT NULL,
    "EndDate" TIMESTAMP(3) NOT NULL,
    "TimeZoneId" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DeletedAt" TIMESTAMP(3),
    "collaborator_id" TEXT,
    "task_id" TEXT NOT NULL,

    CONSTRAINT "TimeTrackers_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "TimeTrackers" ADD CONSTRAINT "TimeTrackers_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "Collaborators"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTrackers" ADD CONSTRAINT "TimeTrackers_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Tasks"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
