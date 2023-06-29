export default async function deleteUser(id, token){
    const options = {
        method: 'DELETE',
        body: JSON.stringify(id),
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let text = "Are you sure you want to delete this account? The data will be deleted and unrecoverable.";

    if (confirm(text) == true){ 
    let response = await fetch(`http://localhost/api/users/${id}`, options)
    if (!response.ok) {throw new Error("DeleteUser : " + response.status)}
    }
}
