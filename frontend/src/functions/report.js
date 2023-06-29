export default async function report (data = {object_id, object_type, reason} , token){
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/reports/create`, options)
    if (!response.ok) {throw new Error("createReport : " + response.status)}
    return await response.json()
    
}