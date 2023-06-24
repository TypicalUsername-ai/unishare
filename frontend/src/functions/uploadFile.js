async function uploadFile(filedata, token) {
    console.log(filedata);
    const options = {
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${token}`
            // 'content-type' : 'application/json'
        },
        body: filedata
    };

    let response = await fetch(`http://localhost/api/files/create`, options)
    if (!response.ok) {throw new Error("UploadFile : " + response.status)}
    return await response.json()
}

export default uploadFile