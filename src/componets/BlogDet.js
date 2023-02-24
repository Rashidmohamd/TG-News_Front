import { useEffect,  useState } from "react";
import { useParams } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { formatDistanceToNowStrict } from "date-fns/esm";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit,faTrash,faHeart,faFileUpload,faAdd} from '@fortawesome/free-solid-svg-icons'
import useLike from "./useLikes";
import useComment from "../hooks/useComment";


const BlogDet = () => {
    const { id } = useParams();
    const { user, users ,Url} = useLogin()
    const [comment, setComment] = useState();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading,setLoading]=useState(false)
    const { likes, setLike } = useLike()
    const {coms,setComs}=useComment()
    const comms = coms.coms
    const like = likes
    const [err, setErr] = useState(null)
    useEffect(() => {
        const fetchComment = async () => {
            const dat = await fetch(`${Url}/get-comments/${id}`, {
                headers:{"authorization":`Bearer ${user.token}`}
            })
            const json = await dat.json()
            if (dat.status === 200) {
                setComs({ type: "set-comments", paylaod: json })
            }
        }
        const fetchLikes = async () => {
            const res = await fetch(`${Url}/likes`, {
                headers:{"authorization":`Bearer ${user.token}`}
            })
            const json = await res.json()
            if (res.status === 200) {
                setLike({type:'set-likes',paylaod:json})
            }
        }

         const fet = async () => {
            setLoading(true)
            const res = await fetch(`${Url}/get-articale/${id}`, {
                headers:{"authorization":`Bearer ${user.token}`}
            });
             const json = await res.json();
            if (res.status === 200) {
                setError(null)
                setData(json);
                setLoading(false)
            } else {
                setData(null)
                setError(json.error);
                setLoading(false);
            }
        }
        fet().catch(err => {
            setData(null)
            setError(err.message);
            setLoading(false)
        })

        fetchLikes().catch(err => {
            if (err.message === 'Failed to fetch') {
                console.log('please check your internet connection ...')
            }
        })
        fetchComment().catch(err => {
            if(err.message==="Failed to fetch")console.log("please check your internet connection ")
        })

    },[])
   const openform = (e) => {
        e.preventDefault();
        const togl = document.querySelector('.toggle')
        const f = document.querySelector(".tag");
        const t = document.querySelector(".textInput");
        
       if (f.classList.contains("show")) {
           f.classList.remove('show')
           t.classList.remove('open')
           togl.classList.remove('delete')
           togl.classList.add('edit')
           setComment('')
           setErr(null)
       } else {
           f.classList.add('show')
           t.classList.add("open");
           togl.classList.remove('edit');
           togl.classList.add('delete');
           setComment('');
        }
    }
    const commenting = async (e) => {
        e.preventDefault();
        const t = document.querySelector(".textInput");
        const res = await fetch(`${Url}/add-comment/${id}`, {
            method: "POST",
            headers: { "content-type": "application/json", "authorization": `Bearer ${user.token}` },
            body: JSON.stringify({comment:comment})
        })
        const json = await res.json();
        if (res.status === 201) {
            setComs({ type: "adding-comment", paylaod: json })
            t.classList.remove('open');
            setComment('')
        } else {
            setErr(json.error)
        }
    }
    const deleteComment = async (e,id) => {
        e.preventDefault();
        const res = await fetch(`${Url}/delete-comment/${id}`, {
            method: 'DELETE',
            headers:{"authorization":`Bearer ${user.token}`}
        })
        const json = await res.json();
        if (res.status === 200) {
            setComs({type:"delete-comment",paylaod:json})
        } else {
            console.log(json)
        }
    }
    const loving = async (id) => {
        const res = await fetch(`${Url}/like/${id}`, {
            method: "POST",
            headers:{'authorization':`Bearer ${user.token}`}
        })
        const json = await res.json();
     
        if (res.status === 201) {
            setLike({ type: "add-like", paylaod: json });
        } else if (res.status === 200) {
            setLike({ type: 'delete-like', paylaod: json })
        } else {
            console.log(json)
        }
        
    }
    return (<div className="blogDet">
        {loading && <h1 className="shead bhead">Please wait Loading ...</h1>}
        {error && <h1 className="shead rhead">{ error}</h1>}
        {data && 
            data.map(data => data._id === id ?
                < div key={data._id} className="blog" >
                    <div className="publisher">
                        {users && users.map(u => u._id === data.userId ? <Link key={u._id} to={`/user-profile/${data.userId}`}>
                            {u.picture && <img src={`data:${u.picture.contentType};base64,${u.picture.img}`} alt="if found" />}
                            {!u.picture && <img src="/img9.jpg" alt="other wise" />}
                            <div className="div">
                                <h1 id="id" className="name">{u._id === data.userId ? u.firstName + " " + u.lastName : ''}</h1>
                                <div className="time">Published {formatDistanceToNowStrict(new Date(data.createdAt), { addSuffix: true })}</div>
                            </div>
                        </Link> : '')}
                    </div>
                    <div className="blogBody">
                        {data.img && <img src={`data:${data.img.contentType};base64,${data.img.data}`} className="bolgImg" alt="blog grahp" />}
                        <p className="body mtext dtext">
                            {data.body}
                        </p>
                
                    </div>
{/* com section under  */}
                    <div className="commentSect">
                        <span className="loved"> <FontAwesomeIcon className="heart " onClick={()=>loving(data._id)} icon={faHeart}  style={{color:`${likes && likes.some(l=>l.userId===user._id && l.articaleId===data._id)?'red':''}`}}></FontAwesomeIcon> {data.likes}</span>
                        <span className="comment">{data.comments}<Link to='blog-details'>comments</Link></span>
                    </div>

                    {user._id===data.userId&&<div className="moBtnContainer"><div className="mBtns">
                        <button className="modifyBtn delete"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> </button>
                       <Link to={`/blog-modify/${id}`}> <button className="edit modifyBtn "><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button></Link>
                    </div></div>}
                </div>
            
                : '')
        }
        {/* adding form */}
         <div className="inputSect">
              {err && <h1 className="redNote note">{ err}</h1>}
            <button onClick={openform} className="inputBtn edit toggle"><FontAwesomeIcon icon={ faAdd}></FontAwesomeIcon></button>
              <form className="form tag" >
                  <textarea  value={comment} onChange={e=>setComment(e.target.value)} className="textInput " />
                <button className="formBtn send" onClick={commenting}><FontAwesomeIcon icon={ faFileUpload}></FontAwesomeIcon></button>
              </form>
        </div>
        {/* comment and likes section for */}

        {data && data.map(d => {
            return <div key={d._id} className="blogComLik">
                {comms && <div className="comments">{comms.map(com => com.articaleId===d._id? <aside className="comment" key={com._id}>
                        {users && users.map(u => u._id === com.userId ? <Link to={`/user-profile/${com.userId}`} className='owner' key={u._id}>
                            <img className="sImg" src={`data:${u.picture.contentType};base64,${u.picture.img}`} alt="" />
                            <div className="ownerDet">
                                <h1 className="xshead bhead">{u.firstName + '' + u.lastName}</h1>
                                <small>{formatDistanceToNowStrict(new Date(com.createdAt), { addSuffix: true })}</small>
                            </div>
                        </Link> : '')}
                        {/* comment body rendering */}
                        <p className="body">{com.body}</p>
                        {user._id === com.userId && <div className="moBtnContainer"><div className="mBtns">
                            <button className="modifyBtn delete" onClick={(e) => deleteComment(e, com._id)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> </button>
                       <Link to={`/comment-modify/${com._id}`} ><button className="edit modifyBtn "><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button></Link> 
                        </div></div>}
                    
                    </aside>
                :'')}
                </div>}
                {like && <div className="likes">{like.map(l => l.articaleId === d._id ? <div className="like" key={l._id}>
                    {users && users.map(u => u._id === l.userId && l.articaleId === id ? <Link to={`/user-profile/${l.userId}`} key={l._id}>
                        <FontAwesomeIcon style={{color:"red",fontSize:15}} icon={faHeart}></FontAwesomeIcon>
                        <img className="sImg" src={`data:${u.picture.contentType};base64,${u.picture.img}`} alt="" />
                    </Link>
                        :null)}
                    
                </div> :null)}
                </div>}

            </div>
        })}
        
        {/* the end */}
       
    </div>
    );
}
 
export default BlogDet;