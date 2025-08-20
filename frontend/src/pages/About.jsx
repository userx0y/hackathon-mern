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
        <h1 className="ps-5" data-aos="flip-left" style={{fontFamily: "'Montserrat'", fontSize: '70px'}}>About us</h1>
        <div className="d-flex justify-content-start p-5">
        <p style={{ textAlign: "justify", fontSize: '20px'}} data-aos="flip-down">
            Welcome to our College Yearbook Page Builder! This project lets students create their own personalized yearbook pages with a simple drag-and-drop interface. You can add images, write quotes, and arrange them however you like to make your page truly unique.  
            Our goal is to make yearbooks more interactive and fun, giving everyone a chance to express themselves creatively. Whether it’s sharing memories, adding favorite quotes, or decorating with photos, this platform makes it easy for students to design their page exactly the way they imagine.  
            We hope this tool brings joy and nostalgia, capturing the moments that make college life memorable.
        </p>
        </div>
    </div>
    </>
  )
};
export default About;