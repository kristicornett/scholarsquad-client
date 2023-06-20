const url = "http://localhost:8000"

export const getUser = () => {
    const user = JSON.parse(localStorage.getItem('scholarSquad_user'))
    const token = localStorage.getItem('scholarSquad_token')
    return fetch(`${url}/users/${user.id}`, {
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`
        },
    })
    .then((response) => response.json())
}