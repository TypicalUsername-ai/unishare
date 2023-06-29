export default async function acceptReport (id, token){
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/reports/${id}/reject`, options)
    if (!response.ok) {throw new Error("Reject Report : " + response.status)}
}