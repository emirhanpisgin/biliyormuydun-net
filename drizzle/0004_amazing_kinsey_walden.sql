CREATE TYPE "public"."role" AS ENUM('member', 'admin');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role";