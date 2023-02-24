import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useLogin from "../hooks/useLogin";
const Myblogs = () => {
    const { id } = useParams()
    const { Url, user } = useLogin();
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        const fet = async () => {
            setLoading(true)
            const res = await fetch(`${Url}/get-my-articales/${id}`, {
                headers:{"authorization":`Bearer ${user.token}`}
            });
            const json = await res.json();
            if (res.status === 200) {
                setErr(null)
                setData(json);
                setLoading(false)
            } else {
                setData(null)
                setErr(json.error);
                setLoading(false);
            }
        }
        fet().catch(err => {
            setData(null)
            setErr(err.message);
            setLoading(false)
        })
    },[])
    return ( 
        <div className="my-blogs">
            <h1 className="shead ghead">My Blogs</h1>
            <div className="container">
                {loading && <h1 className="shead bhead"> Please wait Loading ...</h1>}
                {err && <h1 className="shead rhead">{err }</h1>}
                {data && data.map(d => d.userId === id ?
                    <div className="article" key={d._id}>
                        <Link to={`/blog-details/${ d._id}`}>
                            {d.img && <img src={`data:${d.img.contentType};base64,${d.img.data}`} />}
                            <p className="note">{d.body.slice(0, 20 )} <span>read more ...</span></p>
                        </Link>
                </div>: '')}
            </div>
        </div>
     );
}
 
export default Myblogs;