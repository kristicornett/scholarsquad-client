const url = "http://localhost:8000"

export const getAllSchools = () => {
    return fetch(`${url}/schools`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'

        }
    })
    .then((response) => response.json())
}


export const getSchoolsForRegister = () => {
    return fetch(`${url}/registerschool`,{
        headers: {
            'Content-Type': 'application/json'

        }
    })
    .then((response) => response.json())
}


export const createSchool = (newSchool) => {
    return fetch(`${url}/schools`, {
        method: 'POST', 
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSchool),
    })
    .then((response) => response.json())
}

export const updateSchool = (school) => {
    return fetch(`${url}/schools/${school.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(school)
    })
    .then(response => response.json())
}

export const getSingleSchool = (schoolId) => {
    return fetch(`${url}/schools/${schoolId}`,{
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}

export const deleteSchool = (schoolId) => {
    return fetch(`${url}/schools/${schoolId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${localStorage.getItem('scholarSquad_token')}`
        }
    })
}