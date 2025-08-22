import { useEffect, useRef, useState } from 'react';
import backgroundVideo from "../assets/background.mp4";
import backgroundPoster from "../assets/background_image.jpg"
import VanillaTilt from 'vanilla-tilt';
import Button from '../Button';
import Confetti from 'react-confetti';
import { API_BASE } from '../config';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const tiltRef = useRef(null);
  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {glare: false, max: 3, speed: 5});
  }, []);
  
  const [form, setForm] = useState({email: "", password: ""});
  
  const handleOnChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    
    // fetch('http://localhost:5000/api/users/login', {
    fetch(`${API_BASE}/api/users/login`, {
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
        sessionStorage.setItem("username", data.name);
        const msg = new SpeechSynthesisUtterance(`Welcome ${data.name}`);
        const voices = window.speechSynthesis.getVoices();
        msg.voice = voices.find(voice => voice.name.includes("Google UK English Female")) || voices[0];
        window.speechSynthesis.speak(msg);
        setShowConfetti(true);
        setTimeout(() => {navigate('/home');}, 3000);
      } else if (data.status === 'failed') {
        getMsgBox.style.color = "red";
        getMsgBox.style.fontWeight = "bolder";
        getMsgBox.innerHTML = data.message;
        setTimeout(() => {getMsgBox.innerHTML = "";}, 3000);
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
        {showConfetti && (<Confetti recycle={false} numberOfPieces={200} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999}} onConfettiComplete={(confetti) => {setShowConfetti(false);}} />)}
        
        <video autoPlay muted playsInline loop poster={backgroundPoster} style={{height: '100%', width: '100%', objectFit: 'cover', position: 'absolute', zIndex: '1', backgroundPosition: 'center', backgroundRepeat: 'none', backgroundSize: 'contain'}} src={backgroundVideo}></video>
        
        <div style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'flex', zIndex: '2', height: '100%', width: '100%'}}>
          <form onSubmit={handleOnSubmit} ref={tiltRef} style={{padding: '2rem', maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '20px', backdropFilter: 'blur(10px)', width: '90%', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <h1 className='text-white'>Login</h1>
            <br />
            <input type="email" className="form-control mb-3" placeholder="Email" value={form.email} name='email' onChange={handleOnChange} />
            <input type="password" className="form-control mb-3" placeholder="Password" value={form.password} name='password' onChange={handleOnChange} />
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
