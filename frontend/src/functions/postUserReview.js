async function postUserReview(rating, reviewText, user_id, token) {
    const response = await fetch(`http://localhost/api/users/${user_id}/reviews`, {
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

    if (!response.ok) { throw new Error("postUserReview : " + response.status) }
    return await response.json()
}

export default postUserReview;