/*
  Warnings:

  - Added the required column `gyn_id` to the `chech_ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `chech_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chech_ins" ADD COLUMN     "gyn_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "chech_ins" ADD CONSTRAINT "chech_ins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chech_ins" ADD CONSTRAINT "chech_ins_gyn_id_fkey" FOREIGN KEY ("gyn_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
