import { Route, createRoutesFromElements, createBrowserRouter  } from "react-router-dom";
import Home from "../componets/Home";
import RootPage from "../pages/Root";
import Login from '../pages/Login';
import Signup from "../pages/Signup";
import Help from "../pages/Help";
import Verify from "../componets/confirm";
import Blog from "../componets/Blog";
import { Navigate } from "react-router-dom";
import useLogin from '../hooks/useLogin'
import BlogDet from "../componets/BlogDet";
import Profile from "../componets/Profile";
import Myblogs from "../componets/MyBlog";
import BlogModify from "../componets/BlogModify";
import ModifyProfule from "../componets/modifyProfile";
import CommentModigy from "../componets/commentModify";
import ResetPassword from "../componets/resetPassword";
import About from "../componets/about";
import Usage from "../componets/usage";
import Notfound from "../componets/notFound";

const useRoute = () => {
    const { user,signTkn } = useLogin()
  const  router = createBrowserRouter(
     createRoutesFromElements(
         <Route path="/" element={<RootPage />}>
             <Route path="/" element={user ? <Home /> : <Navigate to='/log-in' />} >
                 <Route path="blog-details/:id" element={<BlogDet />} />
                 <Route path="user-profile/:id" element={<Profile />} />
                 <Route path="my-blogs/:id" element={<Myblogs />} />
                 <Route path="blog-modify/:id" element={<BlogModify />} />
                 <Route path="profile-modify/:id" element={<ModifyProfule />} />
                 <Route path="comment-modify/:id" element={<CommentModigy />} />
                 <Route path="reset-password" element={ <ResetPassword/>} />
                 <Route index element={<Blog />} />
             </Route>
             <Route path="log-in" element={!user&&!signTkn?<Login />:<Navigate to='/verification'/>} />
             <Route path="sign-up" element={!user?!signTkn?<Signup />:<Navigate to='/verification'/>:<Navigate to='/'/>}/>
             <Route path="verification" element={!signTkn?<Navigate to='/'/>:<Verify />} />
             <Route path="help" element={<Help />}>
                 <Route index element={<About />} />
                 <Route path="usage" element={<Usage/>} />
             </Route>
             <Route path="*" element={<Notfound/>} />
         </Route>
        )
    )
    return router;
}
 
export default useRoute;


