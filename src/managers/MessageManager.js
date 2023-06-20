const url = "http://localhost:8000"

export const getAllMessages = () => {
    return fetch(`${url}/messages`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`
        }
    })
    .then((response) => response.json())
}
//user/{id}/messages

export const getMessagesByUser = (userId) => {
    return fetch(`${url}/messages?user_id=${userId}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
        }
    })
    .then((response) => response.json())
}

export const getSingleMessage = (messageId) => {
    return fetch(`${url}/messages/${messageId}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`
        }
    })
    .then(response => response.json())
}