async function postFileReview(rating, reviewText, file_id, token) {
    const response = await fetch(`http://localhost/api/files/${file_id}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            review: rating,
            comment: reviewText
        })
    });

    if (!response.ok) { throw new Error(await response.text()) }
    return await response.json()
}

export default postFileReview;