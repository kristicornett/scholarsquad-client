const url = "http://localhost:8000"

export const getAllClasses = () => {
    return fetch(`${url}/classes`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`,

        }
    })
    .then((response) => response.json())
}

export const createClass = (newClass) => {
    return fetch(`${url}/classes`, {
        method: 'POST', 
        headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
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
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'application/son'
        },
        body: JSON.stringify(classroom)
    })
    .then(response => response.json())
}

export const deleteClass = (classId) => {
    return fetch(`${url}/classes/${classId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${localStorage.getItem('auth_token')}`
        }
    })
}