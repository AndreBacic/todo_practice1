import Link from 'next/link';
import PocketBase from 'pocketbase';

export const dynamic = 'auto',
    dynamicParams = true,
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'

async function getTodos() {
    const db = new PocketBase(process.env.POCKETBASE_URL)
    const data = await db.collection('todos').getList(0, 24)
    console.log(data)

    return data?.items
}

export default async function TodosList() {
    const todos = await getTodos()

    return (
        <div>
            <h1>Todos</h1>
            <Link href="/todos/create">Create a todo</Link>
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