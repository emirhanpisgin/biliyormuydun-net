import { createServerActionProcedure } from "zsa";
import { auth } from "./auth";
import { User } from "@/db/schema/users";

export const authenticatedAction = createServerActionProcedure().handler(async () => {
	const session = await auth();
	if (!session?.user) throw "Unauthenticated";
	return session.user as User;
});

export const unauthenticatedAction = createServerActionProcedure();