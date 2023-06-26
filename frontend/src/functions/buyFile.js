async function buyFile(userId, fileId, authToken) {

    const response = await fetch(`http://localhost/api/files/${fileId}/buy`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            buyerId: userId,
            fileId: fileId
        })
    });

    if (response.ok) {
        alert("You have bought the file and should now have access to it!");
    } else {
        console.error('Error buying the file, reason: ' + response);
    }
}

export default buyFile;