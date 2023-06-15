const url = "http://localhost:8000"

export const getAllTeachers = () => {
    return fetch(`${url}/teachers`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
        }
    })
    .then((response) => response.json())
}

export const getTeachersBySchool = (schoolId) => {
    return fetch(`${url}/teachers?school_id=${schoolId}`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
        }
    })
    .then((response) => response.json())
}



export const createTeacher = (newTeacher) => {
    return fetch(`${url}/teachers`, {
        method: 'POST', 
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTeacher),
    })
    .then((response) => response.json())
}

export const updateTeacher = (teacher) => {
    return fetch(`${url}/teachers/${teacher.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/son'
        },
        body: JSON.stringify(teacher)
    })
    .then(response => response.json())
}

export const deleteTeacher = (teacherId) => {
    return fetch(`${url}/teachers/${teacherId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`
        }
    })
}

export const getSingleTeacher = (teacherId) => {
    return fetch(`${url}/teachers/${teacherId}`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/son'
        }
    })
        .then(response => response.json())
}

export const getTeacherClassrooms = (teacherId) => {
    return fetch(`${url}/teachers/${teacherId}/classrooms`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/son'
        }
    })
        .then(response => response.json())

}