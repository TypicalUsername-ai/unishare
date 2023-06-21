export default async function deleteUser(id, token){
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let response = await fetch(`http://localhost/api/users/${id}`, options)
    if (!response.ok) {throw new Error("DeleteUser : " + response.status)}
}
