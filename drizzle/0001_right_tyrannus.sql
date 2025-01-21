ALTER TABLE "topic" DROP CONSTRAINT "topic_categoryId_category_id_fk";
--> statement-breakpoint
ALTER TABLE "topic" ADD CONSTRAINT "topic_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;