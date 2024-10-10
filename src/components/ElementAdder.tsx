import React, { useState, useEffect } from 'react';
import * as fabric from 'fabric';

interface CanvasProps {
  canvas: fabric.Canvas; // Explicitly type the canvas prop
}

const ElementAdder: React.FC<CanvasProps> = ({ canvas }) => {
  const [textInput, setTextInput] = useState<string>('');
  const [circleColor, setCircleColor] = useState<string>('black');
  const [rectangleColor, setRectangleColor] = useState<string>('black');
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [fontFamily, setFontFamily] = useState<string>('Arial');

  useEffect(() => {
    // Update the selected object and its color when the selection changes
    const handleObjectSelected = (e: fabric.Object) => {
      if (!e) return;
  
      const obj = e as fabric.Object;
      setSelectedObject(obj);
  
      // Update color previews based on the type of selected object
      if (obj.type === 'circle') {
        setCircleColor(obj.fill as string);
        setRectangleColor('black'); // Reset rectangle color or keep it the same
      } else if (obj.type === 'rect') {
        setRectangleColor(obj.fill as string);
        setCircleColor('black'); // Reset circle color or keep it the same
      } else if (obj.type === 'textbox') {
        // Optionally handle textbox color preview if needed
        setCircleColor('black'); 
        setRectangleColor('black');
      }
    };
  
    // Update the selected object when an object is deselected
    const handleObjectDeselected = () => {
      setSelectedObject(null);
      setCircleColor('black'); // Reset to default or keep previous values
      setRectangleColor('black'); // Reset to default or keep previous values
    };
  
    // Attach event listeners
    canvas.on('selection:created', (event) => {
      handleObjectSelected(event.selected[0]);
    });
  
    canvas.on('selection:updated', (event) => {
      handleObjectSelected(event.selected[0]);
    });
    
    canvas.on('selection:cleared', handleObjectDeselected);
  
    // Handle keydown events for deleting selected objects
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedObject && (event.key === 'Delete')) {
        removeSelectedObject();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      canvas.off('selection:created', handleObjectSelected);
      canvas.off('selection:updated', handleObjectSelected);
      canvas.off('selection:cleared', handleObjectDeselected);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvas, selectedObject]);

  const addText = () => {
    const text = new fabric.Textbox(textInput, {
      left: 50,
      top: 50,
      width: 200,
      fontSize: 20,
      fill: 'black',
      editable: true,
    });
    canvas.add(text);
    canvas.renderAll();
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 50,
      top: 100,
      fill: circleColor,
      radius: 50,
      selectable: true,
    });
    canvas.add(circle);
    canvas.renderAll();
  };

  const addRectangle = () => {
    const rectangle = new fabric.Rect({
      left: 50,
      top: 50,
      fill: rectangleColor,
      width: 100,
      height: 50,
      selectable: true,
    });
    canvas.add(rectangle);
    canvas.renderAll();
  };

  const changeSelectedColor = (color: string) => {
    if (selectedObject) {
      selectedObject.set('fill', color);
      canvas.renderAll();
    }
  };

  const changeFont = (font: string) => {
    if (selectedObject && selectedObject.type === 'textbox') {
      selectedObject.set('fontFamily', font);
      canvas.renderAll();
    }
  };

  const removeSelectedObject = () => {
    if (selectedObject) {
      canvas.remove(selectedObject);
      setSelectedObject(null); // Clear the selection
      canvas.renderAll();
    }
  };

  return (
    <div>
      <h3>Add Elements to Canvas</h3>

      {/* Text Input for Textbox */}
      <div>
        <label>
          Text:
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </label>
        <button onClick={addText}>Add Text</button>
      </div>

      {/* Circle Color Input */}
      <div>
        <label>
          Circle Color:
          <input
            type="color"
            value={circleColor}
            onChange={(e) => setCircleColor(e.target.value)}
          />
        </label>
        <button onClick={addCircle}>Add Circle</button>
      </div>

      {/* Rectangle Color Input */}
      <div>
        <label>
          Rectangle Color:
          <input
            type="color"
            value={rectangleColor}
            onChange={(e) => setRectangleColor(e.target.value)}
          />
        </label>
        <button onClick={addRectangle}>Add Rectangle</button>
      </div>

      {/* Selected Object Menu */}
      {selectedObject && (
        <div>
          <h4>Selected Object Settings</h4>

          {/* Change Color */}
          <div>
            <label>
              Change Color:
              <input
                type="color"
                onChange={(e) => changeSelectedColor(e.target.value)}
              />
            </label>
          </div>

          {/* Change Font */}
          {selectedObject.type === 'textbox' && (
            <div>
              <label>
                Font Family:
                <select
                  value={fontFamily}
                  onChange={(e) => {
                    setFontFamily(e.target.value);
                    changeFont(e.target.value);
                  }}
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </label>
            </div>
          )}
          {/* Remove Button */}
          <button onClick={removeSelectedObject}>Remove Selected</button>
        </div>
      )}
    </div>
  );
};

export default ElementAdder;