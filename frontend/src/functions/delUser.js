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

    let text = "Are you sure you want to delete this account?";


    if (confirm(text) == true){ 
    if (!response.ok) { throw new Error(await response.text()) }
    return await response.json()
    }
}

export default delUser;