import Link from 'next/link';
import { redirect } from 'next/navigation';
import PocketBase from 'pocketbase';

export const dynamic = 'auto',
    dynamicParams = true,
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'

async function createTodo(formSubmission: FormData) {
    "use server";

    // this is now just here to demo how to get values from the FormData
    const data = {
        title: formSubmission.get("title"),
        description: formSubmission.get("description"),
        priority: formSubmission.get("priority"),
        deadline: formSubmission.get("deadline"),
    };

    const pb = new PocketBase(process.env.POCKETBASE_URL);
    await pb.collection('todos').create(formSubmission) //.create(data)
    redirect('/todos');
}

export default function CreateTodo() {
    return (
        <>
            <form action={createTodo}>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="description" placeholder="Description" />
                <input type="number" name="priority" placeholder="Priority" />
                <input type="date" name="deadline" placeholder="Deadline" />
                <button type="submit">Create</button>
            </form>
            <Link href="/todos">&lt;- Back to list</Link>
        </>
    );
}