import NextAuth from "next-auth";
import { Session } from "next-auth";
import { User as UserSchemaType } from "@/db/schema/users";

declare module "next-auth" {
	interface User extends UserSchemaType {}
}
