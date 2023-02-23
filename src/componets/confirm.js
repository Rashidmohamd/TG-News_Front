import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Verify = () => {
    const { signTkn,setSignTkn, msg, setMsg, setUser,Url } = useLogin();
    const [verifyCode, setVerify] = useState('');
    const [err, setErr] = useState();
    const navigate = useNavigate();
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
            console.log(json)
        }
    }
    const Canceled = (e) => {
        e.preventDefault();
        console.log(typeof(parseInt(verifyCode)))
        setVerify('')
    }
    return ( 
        <div className="signUpForm">
            <form >
                {err && <div className='note redNote'>{err}</div>}
                {msg && <div className="note greenNote">{msg}</div>}
                <label htmlFor="code">Verification Code :</label>
                <input type="number" name="code" value={verifyCode} onChange={e=>setVerify(e.target.value)} placeholder="Enter Verify Code" />
                <div className="btns">
                    <button className="btn blueBtn" onClick={verify}>Verify</button>
                    <button className="btn redBtn" onClick={Canceled}>Concel</button>
                </div>
             </form>
        </div>
     );
}
 
export default Verify;