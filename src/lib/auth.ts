import { database } from "@/db";
import NextAuth, { User } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import { uploadUserImage } from "@/helpers/uploadthing";
import { updateUser } from "@/data-access/users";
import { toUsername } from "./utils";
import { accounts, users } from "@/db/schema";


export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(database, {
		usersTable: users,
		accountsTable: accounts,
	}) as any,
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
    session: {
        strategy: "database"
    },
	callbacks: {
		async session({ session, user }) {
			session.user = user;
			return session;
		},
	},
});
