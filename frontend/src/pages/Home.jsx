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
    fontSize : '60px',
    fontFamily : 'Montserrat',
    color : '#ffc40c'
  };

  const catStyle = {
    width : "50%"
  };
  const typeRef = useRef(null);
  useEffect(()=>{
    Aos.init({duration: 1000});
    const typed = new Typed(typeRef.current,{strings: ["Hey","thanks for being here","This is our project", "Hmmm...",
        "Hope you like it :)"], loop: true, typeSpeed: 60, backSpeed: 30});
    return () => {
      typed.destroy();
    }
  }, []);
  return (
    <>
    <div className="container-fluid gap-4" style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
      <h1 className="pt-5" style={{fontSize: '80px', fontFamily: "'Montserrat'"}} data-aos="fade-in">Welcome User</h1>
    </div>
    <br />
    <div className="container">
      <span style={style} ref={typeRef}></span>
    </div>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Lottie style={catStyle} animationData={Cat} />
    </div>
    </>
  )
};
export default Home;