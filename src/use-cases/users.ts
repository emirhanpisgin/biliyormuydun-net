import { updateUser } from "@/data-access/users";
import { UpdateUser } from "@/db/schema/users";

export async function updateUserUseCase(userId: string, data: UpdateUser) {
	await updateUser(userId, data);
}
