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
        <p style={{ textAlign: "justify", fontSize: '20px'}}data-aos="flip-down">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus hic, reiciendis perspiciatis voluptatum, mollitia maxime dolores recusandae commodi voluptatibus eos blanditiis consequuntur. In asperiores quam illo nam rem! Ducimus, eos.
            Ut esse doloribus dolor cupiditate qui voluptates omnis quaerat, veniam natus corrupti dignissimos mollitia, consequatur molestiae. Cupiditate est reprehenderit eius tenetur maiores odio, animi suscipit harum eligendi, iste ullam nihil?
            Placeat reiciendis nulla voluptates sint sapiente minus ut repudiandae. Quo illum rerum magnam ullam aspernatur at maiores. Saepe nobis esse ab officiis voluptatibus aspernatur ipsam recusandae blanditiis. Veniam, hic molestias!
            Debitis magni deserunt ad, esse at illo mollitia provident ipsam tempore eaque repellendus sed doloribus aliquid assumenda possimus asperiores, ducimus voluptates nihil distinctio id expedita perferendis enim amet? A, ea?
            Sapiente sint non explicabo obcaecati, excepturi illo? Repellat sit repellendus modi delectus ut consectetur nesciunt doloremque obcaecati. Sed dolorum sint nulla provident dicta, laudantium animi ipsam. Consequatur autem ducimus at!
            Velit, sequi temporibus ea voluptatem cum et molestiae mollitia atque vitae optio pariatur sit, beatae natus, reiciendis hic suscipit aliquid ab deleniti voluptatum perspiciatis repudiandae vel! Similique, minus ut. Ullam?
            Minus temporibus magni repellat nesciunt aliquam quae veritatis praesentium eius blanditiis nulla itaque ex vitae quibusdam expedita distinctio sit, sapiente quas harum quisquam doloribus eum atque! Inventore natus tempora aliquam.
        </p>
        </div>
    </div>
    </>
  )
};
export default About;