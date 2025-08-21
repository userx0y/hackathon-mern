import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";
const About = () => {
    useEffect(()=>{
        Aos.init({duration: 1000});
    },[]);
  return (
    <>
    <div className="container-fluid pt-5">
        <h1 className="ps-5" data-aos="zoom-in" style={{fontFamily: "'Montserrat'", fontSize: '70px'}}>About us</h1>
        <div className="d-flex justify-content-start p-5">
        <p style={{ textAlign: "justify", fontSize: '20px'}} data-aos="zoom-out">
          A minimal notepad website. Write down your ideas, lists, and thoughts. No distractions, no complications.
        </p>
        </div>
    </div>
    </>
  )
};
export default About;