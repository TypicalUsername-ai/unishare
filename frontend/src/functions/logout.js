async function logout(token) {
    const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
    let response = await fetch('http://localhost/api/logout', options)
    if (!response.ok) {throw new Error("Logout : "+response.status)}
    return await response.json()
}

export default logout;
