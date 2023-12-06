import { useEffect } from "react";
import "../App.css";

interface CanvasComponentProps {
  imageUrl: string;
  canvasRef: React.RefObject<HTMLCanvasElement>
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({ imageUrl, canvasRef }) => {

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        // Load the image
        const image = new Image();
        image.src = imageUrl;
        canvas.className = "image-size";
        image.onload = () => {
        
          let scale = Math.min(
            1280 / image.naturalWidth,
            720 / image.naturalHeight
          );
          scale = scale > 1 ? 1 : scale; // Ensure we don't scale up the image

          canvas.width = image.naturalWidth * scale
          canvas.height = image.naturalHeight * scale

          // Draw the image
          context.drawImage(image, 0, 0, canvas.width, canvas.height);

          // Now you can draw on the canvas here
          // Example: Draw a line
          context.beginPath();
          context.moveTo(50, 50);
          context.lineTo(200, 400);
          context.stroke();
        };
      }
    }
  }, [imageUrl]);

  return (
    <div>
      <canvas ref={canvasRef} className="image-size"></canvas>
    </div>
  );
};

export default CanvasComponent;
