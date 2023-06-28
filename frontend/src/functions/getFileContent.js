export default async function getFileContent(fileid, token) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/files/${fileid}/content`, options)
    if (!response.ok) {throw new Error(await response.text())}
    return await response.json()
}