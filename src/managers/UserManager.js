import { getToken } from "./TokenManager";

const url = "http://localhost:8000"

export const getUser = () => {
    return fetch(`${url}/profile/my-profile`, {
        method: 'GET',
        headers: {
            Authorization: `Token ${getToken()}`
        },
    })
    .then((response) => response.json())
}