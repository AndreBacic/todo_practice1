import Link from 'next/link';
import PocketBase from 'pocketbase';

export const dynamic = 'auto',
    dynamicParams = true,
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'

// 1) create form
// 2) create post request to pocketbase
// 3) redirect to todos page

async function createTodo(formSubmission: FormData) {
    "use server";

    const data = {
        title: formSubmission.get("title"),
        description: formSubmission.get("description"),
        priority: formSubmission.get("priority"),
        deadline: formSubmission.get("deadline"),
    };

    const pb = new PocketBase(process.env.POCKETBASE_URL);
    await pb.collection('todos').create(formSubmission) //.create(data)

    // doesn't work because it's running on the server :(
    // "use client"
    // window.location.href = '/todos';
}

export default function CreateTodo() {
    return (
        <div>
            <form action={createTodo}>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="description" placeholder="Description" />
                <input type="number" name="priority" placeholder="Priority" />
                <input type="date" name="deadline" placeholder="Deadline" />
                <button type="submit">Create</button>
            </form>
            <Link href="/todos">Back to todos</Link>
        </div>
    );
}