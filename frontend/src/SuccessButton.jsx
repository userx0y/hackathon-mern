import React, { useState } from 'react';
import Confetti from 'react-confetti';

export default function SuccessButton() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(true)}>Click Me 🎉</button>
      {show && <Confetti />}
    </div>
  );
}
