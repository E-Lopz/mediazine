import React, { useState } from 'react';
import * as fabric from 'fabric';

interface CanvasProps {
  canvas: fabric.Canvas; // Explicitly type the canvas prop
}

const ElementAdder: React.FC<CanvasProps> = ({ canvas }) => {
  const [textInput, setTextInput] = useState<string>('');
  const [lineColor, setLineColor] = useState<string>('black');
  const [circleColor, setCircleColor] = useState<string>('black');
  const [rectangleColor, setRectangleColor] = useState<string>('black');

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

  const addLine = () => {
    const line = new fabric.Line([50, 100, 200, 200], {
      stroke: lineColor,
      strokeWidth: 5,
      selectable: true,
    });
    canvas.add(line);
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

  return (
    <div>
      <h3>Add Elements to Canvas</h3>

      {/* Text Input */}
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

      {/* Line Color Input */}
      <div>
        <label>
          Line Color:
          <input
            type="color"
            value={lineColor}
            onChange={(e) => setLineColor(e.target.value)}
          />
        </label>
        <button onClick={addLine}>Add Line</button>
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
    </div>
  );
};

export default ElementAdder;
