import { createServerActionProcedure } from "zsa";
import { auth } from "./auth";

export const authenticatedAction = createServerActionProcedure().handler(async () => {
	const session = await auth();
	if (!session?.user) throw "Unauthenticated";
	return session.user;
});

export const unauthenticatedAction = createServerActionProcedure();