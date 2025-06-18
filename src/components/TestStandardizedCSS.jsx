// CSS Standardization Test Page
// This file displays various components to verify styling consistency

import React, { useState } from 'react';
// No need to import styles here as they're imported in test-css-standardization.jsx
// Import components and assets we need
import Win98Window from './Win98Window';
// Use paths that definitely exist
import FolderIcon from '../assets/Window/Maximize.svg';
import InfoIcon from '../assets/Window/close.svg';

/**
 * TestStandardizedCSS - Component to test all standardized CSS styles
 * Renders various windows, buttons, form elements, and progress indicators
 * to ensure consistent styling after the CSS standardization project.
 */
const TestStandardizedCSS = () => {
  const [activeWindow, setActiveWindow] = useState('main');
  const [showProgress, setShowProgress] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  // Simulate progress bar advancing
  const startProgress = () => {
    setShowProgress(true);
    setProgressValue(0);
    
    const interval = setInterval(() => {
      setProgressValue(prev => {
        const newValue = prev + 5;
        if (newValue >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowProgress(false), 500);
          return 100;
        }
        return newValue;
      });
    }, 100);
  };

  return (
    <div className="test-container">
      <h1>CSS Standardization Test Page</h1>
      
      {/* Main Window - Tests window component styling */}
      <Win98Window
        title="CSS Standardization Test"
        icon={FolderIcon}
        className={activeWindow === 'main' ? 'active' : ''}
        onMouseDown={() => setActiveWindow('main')}
        onMinimize={() => console.log('Minimize')}
        onMaximize={() => console.log('Maximize')}
        onClose={() => console.log('Close')}
      >
        <div className="win98-window-content">
          <h2 className="win98-text-bold">Component Tests</h2>
          
          {/* Button Component Tests */}
          <div className="test-section">
            <h3 className="win98-text-bold">Button Tests</h3>
            <div className="button-test-container">
              <button className="win98-button-primary">Primary Button</button>
              <button className="win98-button-secondary">Secondary Button</button>
              <button className="win98-button-classic" disabled>Disabled Button</button>
              <button className="win98-button-classic win98-focus-animation">
                <img src={InfoIcon} alt="" className="button-icon" />
                Button with Icon
              </button>
            </div>
          </div>
          
          {/* Form Element Tests */}
          <div className="test-section">
            <h3 className="win98-text-bold">Form Element Tests</h3>
            <div className="form-test-container">
              <div className="win98-form-group">
                <label className="win98-form-label">Text Input</label>
                <input type="text" className="win98-form-input" placeholder="Enter text..." />
              </div>
              
              <div className="win98-form-group">
                <label className="win98-form-label">Select Dropdown</label>
                <select className="win98-form-select">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
              
              <div className="win98-form-group">
                <label className="win98-form-label">
                  <input type="checkbox" className="win98-checkbox" />
                  Checkbox Option
                </label>
              </div>
              
              <div className="win98-form-group">
                <div className="win98-control-group">
                  <div className="win98-control-group-title">Radio Options</div>
                  <div className="win98-radio-option">
                    <input type="radio" name="radio-test" id="radio1" className="win98-radio" checked />
                    <label htmlFor="radio1">Option 1</label>
                  </div>
                  <div className="win98-radio-option">
                    <input type="radio" name="radio-test" id="radio2" className="win98-radio" />
                    <label htmlFor="radio2">Option 2</label>
                  </div>
                </div>
              </div>
              
              <div className="win98-file-input">
                <label className="custom-file-label">
                  <span>Choose File</span>
                  <input type="file" className="heybestie-input" />
                </label>
              </div>
            </div>
          </div>
          
          {/* Progress Component Tests */}
          <div className="test-section">
            <h3 className="win98-text-bold">Progress Indicator Tests</h3>
            <button 
              className="win98-button-primary"
              onClick={startProgress}
            >
              Start Progress
            </button>
            
            {showProgress && (
              <div className="win98-progress-wrapper" style={{position: 'relative', marginTop: '10px'}}>
                <div className="win98-progress">
                  <div 
                    className="win98-progress-bar" 
                    style={{width: `${progressValue}%`}}
                  ></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Message Box Test */}
          <div className="test-section">
            <h3 className="win98-text-bold">Message Box Test</h3>
            <div className="win98-message-box">
              <div className="win98-message-box-header">
                <img src={InfoIcon} alt="" />
                Information
              </div>
              <div className="comment-text heybestie-comment">
                This is a test message box component using the standardized CSS architecture.
              </div>
            </div>
          </div>
          
          {/* Status Bar Test */}
          <div className="win98-status-bar">
            <div className="win98-status-item">Ready</div>
            <div className="win98-status-separator"></div>
            <div className="win98-status-item">Items: 4</div>
          </div>
        </div>
      </Win98Window>
      
      {/* Secondary Window - Tests inactive window styling */}
      <Win98Window
        title="Inactive Window Test"
        icon={InfoIcon}
        className={`secondary-window ${activeWindow === 'secondary' ? 'active' : ''}`}
        style={{
          width: '300px',
          height: '200px',
          top: '150px',
          left: '400px'
        }}
        onMouseDown={() => setActiveWindow('secondary')}
        onClose={() => console.log('Close')}
        inactive={activeWindow !== 'secondary'}
      >
        <div className="win98-window-content">
          <p className="win98-text">
            This is a secondary window to test inactive window styling.
            Click this window to activate it.
          </p>
        </div>
      </Win98Window>
      
      <style jsx>{`
        .test-container {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }
        
        .secondary-window {
          position: absolute;
          z-index: 5;
        }
        
        .test-section {
          margin-bottom: 20px;
          padding: 10px;
          border: 1px solid var(--theme-pink-light);
        }
        
        .button-test-container {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        
        .form-test-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
      `}</style>
    </div>
  );
};

export default TestStandardizedCSS;
