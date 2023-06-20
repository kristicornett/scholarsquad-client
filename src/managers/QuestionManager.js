const url = "http://localhost:8000"

export const updateQuestion = (question) => {
    return fetch(`${url}/questions/${question.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
    })
    .then(response => response.json())
}

export const createQuestion = (quizId, question) => {
    question.quizId = quizId
    return fetch(`${url}/questions`, {
        method: 'POST', 
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question),
    })
    .then((response) => response.json())
}

export const deleteQuestion = (questionId) => {
    return fetch(`${url}/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`
        }
    })

}