import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useLogin from "../hooks/useLogin";
const BlogModify = () => {
    const { id } = useParams();
    const { data ,setData } = useFetch()
    const {user,Url}=useLogin()
    const [articale, setArt] = useState('')
    useEffect(() => {
        function filt() {
            data.map(dat=>dat._id===id?setArt(dat.body):'')
        }
        filt()
    },[])
    const navigat = useNavigate()
    const navi = (e) => {
        e.preventDefault();
        navigat(-1)
    }
    const modify = async (e) => {
        e.preventDefault();
        const image = document.getElementById("file").files[0];
        const formData = new FormData();
        if (articale) formData.append('articale', JSON.stringify(articale));
        if (image) formData.append("image", image);
        const res = await fetch(`${Url}/update-articale/${id}`, {
            headers: { "authorization": `Bearer ${user.token}` },
            method: "PUT",
            body: formData
        })
        const json = await res.json();
        if (res.status === 201) {
            setData({ type: 'update-data', paylaod: json });
            navigat('/')
        } else if (res.status > 201) {
            console.log(json)
        }
        
    }
    
    return ( 
        <div className="blog-modify">
            {data && data.map(dat => dat._id === id ? <form encType="multipart/form-data" key={dat._id}>
                <div className="head"><label className="img" htmlFor="file"> {dat.img && <img id="img" src={`data:${dat.img.contentType};base64,${dat.img.data}`}
                    alt="blog hero" />
                }
                    {!dat.img && <img id="img" alt="altetnativimg" src="/gallary.png"/>}
                </label>
                <input type="file" name="image" id="file" className="hide" onChange={() => {
                     const img = document.getElementById('img');
                    const file = document.getElementById('file').files[0];
                    img.setAttribute('src', URL.createObjectURL(file))
                    
                }} /></div>
                <textarea value={articale} onChange={e => {
                    setArt(e.target.value)
                }}></textarea>
                <div className="btns">
                    <button className="btn blueBtn" onClick={modify}>Save</button>
                    
                    <button className="btn redBtn" onClick={navi}>Cancel</button>
                </div>
            </form> :'')}
        </div>
     );
}
 
export default BlogModify;