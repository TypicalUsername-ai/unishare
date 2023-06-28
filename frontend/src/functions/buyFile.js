async function buyFile(fileId, authToken) {

    const response = await fetch(`http://localhost/api/files/${fileId}/purchase`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
    });

    if (!response.ok) {throw new Error("purchaseFile : "+response.status)}
    return await response.json()
}

export default buyFile;