/* This is a comment to this method
*
*/
async function getProfile(id, token) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/users/${id}/profile`, options)
    if (!response.ok) {throw new Error(response.status)}
    return await response.json()
}

export default getProfile