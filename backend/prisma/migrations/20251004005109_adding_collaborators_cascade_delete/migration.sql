-- DropForeignKey
ALTER TABLE "public"."Collaborators" DROP CONSTRAINT "Collaborators_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Collaborators" ADD CONSTRAINT "Collaborators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
