import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const CommentModigy = () => {
    const {user}=useLogin()
    const [comment, setComment] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetching = async () => {
            const dat = await fetch(`http://localhost:8000/TG-news/get-comment/${id}`, {
                headers:{"authorization":`Bearer ${user.token}`}
            })
            const json = await dat.json()
            if (dat.status === 200) {
                setComment(json.body)
            }
        }
        fetching().catch(err => {
            if(err.message==="Failed to fetch")console.log("please check your internet connection ")
         })
        
    }, [id,user])
    const handleComment = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:8000/TG-news/update-comment/${id}`, {
            method: "PUT",
            headers: { "authorization": `Bearer ${user.token}`, "content-type": "application/json" },
            body: JSON.stringify({comment})
        });
        const json = await res.json();

        if (res.status === 201 || res.status === 200) {
            navigate(-1)
        } else {
            console.log(json);
            navigate(-1)
        }
    }

    const goBack = (e) => {
        e.preventDefault();
        navigate(-1)
    }
    return ( 
        <div className="comment-modify">
            <form>
                <label htmlFor="comment " className="shead bhead">Edit Your Comment</label>
                <textarea value={comment} autoComplete={true}  onChange={e=>setComment(e.target.value)}></textarea>
                <div className="btns">
                    <button className="btn blueBtn" onClick={handleComment}>Save</button>
                    <button className="btn redBtn" onClick={goBack}>Cancel</button>
                </div>
            </form>
        </div>
     );
}
 
export default CommentModigy;