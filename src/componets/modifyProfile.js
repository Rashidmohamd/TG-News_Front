import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const ModifyProfule = () => {
    const { user,setUser,Url } = useLogin();
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [nationality, setNational] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [err,setErr]=useState(null)
    useEffect(() => {
        if (user._id === id) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setAge(user.age);
            setNational(user.nationality);
            setGender(user.gender);
            setCity(user.city);
            setCountry(user.country)
        }
    }, [user])
    
    const saveChanges = async (e) => {
        e.preventDefault();
        const picture = document.getElementById('picture').files[0];
        const formData = new FormData();
        if (picture) formData.append('picture', picture);
        if (firstName && lastName && email && gender && age && city && country && nationality) {
            formData.append("Info", JSON.stringify({
                firstName, lastName, age,
                email, gender, city, country, nationality
            }));
            const res = await fetch(`${Url}/modify-me/${id}`, {
                method: 'PUT',
                headers: { "authorization": `Bearer ${user.token}` },
                body: formData
            });
            const json = await res.json();
            if (res.status === 201 || res.status===200) {
                console.log("success !")
                setUser({ type: "set-user", action: json });
            } else {
                setErr(json.error)
            }
           
        } else {
            setErr('sorry you can leave an empty field')
        }

    }
    return ( 
        <div className="modify-profile">
            {err && <h1 className="rhead xshead">{err}</h1>}
            {user._id === id && <form className="form" encType="multipart/form-data">
                <div className="head">
                    <label htmlFor="picture">
                        {user.picture.img && <img id="img" src={`data:${user.picture.contentType};base64,${user.picture.img}`} alt="user profile pic" />}
                        {!user.picture.img && <img id="img" src="/profile.jpg" alt="user alternive pic" />}
                        
                    </label>
                <input type="file" className="hide" name="picture" id="picture" onChange={e => {
                    const imgFiel = document.getElementById('img')
                    const img = e.target.files[0];
                    imgFiel.setAttribute('src',URL.createObjectURL(img))
                }} /></div>

                <label htmlFor="firstName">First Name :</label>
                <input type="text" value={firstName} onChange={ e=>setFirstName(e.target.value)} />
                <label htmlFor="lastName">last Name :</label>
                <input type="text" value={lastName} onChange={ e=>setLastName(e.target.value)}/>
                <label htmlFor="email">Email :</label>
                <input type="email" value={email} onChange={ e=>setEmail(e.target.value)}/>
                <label htmlFor="country">country :</label>
                <input type="text" value={country} onChange={ e=>setCountry(e.target.value)}/>
                <label htmlFor="city">city :</label>
                <input type="text" value={city}  onChange={ e=>setCity(e.target.value)}/>
                <label htmlFor="nationality">nationality :</label>
                <input type="text" value={nationality} onChange={ e=>setNational(e.target.value)} />
                <label htmlFor="gender">gender :</label>
                <input type="text" value={gender} onChange={ e=>setGender(e.target.value)} />
                <label htmlFor="age">age :</label>
                <input type="number" value={ age} onChange={ e=>setAge(e.target.value)} />

                <div className="btns">
                    <button className="btn blueBtn" onClick={saveChanges}>save</button>
                    <button className="btn redBtn" onClick={(e) => {
                        e.preventDefault()
                        navigate(-1)
                    }
                    }>concel</button>
                </div>
            </form>}
        </div>
     );
}
 
export default ModifyProfule;