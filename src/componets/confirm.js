import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Verify = () => {
    const { signTkn,setSignTkn, msg, setMsg, setUser,Url } = useLogin();
    const [verifyCode, setVerify] = useState('');
    const [err, setErr] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const now = new Date();
        const nowToMilli = now.getTime();
        const signTime = localStorage.getItem("signTime");
        if (signTime) {
            const signToMi = new Date(signTime);
            const signToMilli = signToMi.getTime();
            const remain = nowToMilli - signToMilli;
            if (remain >= 6700000) {
                localStorage.removeItem('signTime');
                localStorage.removeItem('signTkn');
            }
        }else if(!signTime && signTkn){
            localStorage.removeItem('signTkn');
            setSignTkn(null);
        }
    },[])
    const verify = async (e) => {
        e.preventDefault();
        console.log(msg)
        const res = await fetch(`${Url}/verify`, {
            method: "POST",
            headers: { "content-type": "application/json","authorization":`Bearer ${signTkn}` },
            body: JSON.stringify({ verifyCode: parseInt(verifyCode) })
        });
        const json = await res.json();
        if ( res.status === 201) {
            localStorage.removeItem("signTkn");
            setUser({ type: "set-user", paylaod: json });
            setSignTkn('')
            navigate('/')
            setErr(null);
        } else {
            setErr(json.error);
            setMsg(null)
        }
    }
    const Canceled = async(e) => {
        e.preventDefault();
        const res = await fetch(`${Url}/delete-unactive`, {
            method: "DELETE",
            headers:{"authorization":`Bearer ${signTkn}`}
        })
        const json = await res.json();
        if (res.status === 200 || res.status === 201) {
            localStorage.removeItem('signTkn');
            localStorage.removeItem('signTime')
            setVerify('')
            setSignTkn(null)
        } else {
            setMsg(json.error)
        }

    }
    const resendCode = async (e) => {
        e.preventDefault();
        const res = await fetch(`${Url}/resend-password`, {
            headers: { "authorization":`Bearer ${signTkn}` },
        });
        const json = await res.json();
        if (res.status === 200 || res.status === 201) {
            setMsg(json.msg)
            const note = document.querySelector("greenNote");
            note.classList.add('yellowNote');
            note.classList.remove('greenNote')
        }
    }
    setInterval(() => {
        const now = new Date();
        const nowToMilli = now.getTime();
        const signTime = localStorage.getItem("signTime");
        if (signTime) {
            const signToMi = new Date(signTime);
            const signToMilli = signToMi.getTime();
            const remain = nowToMilli - signToMilli;
            if (remain >= 6700000) {
                localStorage.removeItem('signTime');
                localStorage.removeItem('signTkn');
            }
        }else if(!signTime && signTkn){
            localStorage.removeItem('signTkn');
            setSignTkn(null);
        }

    }, 600000);
    return ( 
        <div className="signUpForm">
            <form >
                {err && <div className='note redNote'>{err}</div>}
                {msg && <div className="note greenNote">{msg}</div>}
                <label htmlFor="code">Verification Code :</label>
                <input type="number" name="code" value={verifyCode} onChange={e=>setVerify(e.target.value)} placeholder="Enter Verify Code" />
                <div className="btns">
                    <button className="btn blueBtn" onClick={verify}>Verify</button>
                    <button className="btn greenBtn" onClick={resendCode}>resend</button>
                    <button className="btn redBtn" onClick={Canceled}>Concel</button>
                </div>
                
             </form>
        </div>
     );
}
 
export default Verify;