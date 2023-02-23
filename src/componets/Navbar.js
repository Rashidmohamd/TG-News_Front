import { NavLink,Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import useUpdate from "../hooks/useUpdate";
import { formatDistanceToNowStrict } from "date-fns/esm";
const Navbar = () => {
    const { user, setUser } = useLogin()
    const { setData } = useUpdate()
    const logOut = (e) => {
        e.preventDefault();
        setUser({ type: 'log-out' })
        setData({ type: 'log-out' });
    }
    const hideNav = (e) => {
        e.preventDefault();
        const nav = document.querySelector('.nav');
        if (nav.classList.contains('hideNav')) {
            nav.classList.remove('hideNav');

        } else {
            nav.classList.add('hideNav');
        }
    }
    return ( 
        <div className="navBar">
            <div className="navContainer">
                {!user && <div className="outLogo logo">
                    <img src="./news-123.jpg" alt="outer logo img" />
                    <h1 className="Lhead logoDet">TG-News</h1>
                </div>}
                {user && <div className="innerLogo logo">
                    <Link to={`/user-profile/${user._id}`} className="innerLogo logo">
                        <img src={`data:${user.picture.contentType};base64,${user.picture.img}`} alt="innerlogo" />
                        <div className="logoDet"><h1 className="shead rhead ">{user.firstName}</h1>
                            <small>Joined {formatDistanceToNowStrict(new Date(user.createdAt))}</small>
                        </div>
                    </Link>
                </div>}
                <nav>
                    <div className="menuBtn hideNav" onClick={hideNav}>
                        <div className="lines"></div>
                        <div className="lines"></div>
                        <div className="lines"></div>
                    </div>
                    {user && <div className="innerNav nav ">
                        <NavLink to='/' className='navLink'>Home</NavLink>
                         <button onClick={logOut} className="btn redBtn">Log-Out</button>
                    </div>} 
                    {!user && <div className="outNav nav" >
                        <NavLink to='/sign-up' className='navLink'>Sign-Up</NavLink>
                        <NavLink to="/log-in" className='navLink'>Log-In</NavLink>
                    </div>}
                    <Link to='help' className="helpIcon">?</Link>
                </nav>
            </div>
        </div>
     );
}
 
export default Navbar;