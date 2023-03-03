import { useEffect, useReducer } from "react";
import useLogin from "../hooks/useLogin";
const likeReducer = (state, action) => {
    switch (action.type) {
        case "set-likes":
            return { likes: action.paylaod };
        case "add-like":
            return state.likes ? { likes: [action.paylaod, ...state.likes] } : { likes:[ action.paylaod] };
        case 'delete-like':
            return { likes: state.likes.filter(l=>l._id!==action.paylaod._id) };
        default:
            return state
    }
}

const useLike = () => {
    const [like, setLike] = useReducer(likeReducer, { likes: null })
    const { user ,Url} = useLogin()
    useEffect(() => {
        const fet = async () => {
            const res = await fetch(`${Url}/likes`, {
                headers:{"authorization":`Bear ${user.token}`}
            })
            const json = await res.json();
            if(res.status===200)setLike({type:'set-likes',paylaod:json})
        }
        fet().catch()
    }, [Url,user])
    return {...like,setLike};
}
export default useLike ;