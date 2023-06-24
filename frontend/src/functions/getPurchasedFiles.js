async function getPurchasedFiles(user_id, token) {
    const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
    let response = await fetch(`http://localhost/api/users/${user_id}/inventory/files`, options)
    if (!response.ok) {throw new Error("GetBoughtFiles : "+response.status)}
    return await response.json()
}

export default getPurchasedFiles;