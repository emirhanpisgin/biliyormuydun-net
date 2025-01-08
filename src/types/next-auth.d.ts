import NextAuth from "next-auth";
import { Session, User } from "next-auth";

declare module "next-auth" {
	interface Session extends Session {
        user: Session["user"] & {
            username?: string;
        };
	}

    interface User extends User {
        username?: string;
    }
}
