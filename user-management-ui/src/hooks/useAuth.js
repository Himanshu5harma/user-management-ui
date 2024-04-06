
const useAuth = ()=>{
    let hasToken = localStorage.getItem("token") ? true :false ;
    return hasToken;
}
export default useAuth;