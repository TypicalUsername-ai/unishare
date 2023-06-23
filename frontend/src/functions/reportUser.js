export default async function reportUser (id, token){
    const options = {
        method: 'UPDATE',
        body: JSON.stringify({id}),
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/`, options)
    if (!response.ok) {throw new Error("DeleteFile : " + response.status)}

}