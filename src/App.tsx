import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import PopButton from './components/PopButton';
import html2canvas from 'html2canvas';
import ImgUploader from './components/ImgUploader';
import * as fabric from 'fabric';
import defaultImg from './assets/poster.png'; // Import the default image
import CanvasSettings from './components/CanvasSettings';
import ElementAdder from './components/ElementAdder';

function App() {
  const posterRef = useRef<HTMLCanvasElement>(null);
  const [posterImg, setPosterImg] = useState<string>(defaultImg);
  const [canvas, setCanvas] = useState<fabric.Canvas | undefined>(); // Keep the type as Canvas
  const backgroundImageRef = useRef<fabric.Image | null>(null); // Ref to store the background image


  useEffect(() => {
    if (posterRef.current) {
      const initCanvas = new fabric.Canvas(posterRef.current, {
        width: 400,
        height: 550,
      });

 
      // Preload the image before setting it as the background
      const img = new Image();
      img.src = defaultImg;
      img.onload = () => {
        const fabricImage = new fabric.Image(img);

      // Get canvas dimensions
      const canvasWidth = initCanvas.width || 400;
      const canvasHeight = initCanvas.height || 550;

      // Calculate scaling ratio using Math.max to cover the whole canvas
      const scaleFactor = Math.max(canvasWidth / fabricImage.width!, canvasHeight / fabricImage.height!);

      // Apply the scaling factor to the fabric image
      fabricImage.scale(scaleFactor);

      // Position the image to start from the top-left corner
      fabricImage.set({
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0,
      });

      // Set the scaled image as the background
      initCanvas.set("backgroundImage", fabricImage);

      backgroundImageRef.current = fabricImage;
      
      // Render the canvas after setting the background
      initCanvas.renderAll();
    };

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
  
    if (canvas) {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Allow cross-origin images to be used
      img.src = imageUrl;
  
      img.onload = () => {
        const fabricImage = new fabric.Image(img);
  
        // Get canvas dimensions
        const canvasWidth = canvas.width || 400;
        const canvasHeight = canvas.height || 550;
  
        // Calculate scaling ratio to cover the entire canvas
        const scaleFactor = Math.max(canvasWidth / fabricImage.width!, canvasHeight / fabricImage.height!);
  
        // Scale the image to cover the canvas
        fabricImage.scale(scaleFactor);
  
        // Set the image position to cover the whole canvas from top-left
        fabricImage.set({
          originX: 'left',
          originY: 'top',
          left: 0,
          top: 0,
        });
  
        // Set the background image
        canvas.set("backgroundImage", fabricImage);  
        // Render the canvas after setting the background
        backgroundImageRef.current = fabricImage;
        canvas.renderAll();
  
        console.log('Image loaded and set as background successfully');
      };
    }
  };

  return (
    <div className="App">
      <div className="big-frame">
        <div className="text">
          <div className="title">
            <p id="mediazine">Mediazine</p>
            <p id="author">
              By{' '}
              <a target="_blank" href="https://e-Lopz.github.io" rel="noreferrer">
                Emiliano
              </a>
            </p>
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
                  <p>
                    Small project to experiment with cool designs, image editing, and maybe a
                    desperate attempt to generate a visual identity.
                  </p>
                </div>
              }
              shape={'square'}
            />
            <PopButton
              buttonText="Share"
              popupContent={
                <div>
                  <h3>Don't gatekeep!</h3>
                  <p>More detailed popup content here.</p>
                </div>
              }
              shape={'circle'}
            />
          </div>
        </div>
        <div className="poster-container">
          <canvas id='canvas' className="poster" ref={posterRef} />
          <button className="screenshot-button" onClick={handleScreenshot}>
            Take Screenshot
          </button>
          <ImgUploader onImageUpload={updatePosterImage} />
        </div>
        <div className="settings">
          {canvas && <CanvasSettings canvas={canvas} backgroundImageRef={backgroundImageRef} />} {/* Render only if canvas is defined */}
          {canvas && <ElementAdder canvas={canvas} />}
        </div>
      </div>
    </div>
  );
}

export default App;

