import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TypingText() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [ "Hello, world!", "Welcome to the creative app.", "Enjoy the typing effect!" ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true });

    return () => {
      typed.destroy();
    };
  }, []);

  return <span ref={el}></span>;
}
