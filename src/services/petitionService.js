import {request} from './requester';

const baseUrl = 'http://localhost:3030';

export const getAll = async () => {
    return await request(`${baseUrl}/data/petitions`)
        // .then(res => res.json())
}


export const create = async (petitionData) => {
    return await request(`${baseUrl}/data/petitions`, 'POST', petitionData)
}


export const getOne = async (petitionID) => {
    return await request(`${baseUrl}/data/petitions/${petitionID}`, 'GET', petitionID)
}

export const edit = async (petitionID, petitionData) => {
    return await request(`${baseUrl}/data/petitions/${petitionID}`, 'PUT', petitionData)
}