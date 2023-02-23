import { DataContext } from "../contexts/UpdateContext";
import { useContext } from "react";
const useUpdate = () => {
    const UpdateContext = useContext(DataContext);
    const { data, setData, setComs, coms } = UpdateContext;
    return {...data,setData,coms,setComs };
}
 
export default useUpdate;