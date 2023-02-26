import { createContext, useReducer, useEffect,useState } from 'react';

export const LoginContext = createContext();
const useReducerFunc = (state, action) => {
    switch (action.type) {
        case "set-user":
            localStorage.setItem("user", JSON.stringify(action.paylaod));
            return {user: action.paylaod}
        case "log-in":
            return { user: action.paylaod };
        case 'log-out':
            localStorage.removeItem("user")
            return { user: null };
        default:
            return state;
    }
}

export const LoginContextProvider = ({ children }) => {
    const [user, setUser] = useReducer(useReducerFunc, { user: null });
    const [users, setUsers] = useState(null)
    const [signTkn, setSignTkn] = useState(null)
    const [msg, setMsg] = useState('');
    const [count, setCount] = useState(0);
    const [fire, setFire] = useState(false);
    // const Url = 'https://tg-news-4n34.onrender.com/TG-news';
    const Url = 'http://localhost:8000/TG-news';
    useEffect(() => {
        const token = localStorage.getItem("user");
        const tkn = localStorage.getItem("signTkn");
      
        if (tkn) setSignTkn(tkn);
        console.log(token)
        if (!token) return
        
           const parsedTkn = JSON.parse(token)
            setUser({ type: "log-in", paylaod: parsedTkn })
            const feting = async () => {
                const res = await fetch(`${Url}/users`, {
                    headers: { "authorization": `Bearer ${parsedTkn.token}` }
                })

                const json = await res.json()
                console.log(json)
                if (res.status === 200) setUsers(json);
            
            }
            feting();
    }, [fire,Url]);
    return (
        <LoginContext.Provider value={{...user,setSignTkn,count,setCount,signTkn,msg,users,setMsg,setUser,setFire,Url}}>
            {children}
        </LoginContext.Provider>
    )
}