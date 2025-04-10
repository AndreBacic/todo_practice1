"use server";
import PocketBase from "pocketbase";
import { revalidatePath } from "next/cache";
import { Todo } from "@/app/interfaces/Todo";

const db = new PocketBase(process.env.POCKETBASE_URL);
const todos = db.collection<Todo>("todos");

export async function incrementPriority(id: string) {
    const todo = await todos.getOne(id);
    const newPriority = todo.priority + 1;
    await todos.update(id, { priority: newPriority });
    revalidatePath(`/todos/${id}`);
}

export async function decrementPriority(id: string) {
    const todo = await todos.getOne(id);
    const newPriority = todo.priority - 1;
    await todos.update(id, { priority: newPriority });
    revalidatePath(`/todos/${id}`);
}