import React, { useEffect, useRef, useState } from "react";
import "../pages/images/Image.css";

interface CanvasComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  imageUrl: string;
  draw: boolean;
  hexColor: string;
  allowEdit: boolean
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({
  canvasRef,
  imageUrl,
  draw,
  hexColor,
  allowEdit
}) => {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const isTextShown = useRef(false);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    contextRef.current = context;

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      const scale = Math.min(
        800 / image.naturalWidth,
        800 / image.naturalHeight
      );

      const scaledWidth = image.naturalWidth * scale;
      const scaledHeight = image.naturalHeight * scale;

      canvas.style.width = `${scaledWidth}px`;
      canvas.style.height = `${scaledHeight}px`;

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
      setLoaded(true); // Indicates that the image is loaded and drawn
    };
  }, [imageUrl]);

  useEffect(() => {

    if (!loaded) return;
    const context = contextRef.current;
    if (!context) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.strokeStyle = hexColor;
    context.fillStyle = hexColor;

   

    const getMousePosition = (canvas: HTMLCanvasElement, event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width; // relationship bitmap vs. element for X
      const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

      return {
        x: (event.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
        y: (event.clientY - rect.top) * scaleY, // been adjusted to be relative to element
      };
    };



    if (allowEdit && draw) {
      const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
        console.log("Drawing")
        context.beginPath();
        context.lineWidth = 10; // Change as needed
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
      };

      const handleMouseDown = (event: MouseEvent) => {
        const mousePos = getMousePosition(canvas, event);
        isDrawingRef.current = true;
        lastPointRef.current = mousePos;
      };

      const handleMouseMove = (event: MouseEvent) => {
        if (!isDrawingRef.current) return;
        const mousePos = getMousePosition(canvas, event);
        drawLine(
          lastPointRef.current.x,
          lastPointRef.current.y,
          mousePos.x,
          mousePos.y
        );
        lastPointRef.current = mousePos;
      };

      const handleMouseUp = () => {
        isDrawingRef.current = false;
      };

      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    } else if (!draw && allowEdit){
      const showTextField = (event: MouseEvent) => {
        if (!isTextShown.current) {
          const relMousePos = getMousePosition(canvas, event);
          textInputRef.current = document.createElement("input");

          textInputRef.current.type = "text";
          textInputRef.current.style.position = "absolute";
          textInputRef.current.style.left = `${event.clientX}px`;
          textInputRef.current.style.top = `${event.clientY}px`;
          lastPointRef.current.x = relMousePos.x;
          lastPointRef.current.y = relMousePos.y;

          document.body.appendChild(textInputRef.current);

          textInputRef.current.focus();
          isTextShown.current = true;
        } else {
          if (textInputRef.current) {
            const fontSize = Math.sqrt(Math.sqrt(canvas.width * canvas.height)) /10;
            const fontFamily = "Arial"; // Set the font family as needed

            const text = textInputRef.current.value;
            context.textAlign = "left";
            context.textBaseline = "top";

            context.font = `${fontSize}rem ${fontFamily}`;
            context.fillText(
              text,
              lastPointRef.current.x,
              lastPointRef.current.y
            );
            if (document.body.contains(textInputRef.current)) {
              document.body.removeChild(textInputRef.current);
            }

            textInputRef.current = null;
          }
          isTextShown.current = false;
        }
      };

      canvas.addEventListener("click", showTextField);
      return () => {
        canvas.removeEventListener("click", showTextField);
        if (textInputRef.current) {
          document.body.removeChild(textInputRef.current);
        }
      };
      
    }

   

  }, [hexColor, draw, allowEdit]);

  return (
    <div>
      <canvas ref={canvasRef} className="image-size" />
    </div>
  );
};

export default CanvasComponent;
