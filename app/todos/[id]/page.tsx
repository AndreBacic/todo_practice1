import { RecordModel } from "pocketbase";

async function getTodo(id: string) {
    // TODO: refactor pocketbase url to be in a global setting somewhere
    const response = await fetch(`http://127.0.0.1:8090/api/collections/todos/records/${id}`);
    const data = await response.json()
    return data as RecordModel
}

export default async function Todo({ params }: any) {
    const todo = await getTodo(params.id);

    return (
        <div>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <p>Priority: {todo.priority}</p>
            <p>Due {todo.deadline}</p>
            <p>Created {todo.created}</p>
        </div>
    )
}