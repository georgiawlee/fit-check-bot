import React, { useState, useRef, useEffect } from 'react';
import '../styles/main-styles.css'; // Main stylesheet that imports all CSS in the proper cascade order
import Win98Window from './Win98Window';
import FolderIcon from '../assets/icons/My Documents.svg';
import ComputerIcon from '../assets/icons/My Computer.svg';
import InfoIcon from '../assets/icons/Information.svg';
import InternetIcon from '../assets/icons/Internet Explorer.svg';
import WarningIcon from '../assets/icons/Warning.svg';
import EmptyBinIcon from '../assets/icons/Bin/Empty.svg';
import RadioSelected from '../assets/Radio Box/Selected.svg';
import RadioUnselected from '../assets/Radio Box/Unselected.svg';

const compliments = [
  'You didn\'t dress, you curated.',
  'Main character energy. Everyone else? NPCs.',
  'This outfit passed the vibe check, credit check, and background check.',
  'Serving looks hotter than my GPU.',
  'Anna Wintour just fainted.',
  'Looks expensive. Manifesting your tax bracket.',
  'You ate and left no fashion crumbs.',
  'Walking Pinterest board.',
  'This slays harder than my imposter syndrome.',
  'A look so good it should come with a tutorial.',
  'This look deserves a soft launch.',
  'Your outfit filed my taxes and fixed my posture.',
  'Street style icon. Pavement quaking.',
  'Fit so clean it exfoliated my screen.',
  'Landed on Earth just to give us this look.',
  'Are you a CSS file? Because everything\'s styled just right.'
];

const roasts = [
  'Y2K revival or just lost in time?',
  'Styled by a Tumblr algorithm from 2011.',
  'Looking like the main character in a cautionary tale.',
  'Giving… choices were made.',
  'Is this your villain origin story?',
  'Screaming, crying, throwing out this outfit.',
  'This outfit took inspiration… and ran in the wrong direction.',
  'Your outfit needs a software update.',
  'This look screams "my mom picked it out."',
  'This fit has too many fonts.',
  'This outfit belongs in my Notes app apology.',
  'Giving less \'runway\' and more \'run away.\'',
  'This look is one more accessory away from a lawsuit.',
  'Your outfit is the reason Mercury is in retrograde.',
  'This outfit could use a Notes app apology.',
  'It\'s giving \'I paid for Twitter Blue.',
  'You dress like you say \'I\'m an empath\' but make it everyone\'s problem.',
  'You dress like you list \'vibes curator\' in your LinkedIn bio.'
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function App() {
  const [image, setImage] = useState(null);
  const [tone, setTone] = useState('compliment');
  const [message, setMessage] = useState('');
  const [imgDims, setImgDims] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('Ready.');
  const [showProgress, setShowProgress] = useState(false);
  const canvasRef = useRef(null);

  // Window state management
  const [previewPosition, setPreviewPosition] = useState({ x: '5%', y: '5%', zIndex: 3 });
  const [controlsPosition, setControlsPosition] = useState({ x: '55%', y: '15%', zIndex: 2 });
  const [messagePosition, setMessagePosition] = useState({ x: '35%', y: '40%', zIndex: 1 });
  const [previewMinimized, setPreviewMinimized] = useState(false);
  const [controlsMinimized, setControlsMinimized] = useState(false);
  const [messageMinimized, setMessageMinimized] = useState(false);
  const [previewMaximized, setPreviewMaximized] = useState(false);
  const [controlsMaximized, setControlsMaximized] = useState(false);
  const [messageMaximized, setMessageMaximized] = useState(false);

  // For drag functionality
  const [draggedWindow, setDraggedWindow] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Preview window size (now without frame SVG)
  const PREVIEW_WIDTH = 350; // px, fits .heybestie-canvas-wrapper max-width
  const PREVIEW_HEIGHT = 450; // px, adjusted for no frame

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setStatusText('Loading image...');
      setShowProgress(true);
      document.body.classList.add('is-loading');
      
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new window.Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          const aspect = width / height;
          let maxW = PREVIEW_WIDTH - 32; // padding from SVG edge
          let maxH = PREVIEW_HEIGHT - 32;
          if (width > maxW) {
            width = maxW;
            height = width / aspect;
          }
          if (height > maxH) {
            height = maxH;
            width = height * aspect;
          }
          setImgDims({ width: Math.round(width), height: Math.round(height) });
          setImage(ev.target.result);
          setLoading(false);
          setStatusText(`Image loaded: ${file.name}`);
          setShowProgress(false);
          document.body.classList.remove('is-loading');
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    setLoading(true);
    setStatusText('Analyzing your fit...');
    setShowProgress(true);
    document.body.classList.add('is-loading');
    
    // Simulate AI processing with a delay for the Windows 98 experience
    setTimeout(() => {
      let msg = '';
      if (tone === 'compliment') msg = getRandom(compliments);
      else if (tone === 'roast') msg = getRandom(roasts);
      else msg = Math.random() < 0.5 ? getRandom(compliments) : getRandom(roasts);
      
      setMessage(msg);
      drawOnCanvas(msg);
      setLoading(false);
      setStatusText('Fit check complete!');
      setShowProgress(false);
      document.body.classList.remove('is-loading');
    }, 1500);
  };

  const drawOnCanvas = (msg) => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext('2d');
    const img = new window.Image();
    img.onload = () => {
      canvas.width = imgDims.width;
      canvas.height = imgDims.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // Add sparkle emojis
      const sparkleMsg = `✨ ${msg} ✨`;
      // Multi-line wrapping logic
      const maxWidth = Math.min(canvas.width * 0.92, canvas.width - 16);
      const maxHeight = canvas.height * 0.32; // up to 32% of image height for text
      let fontSize = Math.floor(canvas.height / 7);
      let lines = [];
      ctx.font = `bold ${fontSize}px sans-serif`;
      // Helper: wrap text into lines
      function wrapText(text, font, maxWidth) {
        ctx.font = font;
        const words = text.split(' ');
        let lines = [];
        let line = '';
        for (let i = 0; i < words.length; i++) {
          const testLine = line ? line + ' ' + words[i] : words[i];
          const { width } = ctx.measureText(testLine);
          if (width > maxWidth && line) {
            lines.push(line);
            line = words[i];
          } else {
            line = testLine;
          }
        }
        if (line) lines.push(line);
        return lines;
      }
      // Shrink font size until all lines fit vertically
      while (fontSize > 16) {
        ctx.font = `bold ${fontSize}px sans-serif`;
        lines = wrapText(sparkleMsg, ctx.font, maxWidth);
        const totalHeight = lines.length * fontSize * 1.15;
        if (totalHeight <= maxHeight) break;
        fontSize -= 2;
      }
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Calculate starting y to vertically center the block
      const totalTextHeight = lines.length * fontSize * 1.15;
      let y = canvas.height - totalTextHeight / 2 - fontSize * 0.2;
      if (y + totalTextHeight > canvas.height - 8) y = canvas.height - totalTextHeight - 8;
      if (y < fontSize + 8) y = fontSize + 8;
      // Draw each line with all effects
      lines.forEach((line, i) => {
        const lineY = y + i * fontSize * 1.15 + fontSize / 2;
        // White border
        ctx.save();
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 8;
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 12;
        ctx.strokeText(line, canvas.width / 2, lineY);
        ctx.restore();
        // Pink glow
        ctx.save();
        ctx.shadowColor = '#FF70E0';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#FF70E0';
        ctx.fillText(line, canvas.width / 2, lineY);
        ctx.restore();
        // Main text
        ctx.save();
        ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#FF70E0';
        ctx.fillText(line, canvas.width / 2, lineY);
        ctx.restore();
      });
    };
    img.src = image;
  };

  const handleDownload = () => {
    setStatusText('Saving image...');
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'fit-check.png';
    link.href = canvas.toDataURL();
    link.click();
    
    setTimeout(() => {
      setStatusText('Image saved successfully!');
    }, 500);
  };

  // Windows 98 style periodic status text updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!loading && message) {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        if (Math.random() > 0.7) {
          // Occasionally update with random "system" messages
          const systemMessages = [
            'Standing by...',
            `System time: ${timeString}`,
            'Processing content...',
            'Ready for more edits.',
            'Fit check analysis mode active.'
          ];
          setStatusText(systemMessages[Math.floor(Math.random() * systemMessages.length)]);
        }
      }
    }, 8000);
    
    return () => clearInterval(intervalId);
  }, [loading, message]);

  // Add state to track if a window is being dragged
  const [isDragging, setIsDragging] = useState(false);

  // Handle window drag functionality
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggedWindow) {
        e.preventDefault();
        
        // Set dragging state when movement begins
        if (!isDragging) {
          setIsDragging(true);
        }
        
        // Calculate new position based on mouse movement
        const x = e.clientX - dragOffset.x;
        const y = e.clientY - dragOffset.y;
        
        // Apply constraint: don't let window go off screen
        const maxX = window.innerWidth - 100; // at least 100px must remain visible
        const maxY = window.innerHeight - 30; // at least 30px (title bar) must remain visible
        const constrainedX = Math.max(0, Math.min(x, maxX));
        const constrainedY = Math.max(0, Math.min(y, maxY));
        
        // Update position state for the dragged window
        if (draggedWindow === 'preview') {
          setPreviewPosition(prev => ({ ...prev, x: constrainedX + 'px', y: constrainedY + 'px' }));
        } else if (draggedWindow === 'controls') {
          setControlsPosition(prev => ({ ...prev, x: constrainedX + 'px', y: constrainedY + 'px' }));
        } else if (draggedWindow === 'message') {
          setMessagePosition(prev => ({ ...prev, x: constrainedX + 'px', y: constrainedY + 'px' }));
        }
      }
    };
    
    const handleMouseUp = () => {
      setDraggedWindow(null);
      // End dragging animation on mouse up
      setIsDragging(false);
    };
    
    if (draggedWindow) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedWindow, dragOffset, isDragging]);

  // Window management functions
  const handleMouseDown = (e, windowType) => {
    // Always bring clicked window to front
    if (windowType === 'preview') {
      setPreviewPosition(prev => ({ ...prev, zIndex: 3 }));
      setControlsPosition(prev => ({ ...prev, zIndex: 2 }));
      setMessagePosition(prev => ({ ...prev, zIndex: 1 }));
    } else if (windowType === 'controls') {
      setPreviewPosition(prev => ({ ...prev, zIndex: 1 }));
      setControlsPosition(prev => ({ ...prev, zIndex: 3 }));
      setMessagePosition(prev => ({ ...prev, zIndex: 2 }));
    } else if (windowType === 'message') {
      setPreviewPosition(prev => ({ ...prev, zIndex: 1 }));
      setControlsPosition(prev => ({ ...prev, zIndex: 2 }));
      setMessagePosition(prev => ({ ...prev, zIndex: 3 }));
    }
    
    // Only start drag if clicking on titlebar and window is not maximized
    if ((windowType === 'preview' && !previewMaximized) || 
        (windowType === 'controls' && !controlsMaximized) || 
        (windowType === 'message' && !messageMaximized)) {
      if (e.target.closest('.win98-titlebar')) {
        setDraggedWindow(windowType);
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  const handleMinimize = (windowType) => {
    if (windowType === 'preview') {
      setPreviewMinimized(prev => !prev);
    } else if (windowType === 'controls') {
      setControlsMinimized(prev => !prev);
    } else if (windowType === 'message') {
      setMessageMinimized(prev => !prev);
    }
  };

  const handleMaximize = (windowType) => {
    if (windowType === 'preview') {
      setPreviewMaximized(prev => !prev);
    } else if (windowType === 'controls') {
      setControlsMaximized(prev => !prev);
    } else if (windowType === 'message') {
      setMessageMaximized(prev => !prev);
    }
  };

  // Calculate styles for windows based on their state
  const getPreviewWindowStyle = () => {
    let style = {
      left: previewPosition.x,
      top: previewPosition.y,
      zIndex: previewPosition.zIndex,
      width: previewMaximized ? '100%' : '400px',
      height: previewMaximized ? 'calc(100% - 18px)' : '480px',
      display: previewMinimized ? 'none' : 'flex'
    };
    
    return style;
  };

  const getControlsWindowStyle = () => {
    let style = {
      left: controlsPosition.x,
      top: controlsPosition.y,
      zIndex: controlsPosition.zIndex,
      width: controlsMaximized ? '100%' : '350px',
      height: controlsMaximized ? 'calc(100% - 18px)' : 'auto',
      display: controlsMinimized ? 'none' : 'flex',
      position: 'absolute', // Ensure absolute positioning
      visibility: 'visible' // Force visibility
    };
    
    // Add a test border for debugging
    if (process.env.NODE_ENV === 'development') {
      style.border = '2px solid transparent';
    }
    
    return style;
  };
  
  const getMessageWindowStyle = () => {
    let style = {
      left: messagePosition.x,
      top: messagePosition.y,
      zIndex: messagePosition.zIndex,
      width: messageMaximized ? '100%' : '380px',
      height: messageMaximized ? 'calc(100% - 18px)' : '180px',
      display: messageMinimized || !message ? 'none' : 'flex'
    };
    
    return style;
  };

  // Handle window resizing for responsive layout
  useEffect(() => {
    const handleResize = () => {
      const container = document.querySelector('.heybestie-container');
      if (container) {
        // Calculate available space
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Set dynamic scaling variable for the canvas
        document.documentElement.style.setProperty(
          '--canvas-scale', 
          Math.min(
            1, 
            Math.min(
              (containerWidth - 100) / PREVIEW_WIDTH,
              (containerHeight - 180) / PREVIEW_HEIGHT
            )
          )
        );
      }
    };

    // Initial call
    handleResize();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [PREVIEW_WIDTH, PREVIEW_HEIGHT]);

  // Display current time in Windows 98 status bar
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    
    // Initial call
    updateTime();
    
    // Update every minute
    const intervalId = setInterval(updateTime, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Special effect to ensure controls window is visible
  useEffect(() => {
    // Make sure controls window is visible after initial render
    const ensureControlsVisible = () => {
      // Force controls window to be visible by recalculating position
      setControlsPosition(prev => ({
        ...prev,
        x: prev.x,
        y: prev.y,
        zIndex: Math.max(prev.zIndex, 1) // Ensure zIndex is at least 1
      }));
    };
    
    // Run after mounting and again after a short delay
    ensureControlsVisible();
    const timeoutId = setTimeout(ensureControlsVisible, 500);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Update layout when image dimensions change
  useEffect(() => {
    // Trigger resize handler when image dimensions change
    if (imgDims.width > 0 && imgDims.height > 0) {
      // Allow time for the DOM to update
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  }, [imgDims]);

  return (
    <div className="fit-check-bg">
      <Win98Window
        title="Fit Analysis Result"
        icon={tone === 'compliment' ? InfoIcon : (tone === 'roast' ? WarningIcon : EmptyBinIcon)}
        className={`heybestie-message-window ${isDragging && draggedWindow === 'message' ? 'dragging' : ''}`}
        style={getMessageWindowStyle()}
        onMinimize={() => handleMinimize('message')}
        onMaximize={() => handleMaximize('message')}
        onClose={() => {}}
        onMouseDown={(e) => handleMouseDown(e, 'message')}
        inactive={messagePosition.zIndex !== 3}
      >
        <div className="heybestie-message-container">
          {message && (
            <div className="heybestie-message-content">
              <span className="message-decorative-prefix">✨ </span>
              {message}
              <span className="message-decorative-suffix"> ✨</span>
            </div>
          )}
        </div>

        <div className="win98-status-bar">
          <div className="win98-status-item">
            <img src={tone === 'compliment' ? InfoIcon : (tone === 'roast' ? WarningIcon : EmptyBinIcon)} alt="Mode Icon" />
            <span>{tone === 'compliment' ? 'Compliment Mode' : (tone === 'roast' ? 'Roast Mode' : 'Surprise Mode')}</span>
          </div>
          <div className="win98-status-time">{currentTime}</div>
        </div>
      </Win98Window>

      {/* Preview Window */}
      <Win98Window
        title="Fit Check Preview"
        icon={ComputerIcon}
        className={`heybestie-preview-window ${isDragging && draggedWindow === 'preview' ? 'dragging' : ''}`}
        style={getPreviewWindowStyle()}
        onMinimize={() => handleMinimize('preview')}
        onMaximize={() => handleMaximize('preview')}
        onClose={() => {}}
        onMouseDown={(e) => handleMouseDown(e, 'preview')}
        inactive={previewPosition.zIndex !== 3}
      >
        <div className="heybestie-preview-container">              {image ? (
            <div className="canvas-preview-bg-wrapper" style={{
              width: '100%',
              maxWidth: PREVIEW_WIDTH + 'px',
              height: 'auto', 
              maxHeight: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0.2rem 0',
              padding: '16px',
              border: '1px solid var(--win98-gray-darker)',
              background: 'white',
              boxShadow: 'inset 1px 1px var(--inset-frame-inner-1), inset -1px -1px var(--inset-frame-inner-4)'
            }}>
              <div
                className="canvas-wrapper heybestie-canvas-wrapper"
                style={{
                  position: 'relative',
                  background: 'none',
                  width: imgDims.width + 'px',
                  height: imgDims.height + 'px',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  margin: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <canvas
                  ref={canvasRef}
                  className="fit-canvas heybestie-canvas"
                  style={{
                    width: imgDims.width + 'px',
                    height: imgDims.height + 'px',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="empty-canvas-placeholder">
              <div className="win98-info">
                <img src={InfoIcon} alt="Information" />
                <span>Choose an image to start your fit check!</span>
              </div>
            </div>
          )}
        </div>

        <div className="win98-status-bar">
          <div className="win98-status-item">
            {loading ? (
              <img src={InternetIcon} alt="Processing" />
            ) : (
              <img src={ComputerIcon} alt="Ready" />
            )}
            <span>{statusText}</span>
          </div>
          <div className="win98-status-time">{currentTime}</div>
        </div>
        
        {showProgress && (
          <div className="win98-progress-wrapper fixed-bottom">
            <div className="win98-progress-container compact inset">
              <div className="win98-progress-bar"></div>
            </div>
          </div>
        )}
      </Win98Window>

      {/* Controls Window */}
      <Win98Window
        title="Fit Check Controls"
        icon={FolderIcon}
        className={`heybestie-controls-window ${isDragging && draggedWindow === 'controls' ? 'dragging' : ''}`}
        style={getControlsWindowStyle()}
        onMinimize={() => handleMinimize('controls')}
        onMaximize={() => handleMaximize('controls')}
        onClose={() => {}}
        onMouseDown={(e) => handleMouseDown(e, 'controls')}
        inactive={controlsPosition.zIndex !== 3}
      >
        <div className="heybestie-controls-container">
          {/* Windows 98 styled file input */}
          <div className="win98-file-input">
            <label 
              htmlFor="file-upload" 
              className="custom-file-label win98-button-classic pink-theme"
            >
              <span className="win98-focus-animation"></span>
              <img src={FolderIcon} alt="Folder" className="input-icon" />
              Choose Image
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="heybestie-input"
            />
          </div>

          <div className="tone-toggle win98-control-group heybestie-tone-toggle">
            <div className="win98-control-group-title">Mode</div>
            <button 
              onClick={() => setTone('compliment')} 
              className={`tone-option ${tone === 'compliment' ? 'active' : ''}`}
            >
              <span className="win98-focus-animation"></span>
              <span className="win98-radio-option">
                <img 
                  src={tone === 'compliment' ? RadioSelected : RadioUnselected} 
                  className="win98-radio-icon" 
                  alt=""
                />
                Compliment✨
              </span>
            </button>
            <button 
              onClick={() => setTone('roast')} 
              className={`tone-option ${tone === 'roast' ? 'active' : ''}`}
            >
              <span className="win98-focus-animation"></span>
              <span className="win98-radio-option">
                <img 
                  src={tone === 'roast' ? RadioSelected : RadioUnselected} 
                  className="win98-radio-icon" 
                  alt=""
                />
                Roast🔥
              </span>
            </button>
            <button 
              onClick={() => setTone('surprise')} 
              className={`tone-option ${tone === 'surprise' ? 'active' : ''}`}
            >
              <span className="win98-focus-animation"></span>
              <span className="win98-radio-option">
                <img 
                  src={tone === 'surprise' ? RadioSelected : RadioUnselected} 
                  className="win98-radio-icon" 
                  alt=""
                />
                Surprise🤫
              </span>
            </button>
          </div>
          
          {/* Message box moved to its own window */}
          
          <div className="actions heybestie-actions win98-action-bar">
            <button 
              onClick={handleGenerate} 
              disabled={!image || loading} 
              className="win98-button win98-button-classic pink-theme"
              style={{
                fontWeight: 'bold'
              }}
            >
              <span className="win98-focus-animation"></span>
              Generate
            </button>
            <button 
              onClick={handleDownload} 
              disabled={!message || loading} 
              className="win98-button win98-button-classic pink-theme"
              style={{
                fontWeight: 'bold'
              }}
            >
              <span className="win98-focus-animation"></span>
              Download
            </button>
          </div>
        </div>
        
        <div className="win98-status-bar">
          <div className="win98-status-item">
            <img src={tone === 'compliment' ? InfoIcon : (tone === 'roast' ? WarningIcon : EmptyBinIcon)} alt="Mode" />
            <span>{tone === 'compliment' ? 'Compliment Mode' : (tone === 'roast' ? 'Roast Mode' : 'Random Mode')}</span>
          </div>
          <div className="win98-status-time">{currentTime}</div>
        </div>
      </Win98Window>
    </div>
  );
}

export default App;
