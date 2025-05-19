import { useState, useRef } from 'react';
import './App.css';
import HeyBestie from './assets/Pink Windows 98 Design System/HeyBestie.svg';
import HeyBestieCanvasPreview from './assets/Pink Windows 98 Design System/HeyBestieCanvasPreview.svg';

const compliments = [
  'Giving rich auntie in Capri. We love it',
  'Serving looks hotter than my GPU',
  'Looks expensive. Manifesting your tax bracket.',
  'You didn’t dress - you curated',
  'A look so good it should come with a tutorial',
];

const roasts = [
  'Did AI generate this look or did you?',
  'Is this your villain origin story?',
  'Screaming, crying, throwing out this outfit',
  'Y2K revival or just lost in time?',
  'Serving Silicon Valley intern on laundry day',
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function App() {
  const [image, setImage] = useState(null);
  const [tone, setTone] = useState('compliment');
  const [message, setMessage] = useState('');
  const [imgDims, setImgDims] = useState({ width: 0, height: 0 });
  const canvasRef = useRef(null);

  // SVG preview window size (from HeyBestieCanvasPreview.svg)
  const PREVIEW_WIDTH = 350; // px, fits .heybestie-canvas-wrapper max-width
  const PREVIEW_HEIGHT = 560; // px, proportional to SVG aspect ratio (686x1095)

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
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
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    let msg = '';
    if (tone === 'compliment') msg = getRandom(compliments);
    else if (tone === 'roast') msg = getRandom(roasts);
    else msg = Math.random() < 0.5 ? getRandom(compliments) : getRandom(roasts);
    setMessage(msg);
    drawOnCanvas(msg);
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
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'fit-check.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="fit-check-bg">
      <div className="heybestie-container">
        <img src={HeyBestie} alt="Fit Check Window" className="heybestie-svg-bg" />
        <div className="heybestie-content">
          {/* Replace the file input with a custom label */}
          <label htmlFor="file-upload" className="custom-file-label">Choose File</label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="heybestie-input"
          />
          <div className="tone-toggle menu-bg heybestie-tone-toggle">
            <button onClick={() => setTone('compliment')} className={tone === 'compliment' ? 'active' : ''}>Compliment ✨</button>
            <button onClick={() => setTone('roast')} className={tone === 'roast' ? 'active' : ''}>Roast 🔥</button>
            <button onClick={() => setTone('surprise')} className={tone === 'surprise' ? 'active' : ''}>Surprise Me 🤫</button>
          </div>
          {image && (
            <div
              className="canvas-preview-bg-wrapper"
              style={{
                width: PREVIEW_WIDTH + 'px',
                height: PREVIEW_HEIGHT + 'px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0.2rem 0',
              }}
            >
              <img
                src={HeyBestieCanvasPreview}
                alt="Canvas Preview Frame"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />
              <div
                className="canvas-wrapper heybestie-canvas-wrapper"
                style={{
                  position: 'relative',
                  zIndex: 2,
                  background: 'none',
                  boxShadow: 'none',
                  border: 'none',
                  width: imgDims.width + 'px',
                  height: imgDims.height + 'px',
                  maxWidth: PREVIEW_WIDTH - 32 + 'px',
                  maxHeight: PREVIEW_HEIGHT - 32 + 'px',
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
          )}
          {message && (
            <div className="comment-text heybestie-comment">{message}</div>
          )}
          <div className="actions heybestie-actions">
            <button onClick={handleGenerate} disabled={!image}>Generate Message</button>
            <button onClick={handleDownload} disabled={!message}>Download Image</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
