async function buyFile(file_id, token) {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/files/${file_id}/purchase`, options)
    if (!response.ok) {throw new Error("BuyFile : "+response.status)}
    return await response.json()
}

export default buyFile;