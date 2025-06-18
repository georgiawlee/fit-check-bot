import React from 'react';
import '../styles/main-styles.css'; // Import consolidated styles

/**
 * Simple CSS Test Component
 * Shows basic Windows 98 styled elements to verify CSS standardization
 */
const BasicCssTest = () => {
  return (
    <div className="test-container" style={{padding: "20px", maxWidth: "800px", margin: "0 auto"}}>
      <h1>Windows 98 Style CSS Test</h1>
      
      <div className="test-section" style={{marginBottom: "30px"}}>
        <h2 className="win98-text-bold">Button Tests</h2>
        <div style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>
          <button className="win98-button-classic">Standard Button</button>
          <button className="win98-button-primary">Primary Button</button>
          <button className="win98-button-secondary">Secondary Button</button>
          <button className="win98-button-classic" disabled>Disabled Button</button>
        </div>
      </div>
      
      <div className="test-section" style={{marginBottom: "30px"}}>
        <h2 className="win98-text-bold">Form Elements</h2>
        <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
          <div>
            <label className="win98-form-label">Text Input:</label>
            <input type="text" className="win98-form-input" placeholder="Enter text..." />
          </div>
          
          <div>
            <label className="win98-form-label">
              <input type="checkbox" className="win98-checkbox" />
              Checkbox Option
            </label>
          </div>
          
          <div>
            <label className="win98-form-label">Select Dropdown:</label>
            <select className="win98-form-select">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="test-section" style={{marginBottom: "30px"}}>
        <h2 className="win98-text-bold">Progress Bar</h2>
        <div className="win98-progress-wrapper" style={{position: "relative"}}>
          <div className="win98-progress">
            <div className="win98-progress-bar" style={{width: "70%"}}></div>
          </div>
        </div>
      </div>
      
      <div className="win98-message-box" style={{marginBottom: "30px"}}>
        <div className="win98-message-box-header">
          Information
        </div>
        <div className="comment-text heybestie-comment">
          This is a test message box component using the standardized CSS architecture.
        </div>
      </div>
      
      <div className="win98-status-bar">
        <div className="win98-status-item">CSS Test Complete</div>
      </div>
    </div>
  );
};

export default BasicCssTest;
