import Link from 'next/link';
import PocketBase from 'pocketbase';

async function getTodos() {
    const db = new PocketBase('http://127.0.0.1:8090')
    const data = await db.collection('todos').getList(0, 24)
    console.log(data)

    return data?.items
}

export default async function TodosList() {
    const todos = await getTodos()

    return (
        <div>
            {todos?.map((todo) => (
                <Link key={todo.id} href={`/todos/${todo.id}`}>
                    <h2>{todo.title}</h2>
                    <p>{todo.description}</p>
                    <p>Priority: {todo.priority}</p>
                    <p>Due {todo.deadline}</p>
                    <p>Created {todo.created}</p>
                </Link>
            ))}
        </div>
    )
}