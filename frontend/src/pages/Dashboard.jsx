import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PAGE_TITLE = "dashboard";

const Dashboard = () => {
  const [elements, setElements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(""); // "quote" or "image"
  const [inputValue, setInputValue] = useState("");

// Load dashboard elements from backend on mount
useEffect(() => {
  axios.get(`http://localhost:5000/api/page/${PAGE_TITLE}`)
    .then(res => {
      if (res.data?.page?.elements) setElements(res.data.page.elements);
    })
    .catch(() => setElements([]));
}, []); 


// Save elements to backend
const saveElements = (newElements) => {
  axios.post('http://localhost:5000/api/page', { title: PAGE_TITLE, elements: newElements })
    .catch(err => console.error("Error saving elements:", err));
};

  const openForm = (type) => {
    setFormType(type);
    setInputValue("");
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;

    let newElements;
    if (formType === "quote") {
      newElements = [...elements, { type: 'quote', content: inputValue, x: 80, y: 80 }];
    } else {
      newElements = [...elements, { type: 'image', src: inputValue, x: 80, y: 80 }];
    }
    setElements(newElements);
    saveElements(newElements);
    setShowForm(false);
  };

  const handleDrag = (e, index) => {
    const newElements = [...elements];
    newElements[index].x = e.clientX - 100;
    newElements[index].y = e.clientY - 40;
    setElements(newElements);
    saveElements(newElements);
  };

  // Styles
  const sidebarStyle = {
    width: '250px',
    padding: '32px 20px',
    borderRight: 'none',
    background: 'linear-gradient(135deg, #dbeafe 0%, #f8fafc 100%)',
    boxShadow: '4px 0 18px 0 rgba(52,90,182,0.07)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '28px',
    fontFamily: '"Montserrat", sans-serif',
  };

  const buttonStyle = {
    padding: '16px 28px',
    background: 'linear-gradient(90deg, #5560f6 0%, #3ebee8 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '1.07rem',
    letterSpacing: '0.03em',
    boxShadow: '0 1px 14px 0 rgba(60,110,244,0.12)',
    transition: 'background 0.3s, transform 0.1s',
  };

  const canvasStyle = {
    flex: 1,
    position: 'relative',
    background: 'linear-gradient(135deg, #e9e9ff 0%, #cadcff 80%)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Montserrat", sans-serif',
  };

  const quoteStyle = (x, y) => ({
    position: 'absolute',
    left: x,
    top: y,
    cursor: 'move',
    maxWidth: '250px',
    minWidth: '110px',
    minHeight: '50px',
    padding: '28px 22px 20px 22px',
    color: '#22223b',
    background: 'rgba(255,255,255,0.95)',
    border: 'none',
    borderRadius: '19px',
    boxShadow: '0 6px 32px 0 rgba(46,68,128,0.18)',
    fontSize: '1.08rem',
    fontWeight: 500,
    letterSpacing: '0.01em',
    wordWrap: 'break-word',
    lineHeight: 1.5,
    transition: "box-shadow 0.2s, transform 0.14s",
    userSelect: 'none',
  });

  const imageStyle = (x, y) => ({
    position: 'absolute',
    left: x,
    top: y,
    width: '160px',
    maxHeight: '210px',
    objectFit: 'cover',
    cursor: 'move',
    borderRadius: '15px',
    boxShadow: '0 7px 23px 0 rgba(43,80,176,0.15)',
    border: "2.5px solid #e9e7fa",
    transition: 'transform 0.24s, box-shadow 0.22s',
    background: "#f6f9ff",
  });

  const formOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(60,94,220,0.07)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const formStyle = {
    background: 'linear-gradient(135deg, #fff 80%, #e7f1ff 100%)',
    padding: '35px 32px 28px 32px',
    borderRadius: '19px',
    minWidth: '320px',
    boxShadow: '0 10px 48px 0 rgba(80,128,240,0.17)',
    fontFamily: '"Montserrat", sans-serif'
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#282828', fontFamily: '"Montserrat", sans-serif', background: 'linear-gradient(90deg, #e9f1fa 0%, #f8f7fc 100%)' }}>
      <div style={sidebarStyle}>
        <h2 style={{ fontWeight: 700, color: "#3b4fcb", marginBottom: '18px', letterSpacing: '.06em', fontSize: '1.45rem' }}>Dashboard</h2>
        <button
          style={buttonStyle}
          onMouseDown={e => e.target.style.transform = 'scale(0.96)'}
          onMouseUp={e => e.target.style.transform = 'scale(1)'}
          onClick={() => openForm("quote")}
        >Add Quote</button>
        <button
          style={{ ...buttonStyle, background: "linear-gradient(90deg, #ee5773 0%, #ffad66 100%)" }}
          onMouseDown={e => e.target.style.transform = 'scale(0.96)'}
          onMouseUp={e => e.target.style.transform = 'scale(1)'}
          onClick={() => openForm("image")}
        >Add Image</button>
        <div style={{
          marginTop: 'auto',
          fontSize: '0.97rem',
          color: '#637085',
          textAlign: 'center',
        }}>
          <span style={{ opacity: 0.75 }}>Drag and move cards freely 🎨</span>
        </div>
      </div>
      <div style={canvasStyle}>
        {elements.length === 0 &&
          <div style={{ textAlign: 'center', color: '#8e8ea2', fontSize: '1.13rem', fontWeight: 500 }}>
            Welcome! Add some quotes or images using the sidebar 💡
          </div>
        }
        {elements.map((el, index) =>
          el.type === 'quote' ? (
            <div
              key={index}
              style={quoteStyle(el.x, el.y)}
              onMouseDown={e => {
                e.preventDefault();
                e.currentTarget.style.boxShadow = '0 7px 32px 0 rgba(46,68,128,0.33)';
                e.currentTarget.style.transform = 'scale(1.03)';
                const onMouseMove = eMove => handleDrag(eMove, index);
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', () => {
                  window.removeEventListener('mousemove', onMouseMove);
                  e.currentTarget.style.boxShadow = quoteStyle(el.x, el.y).boxShadow;
                  e.currentTarget.style.transform = 'scale(1)';
                }, { once: true });
              }}
            >
              <span style={{ fontStyle: "italic", color: "#4559cc" }}>“</span>
              {el.content}
            </div>
          ) : (
            <img
              key={index}
              src={el.src}
              alt=""
              style={imageStyle(el.x, el.y)}
              onMouseDown={e => {
                e.preventDefault();
                e.target.style.boxShadow = "0 13px 44px 0 rgba(43,60,156,0.23)";
                e.target.style.transform = 'scale(1.08)';
                const onMouseMove = eMove => handleDrag(eMove, index);
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', () => {
                  window.removeEventListener('mousemove', onMouseMove);
                  e.target.style.boxShadow = imageStyle(el.x, el.y).boxShadow;
                  e.target.style.transform = 'scale(1)';
                }, { once: true });
              }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            />
          )
        )}
      </div>
      {showForm && (
        <div style={formOverlayStyle} onClick={() => setShowForm(false)}>
          <form style={formStyle} onClick={e => e.stopPropagation()} onSubmit={handleFormSubmit}>
            <h3 style={{ color: '#504fcc', fontWeight: 700, marginBottom: '18px', fontSize: '1.15rem' }}>
              {formType === 'quote' ? 'Add Quote' : 'Add Image URL'}
            </h3>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={formType === 'quote' ? 'Enter quote...' : 'Enter image URL...'}
              style={{
                width: '100%',
                padding: '13px 11px',
                marginBottom: '24px',
                fontSize: '1rem',
                borderRadius: '9px',
                border: '1.5px solid #eaeaef',
                background: '#f8f8fd',
                color: '#42517d'
              }}
            />
            <button
              type="submit"
              style={{
                ...buttonStyle,
                width: '100%',
                boxShadow: 'none',
                background: 'linear-gradient(90deg, #5560f6 0%, #3ebee8 100%)'
              }}
            >Add</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;