import Aos from "aos";
import "./Home.css";
import "aos/dist/aos.css";
import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import Cat from "../assets/Cat_Movement.json"
import Typed from "typed.js";
const Home = () => {
  const username = localStorage.getItem("username") || "Guest";
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
      <h1 className="pt-5" style={{fontSize: '50px', fontFamily: "'Montserrat'", color: '#4169e1'}} data-aos="fade-in">Welcome</h1>
    </div>
    <br />
    <div className="container" style={{height: '190px'}}>
      <span style={style} ref={typeRef}></span>
    </div>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Lottie style={catStyle} animationData={Cat} />
    </div>
    </>
  )
};
export default Home;