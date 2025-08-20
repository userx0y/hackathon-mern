import React, { useState } from 'react';

const Dashboard = () => {
  const [elements, setElements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(""); // "quote" or "image"
  const [inputValue, setInputValue] = useState("");

  const openForm = (type) => {
    setFormType(type);
    setInputValue("");
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    if (formType === "quote") {
      setElements([...elements, { type: 'quote', content: inputValue, x: 50, y: 50 }]);
    } else if (formType === "image") {
      setElements([...elements, { type: 'image', src: inputValue, x: 50, y: 50 }]);
    }
    setShowForm(false);
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
    gap: '15px'
  };

  const buttonStyle = {
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const canvasStyle = {
    flex: 1,
    position: 'relative',
    background: 'linear-gradient(135deg, #f0f0f0, #d0d0d0)',
    overflow: 'hidden'
  };

  const quoteStyle = (x, y) => ({
    position: 'absolute',
    left: x,
    top: y,
    cursor: 'move',
    padding: '10px',
    backgroundColor: '#7d3d3dff',
    border: '1px solid #333',
    borderRadius: '5px',
    maxWidth: '200px',
    wordWrap: 'break-word',
    boxShadow: '2px 2px 6px rgba(0,0,0,0.2)'
  });

  const imageStyle = (x, y) => ({
    position: 'absolute',
    left: x,
    top: y,
    width: '120px',
    cursor: 'move',
    borderRadius: '10px',
    transition: 'transform 0.2s',
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
  });

  const formOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    minWidth: '300px'
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={sidebarStyle}>
        <button style={buttonStyle} onClick={() => openForm("quote")}>Add Quote</button>
        <button style={buttonStyle} onClick={() => openForm("image")}>Add Image</button>
      </div>
      <div style={canvasStyle}>
        {elements.map((el, index) =>
          el.type === 'quote' ? (
            <div key={index} style={quoteStyle(el.x, el.y)} onMouseDown={e => {
              e.preventDefault();
              const onMouseMove = eMove => handleDrag(eMove, index);
              window.addEventListener('mousemove', onMouseMove);
              window.addEventListener('mouseup', () => window.removeEventListener('mousemove', onMouseMove), { once: true });
            }}>
              {el.content}
            </div>
          ) : (
            <img key={index} src={el.src} alt="" style={imageStyle(el.x, el.y)} onMouseDown={e => {
              e.preventDefault();
              const onMouseMove = eMove => handleDrag(eMove, index);
              window.addEventListener('mousemove', onMouseMove);
              window.addEventListener('mouseup', () => window.removeEventListener('mousemove', onMouseMove), { once: true });
            }} onMouseEnter={e => e.target.style.transform='scale(1.1)'} onMouseLeave={e => e.target.style.transform='scale(1)'} />
          )
        )}
      </div>

      {/* Popup Form */}
      {showForm && (
        <div style={formOverlayStyle} onClick={() => setShowForm(false)}>
          <form style={formStyle} onClick={e => e.stopPropagation()} onSubmit={handleFormSubmit}>
            <h3>{formType === 'quote' ? 'Add Quote' : 'Add Image URL'}</h3>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={formType === 'quote' ? 'Enter quote...' : 'Enter image URL...'}
              style={{ width: '100%', padding: '10px', marginTop: '10px', marginBottom: '15px' }}
            />
            <button type="submit" style={buttonStyle}>Add</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
