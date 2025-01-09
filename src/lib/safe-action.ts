import { createServerActionProcedure } from "zsa";
import { auth } from "./auth";
import { User } from "@/db/schema";

export const authenticatedAction = createServerActionProcedure().handler(async () => {
	const session = await auth();
	if (!session?.user) throw "Unauthenticated";
	return session.user as User;
});

export const unauthenticatedAction = createServerActionProcedure();