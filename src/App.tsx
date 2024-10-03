import React from 'react';
import './App.css';
import PopButton from './components/PopButton';
import html2canvas from 'html2canvas';

function App() {
  // Function to take a screenshot of the poster
  const capturePoster = () => {
    const poster = document.querySelector('.poster'); // Select the poster element
    if (poster) {
      html2canvas(poster).then((canvas) => {
        const link = document.createElement('a'); // Create a link element
        link.href = canvas.toDataURL('image/png'); // Set the link to the canvas image data
        link.download = 'poster.png'; // Set the download filename
        link.click(); // Simulate a click to download the image
      });
    }
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
          <div className="poster"></div>
        </div>
        <div className="options">
          <button onClick={capturePoster} className="screenshot-button">Take Screenshot</button>
        </div>
      </div>
    </div>
  );
}

export default App;
