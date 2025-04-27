export default async function CreateProductActions(data) {
    const response = await fetch("https://dummyjson.com/products/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    // console.log("CreateProductActions ~ response:", response)
    return await response.json()
}