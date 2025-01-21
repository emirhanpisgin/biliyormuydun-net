ALTER TABLE "topic" DROP CONSTRAINT "topic_authorId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "topic" ALTER COLUMN "categoryId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "topic" ALTER COLUMN "authorId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "topic" ADD COLUMN "writerId" text;--> statement-breakpoint
ALTER TABLE "topic" ADD CONSTRAINT "topic_writerId_user_id_fk" FOREIGN KEY ("writerId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topic" ADD CONSTRAINT "topic_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;