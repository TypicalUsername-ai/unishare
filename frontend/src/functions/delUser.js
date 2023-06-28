async function delUser(userId, authToken) {
    const response = await fetch(`http://localhost/api/users/${userId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            user: userId
        })
    });

    if (!response.ok) { throw new Error(await response.text()) }
    return await response.json()
}

export default delUser;