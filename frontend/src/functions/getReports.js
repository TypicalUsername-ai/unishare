async function getReports(token) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/reports/panel`, options)
    console.log(response)
    if (!response.ok) {throw new Error("GetReportedUsers : " + response.status)}
    return await response.json()
}

export default getReports;