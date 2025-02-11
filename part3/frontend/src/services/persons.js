import axios from 'axios'
const baseUrl = 'http://localhost:3005/api/persons'

const getAll = () => {
    return fetch(baseUrl)
        .then(response => response.json())
}

const create = newObject => {
    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newObject)
    })
        .then(response => response.json())
}

const update = (id, newObject) => {
    return fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newObject)
    })
        .then(response => response.json())
}

const deletePerson = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
}



/*const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}*/

export default { getAll, create, update, deletePerson }