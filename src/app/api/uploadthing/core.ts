import { updateUser } from "@/data-access/users";
import { imageURLToKey } from "@/helpers/uploadthing";
import { auth } from "@/lib/auth";
import { utapi } from "@/lib/uploadthing";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
	profilePhotoUploader: f({
		image: {
			maxFileSize: "2MB",
			maxFileCount: 1,
		},
	})
		.middleware(async () => {
			const session = await auth();

			if (!session?.user) throw new UploadThingError("Unauthorized");

			const user = session.user;

			const userImageKey = imageURLToKey(user.image);

			await utapi.deleteFiles(userImageKey);

			return { user: user };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			await updateUser(metadata.user.id, {
				image: file.url,
				imageChangedAt: new Date(),
			});

			return { uploadedBy: metadata.user.id };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
