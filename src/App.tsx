import React from 'react';
import './App.css';

function App() {
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
            <span id="about">about</span>
            <span id="share">share</span>
          </div>
        </div>
        <div className="poster">
        </div>
        <div className="options">

        </div>

      </div>


    </div>
  );
}

export default App;
