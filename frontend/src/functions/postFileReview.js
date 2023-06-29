async function postFileReview(rating, reviewText, file_id, token) {
    const response = await fetch(`http://localhost/api/files/${file_id}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            rating: rating,
            comment: reviewText
        })
    });

    if (!response.ok) { throw new Error(await response.text()) }
    if (response.status === 208) { throw new Error("You already submitted review for that!")}
    return await response.json()
}

export default postFileReview;