import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Signup = () => {
    const navigate = useNavigate();
    const { setSignTkn,setMsg ,Url} = useLogin();
    const [err, setErr] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConPass, setConPss] = useState('');
    const [country, setCountry] = useState('');
    const [age, setAge] = useState();
    const [gender, setGender] = useState("Male");
    const [city, setCity] = useState('')
    const [nationality, setNational] = useState('');
    const [laoding, setLaoding] = useState(false);
    const cancel = (e) => {
        e.preventDefault();
        setErr(null)
        setAge(0);
        setConPss('');
        setCountry('Sudan')
        setFirstName('');
        setLastName('');
        setEmail('');
        setNational('');
        setGender("");
        setPassword('')
       
    }
    const signup = async () => {
        setErr(null);
        setLaoding(true);
        const pfp = document.querySelector('#pfp').files[0];
        if (!firstName || !lastName || !email || !password || !country || !age || !gender || !nationality || !ConPass) {
            setErr("sorry all fied must be filled to create an account :)")
            setLaoding(false)
            return ;
        }
        if (password !== ConPass) {
            setErr("sorry your confirm password is not matching your password to make it easy for youself just retype it")
            setLaoding(false)
            return;
        }
        const formdat = new FormData();
        if (pfp) formdat.append("profilePicture", pfp);
        formdat.append("Info", JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            country,
            age,
            gender,
            city,
            nationality
        }))
        const res = await fetch(`${Url}/sign-up`, {
            method: "POST",
            body: formdat
        });
        const json = await res.json();
        if (res.status === 201 || res.status === 200) {
            setLaoding(false)
            setErr(null)
            localStorage.setItem("signTkn", json.token)
            localStorage.setItem("signTime", new Date());
            setSignTkn(json.token);
            setMsg(json.msg)
            navigate('/verification');
        }
        else {
            setErr(json.error)
            setLaoding(false)
        }     
    }
    if (laoding) {
        const disable = document.querySelector('.signBtn');
        disable.setItem='disabled'
    }
    return (
        <div className="signUpForm">
            <form action="" encType="multipart/form-data">
                <label className='pfp' htmlFor="pfp" >
                    <img src="/gallary.png" alt="" />
                </label>
                <input type="file" name="profilePicture" id="pfp" onChange={e => {
                    const pfp = document.getElementById('pfp').files[0]
                    const img = URL.createObjectURL(pfp)
                    const ppp = document.querySelector('.pfp');
                    ppp.innerHTML=`<img src=${img} alt="sign"/>`;
                }} />
                <label>FirstName :</label>
                <input type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
    
                <label>LastName :</label>
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />

                <label>Email :</label>
                <input type="email" placeholder="Enter Email" value={email} onChange={ (e)=>setEmail(e.target.value)} />
                
                <div className="sect sec1">
                     <label htmlFor="">Country :</label>
                    <input type="text" placeholder="Current Country" value={country} onChange={(e)=>setCountry(e.target.value)}/>
                </div>
                  <div className="sect sec5">
                     <label htmlFor="">City :</label>
                   <input type="text"value={city} placeholder='Enter City Name' onChange={e=>setCity(e.target.value)} />
                </div>

                <div className="sect sect2">
                     <label htmlFor="">Nationality</label>
                    <input  type="text" placeholder="Your Nationaity" value={nationality} onChange={(e)=>setNational(e.target.value)} />
                </div>

                <div className="sect sect4">
                    <label htmlFor="">Age :</label>
                   <input type="number" placeholder="18 +" value={age} onChange={(e=>setAge(e.target.value))} />
                </div>
                <div className="sect sect3">
                     <label htmlFor="">Gender :</label>
                    <select name="" id="" value={gender} onChange={(e)=>setGender(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>

                </div>
                
                <label>Password :</label>
                <input type="password" placeholder="Password" value={password} onChange={ (e)=>setPassword(e.target.value)} />
                <label>Confirm Password :</label>
                <input type="password" placeholder="Confirm Password" value={ConPass} onChange={(e)=>setConPss(e.target.value)} />
                <div className="btns">
                    <button className="btn blueBtn signBtn" style={{ backgroundColor: `${laoding ? "rgba(0,0,0,0.5)" : ''}` }} onClick={e => {
                        e.preventDefault()
                        signup().catch(err => {
                            setErr(err.message);
                            setLaoding(false)
                        })
                    }}>{laoding ? "Signing..." : "Sign-Up"}</button><button className="btn redBtn" onClick={cancel}>Cancel</button>
                </div>
                {err && <h1 className="err note redNote">{err}</h1>}
                <Link to='/log-in' className="shead">have account ? <span>Log-In</span></Link>
            </form>
        </div>
     );
}
 
export default Signup;