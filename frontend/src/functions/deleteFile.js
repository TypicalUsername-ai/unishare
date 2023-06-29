export default async function deleteFile (id, token){
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/`, options)
    if (!response.ok) {throw new Error("DeleteFile : " + response.status)}
}