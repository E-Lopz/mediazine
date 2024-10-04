import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import PopButton from './components/PopButton';
import html2canvas from 'html2canvas';
import ImgUploader from './components/ImgUploader';
import { Canvas } from 'fabric'; // Import the Canvas class directly
import defaultImg from './assets/poster.png'; // Import the default image

function App() {
  const posterRef = useRef<HTMLCanvasElement>(null);
  const [posterImg, setPosterImg] = useState<string>(defaultImg);
  const [canvas, setCanvas] = useState<Canvas | undefined>(); // Keep the type as Canvas

  useEffect(() => {
    if (posterRef.current) {
      const initCanvas = new Canvas(posterRef.current, {
        width: 500,
        height: 500,
      });

      initCanvas.renderAll();
      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);



  const handleScreenshot = () => {
    if (posterRef.current) {
      html2canvas(posterRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'poster.png';
        link.click();
      });
    }
  };

  const updatePosterImage = (imageUrl: string) => {
    setPosterImg(imageUrl);
  };

  return (
    <div className="App">
      <div className="big-frame">
        <div className="text">
          <div className="title">
            <p id="mediazine">Mediazine</p>
            <p id="author">By <a target="_blank" href="https://e-Lopz.github.io" rel="noreferrer">Emiliano</a></p>
          </div>
          <div className="katatext">
            <p className="katazine">メディアズィネ</p>
            <p className="katazine" id="katauthor">エミリアノ</p>
          </div>
          <div className="info">
            <PopButton 
              buttonText="About"
              popupContent={
                <div>
                  <h3>About</h3>
                  <p>Small project to experiment with cool designs, image editing, and maybe a desperate attempt to generate a visual identity.</p>
                </div>
              } 
              shape={'square'}
            />
            <PopButton 
              buttonText="Share"
              popupContent={<div><h3>Don't gatekeep!</h3><p>More detailed popup content here.</p></div>} 
              shape={'circle'}
            />
          </div>
        </div>
        <div className="poster-container">
          <canvas className="poster" ref={posterRef} style={{ backgroundImage: `url(${posterImg})`, backgroundSize: 'cover' }} />
          <button className="screenshot-button" onClick={handleScreenshot}>Take Screenshot</button>
          <ImgUploader onImageUpload={updatePosterImage} />
        </div>
      </div>
    </div>
  );
}

export default App;
