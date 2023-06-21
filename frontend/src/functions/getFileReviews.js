async function getFileReviews(id, token) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/files/${id}/reviews`, options)
    if (!response.ok) {throw new Error("GetFileReviews : "+response.status)}
    return await response.json()
}

export default getFileReviews