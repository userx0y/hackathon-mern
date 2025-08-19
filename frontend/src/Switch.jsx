import React from 'react';
import styled from 'styled-components';

const Switch = () => {
  return (
    <StyledWrapper>
      <div className="button-border">
        <div className="button-base">
          <button className="button">Punch</button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button-border {
    border: 8px solid #ffae70;
    outline: 4px solid;
    border-radius: 100px;
  }

  .button-base {
    background-color: #75221c;
    outline: 2px solid black;
    position: relative; /* Gövde içinde konumlama gerekebilir */
    border-radius: 100px;
  }

  .button {
    border-radius: 100px;
    font-family: "Press Start 2P", cursive;
    font-size: 32px;
    outline: 2px solid black;
    border: 4px solid;
    border-left-color: #e7b8b4;
    border-top-color: #f8c9c5;
    border-bottom-color: #4e1814;
    border-right-color: #79241e;
    background-color: #e64539;
    cursor: pointer;
    color: #ffee83;
    padding: 20px 30px;
    transform: translateY(-20%);
  }

  .button:hover {
    transform: translateY(-10%); /* Hover durumunda butonu yukarı kaydır */
  }

  .button:active {
    transform: translateY(0); /* Butona tıklanırken konumlandırmayı geri al */
  }`;

export default Switch;
