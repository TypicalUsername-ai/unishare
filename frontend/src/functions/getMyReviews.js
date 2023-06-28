export default async function getFileContent(token) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/users/myreviews`, options)
    if (!response.ok) {throw new Error(await response.text())}
    return await response.json()
}