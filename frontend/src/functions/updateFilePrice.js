export default async function updateFilePrice(fileid, newPrice, token) {
    const response = await fetch(
        `http://localhost/api/files/${fileid}/pricechange`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                price: newPrice
            }),
        }
    );

    if (!response.ok) {throw new Error("UpdateFilePrice : " + response.status)}
    return await response.json()
}