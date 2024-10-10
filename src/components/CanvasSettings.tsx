import React, { useState, useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import defaultImg from './assets/poster.png'; // Import the default image


interface CanvasProps {
  canvas: fabric.Canvas; // Explicitly type the canvas prop
  backgroundImageRef: React.RefObject<fabric.Image | null>;
}

const CanvasSettings: React.FC<CanvasProps> = ({ canvas, backgroundImageRef }) => {
  const [canvasHeight, setCanvasHeight] = useState<number>(550);
  const [canvasWidth, setCanvasWidth] = useState<number>(550);
  const maxWidth = window.innerWidth * 0.5; // 50% of viewport width
  const maxHeight = window.innerHeight * 0.8; // 80% of viewport height

  // Function to set the background image
  const setBackgroundImage = (imgSrc: string) => {
    const img = new Image();
    img.onload = () => {
      const fabricImage = new fabric.Image(img);

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
      canvas.renderAll();
    };
    img.src = imgSrc; // Start loading the image
  };

  useEffect(() => {
    if (canvas) {
      canvas.setWidth(canvasWidth);
      canvas.setHeight(canvasHeight);
    }
  }, [canvasHeight, canvasWidth, canvas]);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const intVal = parseInt(value, 10);
    if (intVal >= 0 && intVal <= maxWidth) { // Check against max width
      setCanvasWidth(intVal);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const intVal = parseInt(value, 10);
    if (intVal >= 0 && intVal <= maxHeight) { // Check against max height
      setCanvasHeight(intVal);
    }
  };

  const setAspectRatio = (ratio: [number, number]) => {
    const [widthRatio, heightRatio] = ratio;
    const newWidth = (canvasHeight * widthRatio) / heightRatio;
    if (newWidth <= maxWidth) { // Ensure the new width does not exceed max width
      setCanvasWidth(newWidth);
      setCanvasHeight(Math.min(canvasHeight, maxHeight)); // Ensure height does not exceed max height
    } else {
      setCanvasWidth(maxWidth);
      setCanvasHeight((maxWidth * heightRatio) / widthRatio); // Adjust height based on max width
      if (canvasHeight > maxHeight) {
        setCanvasHeight(maxHeight); // If height exceeds max height, set it to max height
      }
    }
  };

  const handleResize = () => {
    // Calculate aspect ratio based on window size
    const windowHeight = window.innerHeight * 0.8; // Use 80% of window height
    const windowWidth = window.innerWidth * 0.8; // Use 80% of window width

    // Adjust for 2:3 ratio
    const newWidth2_3 = windowHeight * (2 / 3);
    const newWidth4_3 = windowHeight * (4 / 3);

    if (newWidth2_3 <= maxWidth) {
      setCanvasWidth(newWidth2_3);
      setCanvasHeight(Math.min(windowHeight, maxHeight)); // Ensure height does not exceed max height
    } else if (newWidth4_3 <= maxWidth) {
      setCanvasWidth(newWidth4_3);
      setCanvasHeight(Math.min(windowHeight, maxHeight)); // Ensure height does not exceed max height
    } else {
      setCanvasWidth(maxWidth);
      setCanvasHeight(Math.min((maxWidth * 3) / 4, maxHeight)); // Use 4:3 ratio if max width is hit and ensure height does not exceed max height
    }

    // Resize the background image to fit the new canvas size
    if (backgroundImageRef.current) {
      console.log('test')
      const scaleFactor = Math.max(canvasWidth / backgroundImageRef.current.width!, canvasHeight / backgroundImageRef.current.height!);
      backgroundImageRef.current.scale(scaleFactor);
      backgroundImageRef.current.set({
        left: 0,
        top: 0,
      });

      // Re-render the canvas
      canvas.renderAll();
    }
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    // Call handleResize on mount to set initial size
    handleResize();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <h3>Canvas Settings</h3>
      <div>
        <label>
          Width:
          <input type="number" value={canvasWidth} onChange={handleWidthChange} />
        </label>
      </div>
      <div>
        <label>
          Height:
          <input type="number" value={canvasHeight} onChange={handleHeightChange} />
        </label>
      </div>
      <button onClick={() => setAspectRatio([2, 3])}>2:3 Ratio</button>
      <button onClick={() => setAspectRatio([4, 3])}>4:3 Ratio</button>
      <button onClick={handleResize}>Custom Resize</button>
    </div>
  );
};

export default CanvasSettings;
