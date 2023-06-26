export default async function acceptReport (id, token){
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/${id}/accept`, options)
    if (!response.ok) {throw new Error("Accept Report : " + response.status)}
}