async function reportUser(userId, authToken, reason) {
    const response = await fetch(`http://localhost/api/reports/create`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            object_id: userId,
            object_type: "USER",
            reason: reason
        })
    });

    if (!response.ok) { throw new Error(await response.text()) }
    return await response.json()
}

export default reportUser;