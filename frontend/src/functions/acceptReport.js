export default async function acceptReport (id, token){
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

        console.log("ID accept Report" + id)
        console.log("Token accept Report" + token)


    let text = "Are you sure you want to delete this account?";
    if (confirm(text) == true) {
        let response = await fetch(`http://localhost/api/reports/${id}/accept`, options)
        if (!response.ok) {throw new Error("Accept Report : " + response.status)}
    }
}