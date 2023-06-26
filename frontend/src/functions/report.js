export default async function report (id, token){
    const options = {
        method: 'UPDATE',
        body: JSON.stringify({id}),
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/create`, options)
    if (!response.ok) {throw new Error("DeleteFile : " + response.status)}

}