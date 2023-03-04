import {  useState } from "react";
import { Link} from "react-router-dom";
import useLogin from "../hooks/useLogin";
import {formatDistanceToNowStrict} from 'date-fns'
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit,faTrash,faFileUpload,faHeart,faAdd} from '@fortawesome/free-solid-svg-icons'
import useLike from "./useLikes";

const Blog = () => {
    const { user, users,Url ,count,setCount} = useLogin();
    const { data, err, laoding,end, setData } = useFetch();
    const [articale, setArt] = useState('');
    const [errc, setErr] = useState(null);
    const { likes, setLike } = useLike();
    const openform = (e) => {
        e.preventDefault();
        const togl = document.querySelector('.toggle')
        const f = document.querySelector(".tag");
        const t = document.querySelector(".textInput");
        const imgL = document.querySelector(".imgLab")
        if (f.classList.contains('show')) f.classList.remove('show');
        if (!f.classList.contains('show')) f.classList.add('show');
        if (t.classList.contains("open")) {
            t.classList.remove('open')
            togl.classList.remove('delete')
            togl.classList.add('edit')
            imgL.classList.remove("imgLabel");
            setErr(null)
        } else {
            t.classList.add("open")
            imgL.classList.add("imgLabel")
            togl.classList.remove('edit')
            togl.classList.add('delete')
        }
    }
    const publish = async (e) => {
        e.preventDefault();
        const t = document.querySelector(".textInput");
        const imgL = document.querySelector(".imgLab");
        const im = document.querySelector('.imgLab');
        const togl = document.querySelector('.toggle');

        const formInfo = new FormData();
        const img = document.querySelector("#img").files[0];
        if (!img && !articale) {
            return setErr("Sorry can not publish an empty articale at least put img or some words so that you will be able to publish freely ")
        }
        if (img) formInfo.append("image", img);
        formInfo.append("articale",JSON.stringify({articale:articale}));
        const res = await fetch(`${Url}/add-articale`, {
            method: "POST",
            headers: { "authorization": `Bearer ${user.token}` },
            body: formInfo
        });
        const json = await res.json();
        if (res.status === 201) {
            setData({ type: "adding-new-data", paylaod: json });
            setArt('');
            t.classList.remove('open');
            imgL.classList.remove("imgLabel");
            togl.classList.remove('delete')
            togl.classList.add('edit')
            im.innerHTML = "<img src='/gallary.png' alt='check' />"
        }
        setErr(json.error);
        
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
            setLike({type:'delete-like',paylaod:json})
        } else {
            console.log(json)
        }
        
    }

    const deleteArticale = async (id) => {
        const res = await fetch(`${Url}/delete-articale/${id}`, {
            method: "DELETE",
            headers:{"authorization":`Bearer ${user.token}`}
        })
        const json = await res.json();
        if (res.status === 200) {
            setData({ type: "removed-one", paylaod: json });
        }
    }
    return ( 
        <div className="blogs" >
            {err && <h1 className="shead rhead">{err}</h1>}
            {laoding && <h1 className="shead ghead">please wait laoding ...</h1>}
            {!err && !data && !laoding && <h1 className="shead bhead">sorry nothing to show but you can be first one who can publish you cam try it</h1>}
            {/* bolg section */}
            {users && data ?data.map(dat => {
                return <div className="blog" key={dat._id}>
                    <div className="publisher">

                        {users &&  users.map(u => u._id === dat.userId ? <Link key={u._id} to={`user-profile/${dat.userId}`}>
                            {u.picture && <img src={`data:${u.picture.contentType};base64,${u.picture.img}`} alt="if found" />}
                            {!u.picture && <img src="/profile.jpg" alt="user alternive pic"/>}
                            <div className="div">
                                <h1 id="id" className="name">{ u.firstName + " " + u.lastName}</h1>
                                <div className="time">Published {formatDistanceToNowStrict(new Date(dat.createdAt), { addSuffix: true })}</div>
                            </div>
                        </Link> : '')}
                    </div>
                    <div className="blogBody">
                        {dat.img && <img src={`data:${dat.img.contentType};base64,${dat.img.data}`} className="bolgImg" alt="blog grahp" />}
                        <p className="body mtext dtext">
                            {dat.body.slice(0, 150)} <Link to={`blog-details/${dat._id}`}>read more...</Link>
                        </p>
                    </div>
                    <div className="commentSect">
                        <span className="loved"> <FontAwesomeIcon className="heart " onClick={()=>loving(dat._id)} icon={faHeart}  style={{color:`${likes && likes.some(l=>l.userId===user._id && l.articaleId===dat._id)?'red':''}`}}></FontAwesomeIcon> {dat.likes}</span>
                        <span className="comment">{dat.comments} <Link to={`blog-details/${dat._id}`}> comments</Link></span>
                    </div>
                    {user._id===dat.userId && <div className="moBtnContainer"><div className="mBtns">
                        
                        <button className="modifyBtn delete" onClick={e => {
                            e.preventDefault()
                            deleteArticale(dat._id).catch(err=>setErr(err.message))
                        }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                        <Link to={`/blog-modify/${dat._id}`}>
                        <button className="edit modifyBtn "><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button></Link>
                    </div></div>}
                </div>
            }):''}

      {/* input section  */}
          
            <div className="inputSect">
                {errc && <h1 className="redNote note">{ errc}</h1>}
                <button icon={faAdd} onClick={openform} className="inputBtn toggle edit">
                    <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
                </button>
                <form className="form tag" encType="multipart/form-data" >
                    <label htmlFor="img" className=" imgLab">
                        <img src="/gallary.png" alt="gallary"  className="im" />
                    </label>
                    <input type="file" name="image" id="img" className="imgInput" onChange={() => {
                        const im = document.querySelector('.imgLab');
                        const imm = document.getElementById('img')
                        const img =imm.files[0]
                        im.innerHTML = `<img src=${URL.createObjectURL(img)} alt="nothing"/>`
                    }} />
                    <textarea  value={articale} onChange={e=>setArt(e.target.value)} className="textInput " />
                    <button className="formBtn send" onClick={publish}><FontAwesomeIcon icon={faFileUpload}></FontAwesomeIcon></button>
                </form>
            </div>
           {!end && !laoding && users ?<button onClick={(e) => {
                e.preventDefault();
                setCount(count+1)
            }} className="btn blueBtn">Click For More ...</button>:''}
        </div>
     );
}
 
export default Blog;