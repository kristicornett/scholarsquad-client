const url = "http://localhost:8000"

export const getAllStudents = () => {
    return fetch(`${url}/students`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
        }
    })
    .then((response) => response.json())
}

export const getStudentsBySchool = (schoolId) => {
    return fetch(`${url}/students?school_id=${schoolId}`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
        }
    })
    .then((response) => response.json())
}

export const getSingleStudent = (studentId) => {
    return fetch(`${url}/students/${studentId}`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/son'
        }
    })
        .then(response => response.json())
}

export const createStudent = (newStudent) => {
    return fetch(`${url}/students`, {
        method: 'POST', 
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent),
    })
    .then((response) => response.json())
}

export const updateStudent = (student) => {
    return fetch(`${url}/students/${student.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/son'
        },
        body: JSON.stringify(student)
    })
    .then(response => response.json())
}

export const deleteStudent = (studentId) => {
    return fetch(`${url}/students/${studentId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`
        }
    })
}

export const getStudentClassrooms = (studentId) => {
    return fetch(`${url}/students/${studentId}/classrooms`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/son'
        }
    })
        .then(response => response.json())

}