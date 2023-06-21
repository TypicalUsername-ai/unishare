async function getReportedUsers(id, token) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/users/`, options)
    if (!response.ok) {throw new Error("GetReportedUsers : " + response.status)}
    return await response.json()
}

export default getReportedUsers;