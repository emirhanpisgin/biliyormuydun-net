import { uploadImage } from "@/data-access/uploadthing";
import { File, Blob } from "buffer";

export async function uploadUserImage(imageUrl: string, userId: string) {
	const response = await fetch(imageUrl);

	if (!response.ok) {
		console.log("Fetch failed!");
		return;
	}

	const body = (await response.blob()) as Blob;

	const file = new File([body], userId, { type: body.type });

	const fileUrl = await uploadImage(file);
    
	return fileUrl;
}