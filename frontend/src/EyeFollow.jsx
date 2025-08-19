import React, { useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

export default function EyeFollow() {
  const tiltRef = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
    });
  }, []);

  return (
    <div
      ref={tiltRef}
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url('https://kiera-dev.github.io/catfacts/images/jack.png')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
        backgroundSize: 'contain'
      }}
    ></div>
  );
}
