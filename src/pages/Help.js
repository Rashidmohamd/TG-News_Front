import { NavLink, Outlet } from "react-router-dom";

const Help = () => {
   
    return ( 
        <div className="help" >
            <div className="container">
                <div className="help-nav">
                <h1 className="shead ghead">Hey welcome ! </h1>
                <NavLink to='/help' className="innerLink">About</NavLink>
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