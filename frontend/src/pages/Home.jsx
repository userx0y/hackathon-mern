import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import Cat from "../assets/Cat_Movement.json"
import Typed from "typed.js";
const Home = () => {
  const handleme = () =>{
    const voices = window.speechSynthesis.getVoices();
    console.log(voices);
  };
  const username = sessionStorage.getItem("username");
  const splitted = username.split(" ");
  const len = splitted.length;
  let name = "";
  if(len == 2){
      const first = splitted[0][0].toUpperCase() + splitted[0].slice(1);
      const second = splitted[1][0].toUpperCase() + splitted[1].slice(1);
      name = first + " " + second;
  } else {
      name = splitted[0][0].toUpperCase() + splitted[0].slice(1);
  };
console.log(name);
  const style = {
    fontSize : '50px',
    fontFamily : 'Montserrat',
    color : '#ffc40c'
  };

  const catStyle = {
    maxWidth : "600px",
    width : '80%'
  };
  const typeRef = useRef(null);
  useEffect(()=>{
    Aos.init({duration: 1000});
    const typed = new Typed(typeRef.current,{strings: ["Capture your ideas.", "Don't let them fade away."], loop: true, typeSpeed: 70, backSpeed: 30});
    return () => {
      typed.destroy();
    }
  }, []);
  return (
    <>
    <div className="container gap-4" style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
      <h1 className="pt-5" style={{fontSize: '50px', fontFamily: "'Montserrat'", color: '#4169e1'}} data-aos="fade-in" onClick={handleme}>Welcome {name}</h1>
    </div>
    <br />
    <div className="container " style={{height: '220px'}}>
      <span style={style} ref={typeRef}></span>
    </div>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Lottie style={catStyle} animationData={Cat} />
    </div>
    <style>
      {`.typed-cursor {
  font-size: 60px;
  color: #3b087a;
  font-weight: bold;
}`}
    </style>
    </>
  )
};
export default Home;