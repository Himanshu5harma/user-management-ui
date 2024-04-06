import axios from 'axios';

export const getEntitlement = async (loginDetails) =>{
    return await axios.post('http://localhost:8080/authenticate',loginDetails)
}