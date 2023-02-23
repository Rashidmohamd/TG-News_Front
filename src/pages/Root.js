import { Outlet } from "react-router-dom";
import Navbar from "../componets/Navbar";

const RootPage = () => {
    return ( 
        <div className="rootLayout">
            <Navbar />
            <div className="rootContainer">
                <Outlet/>
            </div>
            
        </div>
     );
}
 
export default RootPage;