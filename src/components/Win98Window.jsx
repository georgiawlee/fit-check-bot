import React, { useRef, useEffect } from 'react';
import MinimizeIcon from '../assets/Window/Minimize.svg';
import MaximizeIcon from '../assets/Window/Maximize.svg';
import CloseIcon from '../assets/Window/close.svg';

const Win98Window = ({ 
  title, 
  icon, 
  className = '', 
  style = {}, 
  children, 
  onMinimize, 
  onMaximize, 
  onClose,
  onMouseDown,
  inactive = false
}) => {
  const windowRef = useRef(null);
  
  // Force window visibility on mount and periodically
  useEffect(() => {
    const ensureVisibility = () => {
      if (windowRef.current) {
        windowRef.current.style.display = 'flex';
        windowRef.current.style.visibility = 'visible';
        windowRef.current.style.opacity = '1';
      }
    };
    
    // Run immediately
    ensureVisibility();
    
    // Also run periodically
    const interval = setInterval(ensureVisibility, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={windowRef}
      className={`win98-window ${className} ${inactive ? 'inactive' : ''}`} 
      style={{
        ...style,
        display: 'flex',
        visibility: 'visible',
        opacity: 1
      }}
      onMouseDown={onMouseDown}
    >
      <div className={`win98-titlebar ${inactive ? 'inactive' : ''}`}>
        <div className="win98-window-title">
          {icon && <img src={icon} alt="" className="win98-title-icon" />}
          <span className="win98-title-text">{title}</span>
        </div>
        <div className="win98-window-controls">
          {onMinimize && (
            <button 
              className="win98-window-button" 
              onClick={onMinimize}
              aria-label="Minimize"
            >
              <img src={MinimizeIcon} alt="Minimize" className="button-icon" />
            </button>
          )}
          {onMaximize && (
            <button 
              className="win98-window-button" 
              onClick={onMaximize}
              aria-label="Maximize"
            >
              <img src={MaximizeIcon} alt="Maximize" className="button-icon" />
            </button>
          )}
          {onClose && (
            <button 
              className="win98-window-button" 
              onClick={onClose}
              aria-label="Close"
            >
              <img src={CloseIcon} alt="Close" className="button-icon" />
            </button>
          )}
        </div>
      </div>
      <div className="win98-window-content">
        {children}
      </div>
    </div>
  );
};

export default Win98Window;