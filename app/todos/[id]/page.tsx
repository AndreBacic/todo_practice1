import Link from "next/link";
import { RecordModel } from "pocketbase";
import AdjustPriority from "./AdjustPriority";
import OptimisticPriority from "./OptimisticPriority";

async function getTodo(id: string) {
    const response = await fetch(`${process.env.POCKETBASE_URL}/api/collections/todos/records/${id}`);
    const data = await response.json()
    return data as RecordModel
}

export default async function Todo(props: any) {
    const params = await props.params;
    const todo = await getTodo(params.id);

    return (
        <>
            <Link href={`/todos/${todo.id}/edit`} className="block pb-8">Edit -&gt;</Link>
            <div>
                <h2>{todo.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: todo.description }} />
                <p>Priority: {todo.priority}</p>
                <AdjustPriority id={todo.id} />
                <OptimisticPriority id={todo.id} priority={todo.priority} />
                <p>Due {todo.deadline}</p>
                <p>Created {todo.created}</p>
            </div>
            <a href='/todos'>&lt;- Back to list</a>
        </>
    )
}