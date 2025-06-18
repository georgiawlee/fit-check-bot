import React from 'react';

const Win98StatusProgress = ({ statusText, currentTime, statusIcon }) => {
  return (
    <div className="win98-status-bar">
      <div className="win98-status-item">
        {statusIcon && <img src={statusIcon} alt="Status" />}
        <span>{statusText || 'Ready'}</span>
      </div>
      <div className="win98-status-time">{currentTime}</div>
    </div>
  );
};

export default Win98StatusProgress;