import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Help = () => {
    const naviga = useNavigate()
    const goBack = () => {
       naviga(-1)
   }
    return ( 
        <div className="help" >
            <div className="container">
                <div className="help-nav">
                    <h1 className="shead ghead">Hey welcome ! </h1>
                    <h1 className="back" style={{cursor:'pointer'}} onClick={goBack}><FontAwesomeIcon icon={faArrowLeft} ></FontAwesomeIcon></h1>
                <NavLink to='usage' className="innerLink">Usage</NavLink>
                
            </div>
            <div className="body">
                <Outlet/>
            </div>
            </div>
        </div>
     );
}
 
export default Help;