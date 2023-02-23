import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

const useLogin = () => {
    const userIn = useContext(LoginContext);
    
    return userIn;
}
 
export default useLogin;

