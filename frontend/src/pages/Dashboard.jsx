import React, { useState } from 'react';

const Dashboard = () => {
  const [elements, setElements] = useState([]);

  const addQuote = () => {
    const quote = prompt("Enter your quote:");
    if (quote) {
      setElements([...elements, { type: 'quote', content: quote, x: 50, y: 50 }]);
    }
  };

  const addImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      setElements([...elements, { type: 'image', src: url, x: 50, y: 50 }]);
    }
  };

  const handleDrag = (e, index) => {
    const newElements = [...elements];
    newElements[index].x = e.clientX - 50; 
    newElements[index].y = e.clientY - 20;
    setElements(newElements);
  };

  const sidebarStyle = {
    width: '220px',
    padding: '15px',
    borderRight: '1px solid #ccc',
    backgroundColor: '#f7f7f7',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const canvasStyle = {
    flex: 1,
    position: 'relative',
    backgroundColor: '#e0e0e0',
    overflow: 'hidden'
  };

  const quoteStyle = (x, y) => ({
    position: 'absolute',
    left: x,
    top: y,
    cursor: 'move',
    padding: '8px',
    backgroundColor: 'white',
    border: '1px solid #333',
    borderRadius: '5px',
    maxWidth: '200px',
    wordWrap: 'break-word'
  });

  const imageStyle = (x, y) => ({
    position: 'absolute',
    left: x,
    top: y,
    width: '120px',
    height: 'auto',
    cursor: 'move',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
  });

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={sidebarStyle}>
        <button style={buttonStyle} onClick={addQuote}>Add Quote</button>
        <button style={buttonStyle} onClick={addImage}>Add Image</button>
      </div>
      <div style={canvasStyle}>
        {elements.map((el, index) => (
          el.type === 'quote' ? (
            <div
              key={index}
              style={quoteStyle(el.x, el.y)}
              onMouseDown={(e) => {
                e.preventDefault();
                const onMouseMove = (eMove) => handleDrag(eMove, index);
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', () => {
                  window.removeEventListener('mousemove', onMouseMove);
                }, { once: true });
              }}
            >
              {el.content}
            </div>
          ) : (
            <img
              key={index}
              src={el.src}
              alt=""
              style={imageStyle(el.x, el.y)}
              onMouseDown={(e) => {
                e.preventDefault();
                const onMouseMove = (eMove) => handleDrag(eMove, index);
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', () => {
                  window.removeEventListener('mousemove', onMouseMove);
                }, { once: true });
              }}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
