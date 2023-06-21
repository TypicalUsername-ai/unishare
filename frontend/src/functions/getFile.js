async function getFile(id, token) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/files/${id}`, options)
    if (!response.ok) {throw new Error("GetFile : "+response.status)}
    return await response.json()
}

export default getFile;