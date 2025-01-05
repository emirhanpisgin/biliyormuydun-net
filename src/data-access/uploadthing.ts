import { utapi } from "@/lib/uploadthing";
import { File } from "buffer";

export async function uploadImage(image: File) {
	const uploadResult = await utapi.uploadFiles(image);

	if (!uploadResult.error) {
		return uploadResult.data?.url;
	}
}
