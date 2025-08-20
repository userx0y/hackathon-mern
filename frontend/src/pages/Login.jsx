import { useEffect, useRef, useState } from 'react';
import posterFile from '../assets/space_poster.jpeg';
import VanillaTilt from 'vanilla-tilt';
import Button from '../Button';
import Confetti from 'react-confetti';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const tiltRef = useRef(null);
  
  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {glare: false, max: 20, speed: 20});
  }, []);
  
  const [form, setForm] = useState({
    email: "",
    password: ""
  }); 
  
  const handleOnChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    
    fetch('http://localhost:5000/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    .then((res) => res.json())
    .then((data) => {
      const getMsgBox = document.getElementById('msgBox');
      
      if (data.status === "success") {
        getMsgBox.style.color = "green";
        getMsgBox.style.fontWeight = "bolder";
        getMsgBox.innerHTML = data.message;
        
        // Store user data
        localStorage.setItem("username", data.user?.name || "");
        localStorage.setItem("email", data.user?.email || "");
        localStorage.setItem("token", data.token || "");
        
        // Show confetti
        setShowConfetti(true);
        
        // Navigate after confetti animation
        setTimeout(() => {
          navigate('/home');
        }, 3000); // Wait for confetti to play for 3 seconds
      } else if (data.status === 'failed') {
        getMsgBox.style.color = "red";
        getMsgBox.style.fontWeight = "bolder";
        getMsgBox.innerHTML = data.message;
        
        setTimeout(() => {
          getMsgBox.innerHTML = "";
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err);
      const getMsgBox = document.getElementById('msgBox');
      getMsgBox.style.color = "red";
      getMsgBox.style.fontWeight = "bolder";
      getMsgBox.innerHTML = "Connection error. Please try again.";
    });
  };

  return (
    <>
      <div className="container-fluid" style={{height: '100vh', padding: '0px 0px', position: 'relative', overflow: 'hidden'}}>
        {showConfetti && (
          <Confetti 
            recycle={false} 
            numberOfPieces={200} 
            style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999}}
            onConfettiComplete={(confetti) => {
              setShowConfetti(false);
            }}
          />
        )}
        
        <video 
          autoPlay 
          muted 
          playsInline 
          loop 
          poster={posterFile} 
          style={{height: '100%', width: '100%', objectFit: 'cover', position: 'absolute', zIndex: '1'}} 
          src='../public/assets/ezgif.mp4'
        ></video>
        
        <div style={{
          position: 'absolute', 
          justifyContent: 'center', 
          alignItems: 'center', 
          display: 'flex', 
          zIndex: '2', 
          height: '100%', 
          width: '100%'
        }}>
          <form 
            onSubmit={handleOnSubmit} 
            ref={tiltRef} 
            style={{
              padding: '2rem', 
              maxWidth: '400px', 
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)', 
              width: '90%', 
              border: '1px solid rgba(255, 255, 255, 0.2)', 
              display: 'flex', 
              justifyContent: 'center', 
              flexDirection: 'column'
            }}
          >
            <h1 className='text-white'>Login</h1>
            <br />
            <input 
              type="email" 
              className="form-control mb-3" 
              placeholder="Email" 
              value={form.email} 
              name='email' 
              onChange={handleOnChange} 
              required
            />
            <input 
              type="password" 
              className="form-control mb-3" 
              placeholder="Password" 
              value={form.password} 
              name='password' 
              onChange={handleOnChange} 
              required
            />
            <span id='msgBox'></span>
            <br />
            <Button />
            <br />
            <div className='d-flex gap-2'>
              <span className='text-white'>Don't have an account?</span>
              <NavLink to='/'>Signup</NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;