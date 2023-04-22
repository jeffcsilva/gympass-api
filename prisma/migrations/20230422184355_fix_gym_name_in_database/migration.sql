/*
  Warnings:

  - You are about to drop the column `gyn_id` on the `chech_ins` table. All the data in the column will be lost.
  - Added the required column `gym_id` to the `chech_ins` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chech_ins" DROP CONSTRAINT "chech_ins_gyn_id_fkey";

-- AlterTable
ALTER TABLE "chech_ins" DROP COLUMN "gyn_id",
ADD COLUMN     "gym_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "chech_ins" ADD CONSTRAINT "chech_ins_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
