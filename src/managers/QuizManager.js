const url = "http://localhost:8000"

export const getAllQuizzes = () => {
    return fetch(`${url}/quiz`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`,

        }
    })
    .then((response) => response.json())
}

export const createQuiz = (newQuiz) => {
    return fetch(`${url}/quiz`, {
        method: 'POST', 
        headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuiz),
    })
    .then((response) => response.json())
}

export const updateQuiz = (quiz) => {
    return fetch(`${url}/quiz/${quiz.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'application/son'
        },
        body: JSON.stringify(quiz)
    })
    .then(response => response.json())
}

export const deleteQuiz = (quizId) => {
    return fetch(`${url}/teachers/${quizId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`
        }
    })
}