import { NewTopic } from "@/db/schema/topics";
import { createTopic, deleteTopic, getTopicsWithRelations } from "@/data-access/topics";

export async function getTopicsWithRelationsUseCase() {
    return await getTopicsWithRelations();
}

export async function createTopicUseCase(data: NewTopic) {
    await createTopic(data);
}

export async function deleteTopicUseCase(id: string) {
    await deleteTopic(id);
}