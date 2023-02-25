import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
const Login = () => {
    const navigate = useNavigate();
    const [password, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [err, setErr] = useState();
    const { setUser,setMsg,setSignTkn,Url} = useLogin();
    const login = async (e) => {
        e.preventDefault();
        if (!email || !password) {
          setErr("please fill all field to log-in you can not log in without your cradential think twice")
        } else {
        const res = await fetch(`${Url}/log-in`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body:JSON.stringify({password,email})
        })
        const json = await res.json();
        if (res.status === 200 || res.status===201) {
            setUser({ type: "set-user", paylaod:  json  })
            setErr(null)
            navigate('/');
        } else {
            setErr(json.error);
        }
      }
    }
    const cancele = (e) => {
        e.preventDefault();
        setPass('');
        setEmail('');
    }

    const fortgotPassword = async (e) => {
        e.preventDefault();
        const res = await fetch(`${Url}/forgot-password`, {
            headers: { "content-type": "application/json" },
            body: JSON.stringify({email}),
            method: "POST",
        });
        const json = await res.json();
        if (res.status === 200 || res.status === 201) {
            localStorage.setItem("signTkn", json.token);
            localStorage.setItem("signTime", new Date());
            setSignTkn(json.token)
            setMsg(json.msg)
        }
    }
    // useEffect(() => {
    //     localStorage.setItem("signTkn", 'hello try sign up token')
    //     localStorage.setItem("signTime", new Date());
    // },[])
    return ( 
        <div className="signUpForm">
            <form >
                {err && <div className="note redNote">{ err}</div>}
                <label>Email :</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <label>Password :</label>
                <input type="password" value={password} onChange={(e) => setPass(e.target.value)} />
                <h1 className="shead ghead forget" onClick={fortgotPassword}>Forgot password ? <span>Click here</span></h1>
                <div className="btns">
                    <button className="btn blueBtn" onClick={login}>Log-In</button>
                    <button className="btn redBtn" onClick={cancele}>Cancel</button>
                </div>
                
                <Link to='/sign-up' className="shead">Do not have account ? <span>Sign-Up</span></Link>
            </form>
        </div>
     );
}
 
export default Login;