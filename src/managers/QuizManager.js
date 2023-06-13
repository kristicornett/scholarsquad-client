const url = "http://localhost:8000"

export const getAllQuizzes = () => {
    return fetch(`${url}/quiz`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,

        }
    })
    .then((response) => response.json())
}

export const getSingleQuiz = (quiz_id) => {
    return fetch(`${url}/quiz/${quiz_id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
        },
    }).then((response) => response.json())
}

export const createQuiz = (newQuiz) => {
    return fetch(`${url}/quiz`, {
        method: 'POST', 
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuiz),
    })
    .then((response) => response.json())

}


export const generateQuiz = (newQuiz) => {
    return fetch(`${url}/quiz_generate`, {
        method: 'POST', 
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuiz),
    })
    .then((response) => response.json())
}

export const getMyQuiz = () => {
    return fetch(`${url}/quiz?_user=user`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("scholarSquad_token")}`,
      },
    }).then((response) => response.json());
  }

export const updateQuiz = (quiz) => {
    return fetch(`${url}/quiz/${quiz.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
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
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`
        }
    })
}

export const getQuizzesByTeacher = (teacherId) => {
    return fetch(`${url}/quiz?teacher_id=${teacherId}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
        }
    })
    .then((response) => response.json())
}