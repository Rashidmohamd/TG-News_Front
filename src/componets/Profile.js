import { Link, useParams } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { formatDistanceToNowStrict } from "date-fns";

const Profile = () => {
    const { id } = useParams()
    const { users,user } = useLogin();
    return ( 
        <div className="profile">
            <div className="container">
                {users.map(u => u._id === id ? <div key={u._id}>
                    <div className="headPart" ><img src={`data:${u.picture.contentType};base64,${u.picture.img}`} alt="profile p" />
                        <Link className="shead ghead li" to={ `/my-blogs/${u._id}`}>My-Blogs</Link></div>
                    
                    <h1 className="field ">First Name <span>{u.firstName}</span></h1>
                    <h1 className="field ">Last Name <span>{u.lastName}</span></h1>
                    <h1 className="field ">Email address <span>{u.email}</span></h1>
                    <h1 className="field ">Base in <span>{u.country}</span></h1>
                    <h1 className="field ">City <span>{u.city}</span></h1>
                    <h1 className="field ">Nationality <span>{u.nationality}</span></h1>
                    <h1 className="field ">Gender <span>{u.gender}</span></h1>
                    <h1 className="field ">Age <span>{u.age}</span></h1>
                    <h1 className="field ">Time at TG Community <span>{formatDistanceToNowStrict(new Date(u.createdAt))} ago</span></h1>

                    {user._id===id&&<div className="btns">
                        <Link className="btn blueBtn" to={`/profile-modify/${u._id}`} >Edit</Link>
                        <Link to='/reset-password' className="btn greenBtn">reset password</Link>
                        <button className="btn redBtn" >Delete</button>
                    </div>}
                </div> : '')}
            </div>
        </div>
     );
}
 
export default Profile;