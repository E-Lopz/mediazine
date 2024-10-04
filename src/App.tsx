import React, { useRef, useState } from 'react';
import './App.css';
import PopButton from './components/PopButton';
import html2canvas from 'html2canvas';
import ImgUploader from './components/ImgUploader';

function App() {
  const posterRef = useRef<HTMLDivElement>(null); // Create a ref for the poster
  const [posterImg, setPosterImg] = useState<string>(''); // State to hold the uploaded image URL

  const handleScreenshot = () => {
    if (posterRef.current) { // Check if the ref is not null
      html2canvas(posterRef.current).then((canvas) => {
        // Handle the canvas here (e.g., convert to image or download)
        const link = document.createElement('a');
        link.href = canvas.toDataURL(); // Convert canvas to data URL
        link.download = 'poster.png'; // Set the download file name
        link.click(); // Trigger the download
      });
    }
  };

  // Callback function to update the poster image
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
          <div 
            className="poster" 
            ref={posterRef} 
            style={{ backgroundImage: `url(${posterImg || '/src/assets/poster.png'})`, backgroundSize: 'cover' }}
          >
          </div>
          <button className="screenshot-button" onClick={handleScreenshot}>Take Screenshot</button> {/* Button to take screenshot */}
          <ImgUploader onImageUpload={updatePosterImage} /> {/* Pass the callback to ImgUploader */}
        </div>
      </div>
    </div>
  );
}

export default App;
