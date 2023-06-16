const url = "http://localhost:8000"

export const getAllClasses = () => {
    return fetch(`${url}/classes`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`
        }
    })
    .then((response) => response.json())
}

export const getClassroomsBySchool = (schoolId) => {
    return fetch(`${url}/classes?school_id=${schoolId}`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`
        }
    })
    .then((response) => response.json())
}

export const getClassStudents = (classId) => {
    return fetch(`${url}/classes/${classId}/get_students`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
        }
    })
    .then((response) => response.json())
}


export const createClass = (newClass) => {
    return fetch(`${url}/classes`, {
        method: 'POST', 
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newClass),
    })
    .then((response) => response.json())
}

export const updateClassroom = (classroom) => {
    return fetch(`${url}/classes/${classroom.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(classroom)
    })
    .then(response => response.json())
}

export const deleteClass = (classId) => {
    return fetch(`${url}/classes/${classId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`
        }
    })
}


export const addStudentToClass = (classId, studentId) => {
    const objBody = {
        "studentId": studentId
    }
    return fetch(`${url}/classes/${classId}/students`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objBody)
    })
    
}


export const getClassesByTeacher = (teacherId) => {
    return fetch(`${url}/classes?teacher_id=${teacherId}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
        }
    })
    .then((response) => response.json())
}

export const getSingleClass = (classId) => {
    return fetch(`${url}/classes/${classId}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`
        }
    })
    .then(response => response.json())
}

