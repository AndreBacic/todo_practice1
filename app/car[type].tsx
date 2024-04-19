





export async function getServerSideProps(params: any) {
    const request = await fetch(`http://localhost:3000/${params.id}`)
    const data = await request.json()

    return {
        props: { car: data }
    }
}