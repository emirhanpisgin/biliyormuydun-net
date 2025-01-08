import { database } from "@/db";
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import { uploadUserImage } from "@/helpers/uploadthing";
import { updateUser } from "@/data-access/users";
import { toUsername } from "./utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(database),
	providers: [Google],
	events: {
		async createUser(user) {
			if (!user.user.image) return;

			const uploadedUserImage = await uploadUserImage(user.user.image, user.user.id!);

			const username = toUsername(user.user.name!, user.user.email!);

			await updateUser(user.user.id!, {
				image: uploadedUserImage,
				username,
			});
		},
	},
	callbacks: {
		async session({ session, user }) {
			session.user.username = user.username;
			return session;
		},
	},
});
