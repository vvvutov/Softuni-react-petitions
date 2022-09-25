import { request } from "./requester";

const baseUrl = 'http://localhost:3030';


export const login = async (userData) => {
    return await request(`${baseUrl}/users/login`, 'POST', userData)

}


export const register = async (userData) => {
    return await request(`${baseUrl}/users/register`, 'POST', userData)
}


export const logout = async (accessToken) => {
    try {
        const response =  await fetch(`${baseUrl}/users/logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        })
        return response
    } catch (error) {
        console.log(error);
    }
};