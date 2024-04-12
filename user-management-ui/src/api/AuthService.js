import axios from 'axios';
import { baseUrl } from '../data/Constant';

export const getEntitlement = async (loginDetails) =>{
    return await axios.post(baseUrl+'/authenticate',loginDetails)
}