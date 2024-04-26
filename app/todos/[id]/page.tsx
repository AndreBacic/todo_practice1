
async function getTodo(id: string) {
    const response = await fetch(`url/${id}`);
    const data = await response.json()
    return data
}

export default function Todo({ params }: any) {
    const todo = getTodo(params.id);

    return (
        <div>
            <h1>{todo.title}</h1>
            <p>{todo.description}</p>
        </div>
    )
}