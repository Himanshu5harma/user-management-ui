import axios from 'axios';
import { getHeaderToken } from '../utils/utils';
import { baseUrl } from '../data/Constant';

export const createNewUser = async (UserDetails) =>{
    return await axios.post(baseUrl+'/api/v1/users/add-user',UserDetails)
}

export const getAllUsers = async ()=>{
    return await axios.get(baseUrl+'/api/v1/users/find-all',{
        headers:{...getHeaderToken()}    });
}

export const getUserByUserName = async (userName)=>{
    return await axios.get(baseUrl+`/api/v1/users/user-Name/${userName}`,{
        headers:{...getHeaderToken()}
    });
}