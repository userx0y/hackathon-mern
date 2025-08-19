import Lottie from "lottie-react";
import error from "../assets/404.json";
const NotFound = () => {
    const style = {
        width : "90%",
        maxWidth : '600px'
    };
  return (
    <>
    <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
        <Lottie style={style} animationData={error} />
    </div>
    <h1 className="text-center ps-2" style={{fontFamily: 'monospace'}}>Oops 404 Page not found :)</h1>
    </>
  )
};
export default NotFound;