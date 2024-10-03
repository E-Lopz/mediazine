import React, { useState, ReactNode } from 'react';
import './PopButton.css';

interface PopButtonProps {
  buttonText: string;  // Text for the button
  popupContent: ReactNode;  // Content to be shown inside the popup
  shape: 'square' | 'circle';  // Shape of the popup
}

const PopButton: React.FC<PopButtonProps> = ({ buttonText, popupContent, shape }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const togglePopup = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className='button' onClick={togglePopup}>{buttonText}</button>
      {isOpen && (
        <div className="overlay">
          <div className={`popup ${shape}`}>
            <button className="close-button" onClick={togglePopup}>✖</button> {/* Close button with X */}
            {popupContent}  {/* Render dynamic content */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopButton;
