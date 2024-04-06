export const logoutHandler = ()=> {

}

export const getHeaderToken = () => ({
    Authorization: `Bearer `+ localStorage.getItem('token')
});