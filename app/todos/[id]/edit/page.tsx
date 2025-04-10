import { Todo } from "@/app/interfaces/Todo";
import PocketBase from "pocketbase";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function(props: {params: Promise<{id: string}>}) {
    const params = await props.params;
    const db = new PocketBase(process.env.POCKETBASE_URL);
    const todo = await db.collection<Todo>("todos").getOne(params.id);

    async function updateTodo(formSubmission: FormData) {
        "use server";
        const data = {
            title: formSubmission.get("title"),
            description: formSubmission.get("description"),
            priority: formSubmission.get("priority"),
            deadline: formSubmission.get("deadline"),
        };
        await db.collection<Todo>("todos").update(params.id, data);
        revalidatePath(`/todos/${params.id}/edit`);
    }

    async function updateTodoAndRedirect(formSubmission: FormData) {
        "use server";
        await db.collection<Todo>("todos").update(params.id, formSubmission);
        redirect("/todos");
    }

    return (
        <div className="container">
            <Link href={`/todos/${todo.id}`} className="block pb-8">&lt;- Back to todo</Link>
            <h1>Edit {todo.title}</h1>
            <form action={updateTodo}>
                <input type="text" name="title" defaultValue={todo.title} required />
                <input type="text" name="description" defaultValue={todo.description} required />
                <input type="number" name="priority" defaultValue={todo.priority} required />
                <input type="date" name="deadline" defaultValue={todo.deadline.substring(0, 10)} required />
                <button type="submit">Update and stay</button>
                <button formAction={updateTodoAndRedirect}>Update and go back</button>
            </form>
            <Link href="/todos">&lt;- Back to list</Link>
        </div>
    );
}