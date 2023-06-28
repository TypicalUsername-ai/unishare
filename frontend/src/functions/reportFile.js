async function reportFile(fileId, authToken, reason) {
    const response = await fetch(`http://localhost/api/reports/create`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            object_id: fileId,
            object_type: "FILE",
            reason: reason
        })
    });

    if (!response.ok) { throw new Error(await response.text()) }
    return await response.json()
}

export default reportFile;