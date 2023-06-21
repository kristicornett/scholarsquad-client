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

export const getMessagesByUser = () => {
    return fetch(`${url}/messages`, {
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

export const createMessage = (message) => {
    return fetch(`${url}/messages`, {
        method: 'POST', 
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message),
    })
    .then((response) => response.json())
}

export const markMessageRead = (messageId) => {
    return fetch(`${url}/messages/${messageId}/mark-read`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`
        }
    })
    .then(response => response.json())

}