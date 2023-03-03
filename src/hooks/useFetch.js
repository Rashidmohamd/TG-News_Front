import { useEffect,useState } from "react";
import useLogin from "./useLogin";
import useUpdate from "./useUpdate";

const useFetch = () => {
    const { user,users,Url,count,} = useLogin()
    const [err, setErr] = useState(null);
    const [laoding, setLaoding] = useState(false);
    const { setData, data } = useUpdate();
    const [end, setEnd] = useState(null)
    useEffect(() => {
        const fetching = async () => {
            const res = await fetch(`${Url}/articales?Block=${count|| 0}`, {
                headers: {
                    "authorization": `Bearer ${user.token}`
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                if (json.end) {
                    setEnd(json.end);
                } else {
                    setData({ type: "set-all-data", paylaod: json }); 
                }
                setLaoding(false)
            } else {
                setErr(json.error);
                setLaoding(false);
            }
            
        }
        
            if (!data) {
                fetching().catch((err) => {
                    if (err.message === 'Failed to fetch') {
                        setErr(err.message);
                        setLaoding(false);
                    }
                    setLaoding(false);
                });
            } else if (data && count > data.length / 3 ) {
                fetching().catch((err) => {
                    if (err.message === 'Failed to fetch') {
                        setErr(err.message);
                        setLaoding(false);
                    }
                    setLaoding(false);
                });
            }
        
        if (!data || !users ) {
            setLaoding(true)
        } else {
            setLaoding(false)
            setErr(null)
        }
        
    }, [count]);
    return { data ,err,end, laoding ,setData}
}
 
export default useFetch;