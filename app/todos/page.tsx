import Link from 'next/link';
import PocketBase from 'pocketbase';
import { Todo } from '../interfaces/Todo';

export const dynamic = 'auto',
    dynamicParams = true,
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'

async function getTodos() {
    const db = new PocketBase(process.env.POCKETBASE_URL)
    const data = await db.collection<Todo>('todos').getList(0, 24)
    return data?.items
}

export default async function TodosList() {
    const todos = await getTodos()

    return (
        <>
            <h1>Todos</h1>
            <Link href="/todos/create" className="block pb-8">Create a todo -&gt;</Link>
            <div className="grid !grid-cols-3">
                {todos?.map((todo) => (
                    <Link key={todo.id} href={`/todos/${todo.id}`} className='p-4 border-[1px] border-gray-500 rounded-md'>
                        <h2>{todo.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: todo.description }} />
                        <p>Priority: {todo.priority}</p>
                        <p>Due {todo.deadline}</p>
                        <p>Created {todo.created}</p>
                    </Link>
                ))}
            </div>
        </>
    )
}