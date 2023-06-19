async function getUserReviews(id, token) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/users/${id}/reviews`, options)
    if (!response.ok) {throw new Error("GetUserReviews : "+response.status)}
    return await response.json()
}

export default getUserReviews