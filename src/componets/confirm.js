import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Verify = () => {
    const { signTkn,setSignTkn, msg, setMsg, setUser,Url } = useLogin();
    const [verifyCode, setVerify] = useState('');
    const [err, setErr] = useState();
    const navigate = useNavigate();
    const [laoding, setLaoding] = useState(false)
    const [resending, setSending] = useState(false)
    const [canceling,setCanceling]=useState(false)
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
    const verify = async () => {
        setLaoding(true)
        const res = await fetch(`${Url}/verify`, {
            method: "POST",
            headers: { "content-type": "application/json","authorization":`Bearer ${signTkn}` },
            body: JSON.stringify({ verifyCode: parseInt(verifyCode) })
        });
        const json = await res.json();
        if (res.status === 201) {
            setLaoding(false)
            localStorage.removeItem("signTkn");
            setUser({ type: "set-user", paylaod: json });
            setSignTkn('')
            navigate('/')
            setErr(null);
        } else {
            setErr(json.error);
            setMsg(null)
            setLaoding(false)
        }
    }
    const Canceled = async() => {
        setCanceling(true)
        const res = await fetch(`${Url}/delete-unactive`, {
            method: "DELETE",
            headers:{"authorization":`Bearer ${signTkn}`}
        })
        const json = await res.json();
        if (res.status === 200 || res.status === 201) {
            setCanceling(false)
            localStorage.removeItem('signTkn');
            localStorage.removeItem('signTime')
            setVerify('')
            setSignTkn(null)
        } else {
            setMsg(json.error)
            setCanceling(false)
        }

    }
    const resendCode = async () => {
        setSending(true)
        const res = await fetch(`${Url}/resend-password`, {
            headers: { "authorization":`Bearer ${signTkn}` },
        });
        const json = await res.json();
        if (res.status === 200 || res.status === 201) {
            setSending(false)
            setMsg(json.msg)
            setErr(null)
            const note = document.querySelector("greenNote");
            note.classList.add('yellowNote');
            note.classList.remove('greenNote')
        } else {
            setErr(json.error)
            setMsg(null)
            setSending(false)
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
    if (laoding) {
        const disable = document.querySelector('.verifyBtn');
        disable.setItem='disabled'
    } else if (resending) {
        const disable = document.querySelector(".resendBtn");
        disable.setItem='disabled'
    } else if (canceling) {
        const disable = document.querySelector('.cancelBtn');
        disable.setItem='disabled'
    }
    return ( 
        <div className="signUpForm">
            <form >
                {err && <div className='note redNote'>{err}</div>}
                {msg && <div className="note greenNote">{msg}</div>}
                <label htmlFor="code">Verification Code :</label>
                <input type="number" name="code" value={verifyCode} onChange={e=>setVerify(e.target.value)} placeholder="Enter Verify Code" />
                <div className="btns">
                    <button className="btn blueBtn verifyBtn"  style={{
                        backgroundColor:`${laoding ?"rgba(0,0,0,0.5)":""}`
                    }} onClick={e => {
                        e.preventDefault()
                        verify().catch(err => {
                            setErr(err.message);
                            setLaoding(false)
                        })
                    }}>{laoding ? "Verifing..." : "Verify"}</button>

                    <button className="btn greenBtn resndBtn" style={{backgroundColor:`${resending?"rgba(0,0,0,0.5)":''}`}} onClick={e => {
                        e.preventDefault();
                        resendCode().catch(err => {
                            setErr(err.message)
                            setSending(false)
                        })
                    }}>{resending ? "resending..." : "resend"}</button>
                    <button className="btn redBtn cancelBtn" style={{
                        backgroundColor: `${canceling?"rgba(0,0,0,0.5)":''}`}} onClick={e => {
                        e.preventDefault();
                        Canceled.catch(err => {
                            setCanceling(false)
                        })
                    }}>{ canceling ?"Canceling...":"Concel"}</button>
                </div>
                
             </form>
        </div>
     );
}
 
export default Verify;