async function getAllFiles(token) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/users/all/files`, options)
    if (!response.ok) {throw new Error("GetAllFiles : " + response.status)}
    return (await response.json()).files
}

export default getAllFiles;