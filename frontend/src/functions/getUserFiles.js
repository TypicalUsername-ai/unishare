async function getUserFiles(user_id, token) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/users/${user_id}/files`, options)
    if (!response.ok) {throw new Error(response.status)}
    return (await response.json()).files
}

export default getUserFiles;