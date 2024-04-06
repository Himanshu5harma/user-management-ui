import axios from 'axios';
import { getHeaderToken } from '../utils/utils';

export const createNewUser = async (UserDetails) =>{
    return await axios.post('http://localhost:8080/api/v1/users/add-user',UserDetails)
}

export const getAllUsers = async ()=>{
    return await axios.get('http://localhost:8080/api/v1/users/find-all',{
        headers:{...getHeaderToken()}
    });
}