const url = "http://localhost:8000"

export const getAllQuizzes = () => {
    return fetch(`${url}/quizzes`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,

        }
    })
    .then((response) => response.json())
}

export const getSingleQuiz = (quiz_id) => {
    return fetch(`${url}/quizzes/${quiz_id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
        },
    }).then((response) => response.json())
}

export const createQuiz = (newQuiz) => {
    return fetch(`${url}/quizzes`, {
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
    return fetch(`${url}/quizzes?_user=user`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("scholarSquad_token")}`,
      },
    }).then((response) => response.json());
  }

export const updateQuiz = (quiz) => {
    return fetch(`${url}/quizzes/${quiz.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
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
    return fetch(`${url}/quizzes?teacher_id=${teacherId}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
        }
    })
    .then((response) => response.json())
}

export const getAssignedStudents = (quizId) => {

    return fetch(`${url}/quizzes/${quizId}/assignees`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
        }
    })
    .then((response) => response.json())
}

export const assignStudent = (quizId, studentId) => {
    const body = {
        studentId: studentId
    }
    return fetch(`${url}/quizzes/${quizId}/assign`, {
        method: 'POST', 
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })
    .then((response) => response.json())
}