async function buyFile(userId, fileId, authToken) {

    const response = await fetch(`http://localhost/api/files/${fileId}/buy`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
    });

    if (!response.ok) {throw new Error("purchaseFile : "+response.status)}
    return await response.json()
}

export default buyFile;