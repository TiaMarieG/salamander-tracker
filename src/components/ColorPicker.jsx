"use client"; // Ensures this component runs on the client side in Next.js

import { useRef, useState, useEffect } from "react";

// Functional React component that allows users to click on a thumbnail image
// and extract the color of the pixel they clicked on.
export default function ColorPickerCanvas({ thumbnailSrc, onColorPicked }) {
   // Reference to the <canvas> element
   const canvasRef = useRef(null);

   // Reference to the <img> element (used to load the thumbnail)
   const imgRef = useRef(null);

   // Stores the most recently selected color (as an RGB string)
   const [pickedColor, setPickedColor] = useState(null);

   // After the component mounts (or when the thumbnailSrc changes),
   // draw the image onto the canvas so we can access pixel data.
   useEffect(() => {
      const img = imgRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Wait for the image to fully load before drawing it to the canvas
      img.onload = () => {
         canvas.width = img.width;         // Match canvas size to image
         canvas.height = img.height;
         ctx.drawImage(img, 0, 0);         // Draw image onto canvas at (0, 0)
      };
   }, [thumbnailSrc]);

   // When the user clicks on the canvas, extract the color at the clicked pixel
   const handleClick = (e) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Get mouse position relative to the canvas
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Get the color data at the clicked pixel (returns [r, g, b, a])
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

      // Save and propagate the selected color
      setPickedColor(rgb);       // Update state (for UI display)
      onColorPicked(rgb);        // Pass the selected color to the parent
   };

   return (
      <div>
         {/* Visible canvas that user interacts with */}
         <canvas
            ref={canvasRef}
            onClick={handleClick}
            style={{ cursor: "crosshair" }}
         />

         {/* Hidden <img> used only to draw the image onto the canvas */}
         <img
            ref={imgRef}
            src={thumbnailSrc}
            alt="Video Thumbnail"
            hidden
         />

         {/* Display selected color, if any */}
         {pickedColor && (
            <p className="mt-2">
               Picked Color: <span style={{ color: pickedColor }}>{pickedColor}</span>
            </p>
         )}
      </div>
   );
}
