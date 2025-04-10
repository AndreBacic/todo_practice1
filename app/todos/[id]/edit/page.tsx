import { Todo } from "@/app/interfaces/Todo";
import PocketBase from "pocketbase";
import Link from "next/link";

export default async function({params}: {params: {id: string}}) {
    const db = new PocketBase(process.env.POCKETBASE_URL);
    const todo = await db.collection<Todo>("todos").getOne(params.id);
    console.log("Edit todo: ", todo);

    async function updateTodo(formSubmission: FormData) {
        "use server";
        const data = {
            title: formSubmission.get("title"),
            description: formSubmission.get("description"),
            priority: formSubmission.get("priority"),
            deadline: formSubmission.get("deadline"),
        };
        console.log("Hopefully changing todo to: ", data);
        await db.collection<Todo>("todos").update(params.id, data);
    };

    return (
        <div className="container">
            <Link href={`/todos/${todo.id}`} className="block pb-8">&lt;- Back to todo</Link>
            <h1>Edit {todo.title}</h1>
            <form action={updateTodo} method="post">
                <input type="text" name="title" defaultValue={todo.title} required />
                <input type="text" name="description" defaultValue={todo.description} />
                <input type="number" name="priority" defaultValue={todo.priority} />
                <input type="date" name="deadline" defaultValue={todo.deadline} />
                <button type="submit">Update</button>
            </form>
            <Link href="/todos">&lt;- Back to list</Link>
        </div>
    );
}