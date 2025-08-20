import { useEffect, useRef, useState } from 'react';
import { API_BASE } from "../config";
import posterFile from '../assets/space_poster.jpeg';
import VanillaTilt from 'vanilla-tilt';
import Button from '../Button';
import { NavLink } from 'react-router-dom';
const Registration = () => {
  const tiltRef = useRef(null);
  useEffect(()=>{
    VanillaTilt.init(tiltRef.current, {glare : false, max: 20, speed: 20});
  },[]);
  const [Form, setForm] = useState({
    name : "",
    email : "",
    password : "",
    confirm_password : ""
  }); 
  const handleOnChange = (e) => {
    setForm({...Form, [e.target.name]: e.target.value});
  };
  const handleOnSubmit = (e) =>{
    e.preventDefault();
    console.log(Form)
    console.log('hahaha');
    fetch(`${API_BASE}/register`, {
      method : "POST",
      headers : { "Content-Type" : "application/json" },
      body : JSON.stringify(Form)
    }).then((res)=> res.json()).then((data)=>{
      const getMsgBox = document.getElementById('msgBox');
      if(data.status == "success"){
        getMsgBox.style.color = "green";
        getMsgBox.style.fontWeight = "bolder";
        getMsgBox.innerHTML = data.message;
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
            <h1 className='text-white'>Sign up</h1>
            <br />
            <input type="text" className="form-control mb-3" placeholder="Name" value={Form.name} name='name' onChange={handleOnChange} />
            <input type="email" className="form-control mb-3" placeholder="Email" value={Form.email} name='email' onChange={handleOnChange} />
            <input type="password" className="form-control mb-3" placeholder="Password" value={Form.password} name='password' onChange={handleOnChange} />
            <input type="password" className="form-control mb-3" placeholder="Confirm Password" value={Form.confirm_password} name='confirm_password' onChange={handleOnChange} />
            <span id='msgBox'></span>
            <br />
          <Button />
          <br />
          <div className='d-flex gap-2'>
          <span className='text-white'>Have an account?</span><NavLink to='/login'>Login</NavLink>
          </div>
        </form>
        </div>
    </div>
    </>
  )
};
export default Registration