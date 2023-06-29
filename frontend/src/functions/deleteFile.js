export default async function deleteFile (id, token){
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let text = "Are you sure you want to delete this file?";

    if (confirm(text) == true){ 
    let response = await fetch(`http://localhost/api/`, options)
    if (!response.ok) {throw new Error("DeleteFile : " + response.status)}
    }
}