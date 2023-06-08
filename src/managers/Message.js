const url = "http://localhost:8000"

export const getAllMessages = () => {
    return fetch(`${url}/messages`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`,

        }
    })
    .then((response) => response.json())
}

export const createMessage = (newMessage) => {
    return fetch(`${url}/quiz`, {
        method: 'POST', 
        headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessage),
    })
    .then((response) => response.json())
}



export const deleteMessage = (messageId) => {
    return fetch(`${url}/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`
        }
    })
}