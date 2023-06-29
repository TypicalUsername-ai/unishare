export default async function deleteReview(target_id, target_type, user_id, token) {
    let response = await fetch(`http://localhost/api/${target_type}/${target_id}/${user_id}`, {
        method : 'DELETE',
        headers : {
            authorization: `Bearer ${token}`
        }
    })
    if (!response.ok) {throw new Error(await response.text())}
    return await response.json()
}