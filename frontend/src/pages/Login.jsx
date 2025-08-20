import { useEffect, useRef, useState } from 'react';
import posterFile from '../assets/space_poster.jpeg';
import VanillaTilt from 'vanilla-tilt';
import Button from '../Button';
import { NavLink, useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate()
  const tiltRef = useRef(null);
  useEffect(()=>{
    VanillaTilt.init(tiltRef.current, {glare : false, max: 20, speed: 20});
  },[]);
  const [Form, setForm] = useState({
    email : "",
    password : ""
  }); 
  const handleOnChange = (e) => {
    setForm({...Form, [e.target.name]: e.target.value});
  };
  const handleOnSubmit = (e) =>{
    e.preventDefault();
    console.log(Form)
    console.log('hahaha');
    fetch('http://localhost:5000/login', {
      method : "POST",
      headers : { "Content-Type" : "application/json" },
      body : JSON.stringify(Form)
    }).then((res)=> res.json()).then((data)=>{
      const getMsgBox = document.getElementById('msgBox');
      if(data.status == "success"){
        getMsgBox.style.color = "green";
        getMsgBox.style.fontWeight = "bolder";
        getMsgBox.innerHTML = data.message;
        localStorage.setItem("username", data.name);
        localStorage.setItem("email", data.email);
        navigate('/home')
      }else if(data.status == 'failed'){
        getMsgBox.style.color = "red";
        getMsgBox.style.fontWeight = "bolder";
        getMsgBox.innerHTML = data.message;
      };
      setTimeout(()=>{
        getMsgBox.innerHTML = "";
      }, 1000);
    }).catch((err)=>{
      console.log(err);
    });
  };
  return (
    <>
    <div className="container-fluid" style={{height: '100vh',padding: '0px 0px', position: 'relative'}}>
        <video autoPlay muted playsInline loop poster={posterFile} style={{height:'100%', width: '100%', objectFit: 'cover', position: 'absolute', zIndex: '1'}} src='../public/assets/ezgif.mp4' ></video>
        <div style={{position: 'absolute', justifyContent: 'center', alignItems:'center', display: 'flex', zIndex: '2', height: '100%', width: '100%'}}>
          <form onSubmit={handleOnSubmit} ref={tiltRef} style={{padding: '2rem', maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.15)',backdropFilter: 'blur(10px)', width: '90%', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', justifyContent: 'center', flexDirection:'column'}}>
            <h1 className='text-white'>Login</h1>
            <br />
            <input type="email" className="form-control mb-3" placeholder="Email" value={Form.email} name='email' onChange={handleOnChange} />
            <input type="password" className="form-control mb-3" placeholder="Password" value={Form.password} name='password' onChange={handleOnChange} />
            <span id='msgBox'></span>
            <br />
          <Button />
          <br />
          <div className='d-flex gap-2'>
          <span className='text-white'>Don't have an account?</span><NavLink to='/'>Signup</NavLink>
          </div>
        </form>
        </div>
    </div>
    </>
  )
};
export default Login