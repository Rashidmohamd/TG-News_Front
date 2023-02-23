import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const ResetPassword = () => {
    const { user ,Url} = useLogin();
    const redirecting = useNavigate();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirm] = useState('');
    const [err, setErr] = useState('')
    const [success,setSuccess]=useState('')
    const goBack = (e) => {
        e.preventDefault();
        redirecting(-1)
    }
    const resetPassword = (e) => {
        e.preventDefault();
        const fetchin = async () => {
            if (confirmPassword !== password) {
            setErr("sorry your confirm password dose not match your new password please double check it")
         } else if (!confirmPassword && !password) {
            setErr("sorry you can not reset password with empty field :(")
         } else {
             const res = await fetch(`${Url}/reset-password`, {
                method: "POST",
                headers: { "content-type": "application/json", "authorization": `Bearer ${user.token}` },
                body:JSON.stringify({password})
             })
             const json = await res.json();
                if (res.status === 200) {
                    setSuccess(json.success)
                    console.log(json.success)
                    if(json.success)setTimeout(redirecting(-1), 15000);
                } else if (res.status === 400) {
                setErr(json.error)
             }else {
                setErr(json.message)
                }
            }
        }
        fetchin().catch(err=>{setErr(err.message)})
    }
    return ( 
        <div className="signUpForm">
            <form>
                <h1 className={`shead ${success?"ghead":"bhead"}`}>{success?success:"Reseting Password !" }</h1>
                <h1 className={`note ${err?"redNote":"greenNote"}`}>
                    {err?err:"please use a strong password by numbers, letters and symbols for your safety and it has to be more than 6 character and less than 16 character"}
                </h1>
                <label htmlFor="newPassword">New Password :</label>
                <input type="password" id="newPassword" placeholder="Enter your new password" value={password} onChange={ e=>setPassword(e.target.value)} />
                <label htmlFor="confirmPassword">Confirm Password :</label>
                <input type="password" id="confirmPassword" placeholder="Confirm your new password" value={confirmPassword} onChange={ e=>setConfirm(e.target.value)} />
                <div className="btns">
                    <button className="btn blueBtn" onClick={resetPassword}>Save</button>
                    <button className="btn redBtn" onClick={goBack}>cancel</button>
                </div>
            </form>
        </div>
     );
}
 
export default ResetPassword;