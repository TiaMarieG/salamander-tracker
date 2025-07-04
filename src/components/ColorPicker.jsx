"use client";

import { useRef, useEffect } from "react";

// A color selection tool that renders a thumbnail on a canvas.
// Users click on a pixel to select its RGB color, which is sent back via onColorPicked.
export default function ColorPicker({ thumbnailSrc, onColorPicked }) {
   const canvasRef = useRef(null);
   const imgRef = useRef(null);

   useEffect(() => {
      const img = imgRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!img || !canvas) return;

      // Once the image loads, draw it onto the canvas at half size
      img.onload = () => {
         const scale = 0.5;
         const width = img.naturalWidth * scale;
         const height = img.naturalHeight * scale;

         canvas.width = width;
         canvas.height = height;
         ctx.drawImage(img, 0, 0, width, height);

         canvas.setAttribute('data-ready', 'true');
      };

      if (thumbnailSrc) {
         img.src = thumbnailSrc;
      }
   }, [thumbnailSrc]);

   // Handle clicks on the canvas to extract RGB color from the clicked pixel
   const handleClick = (e) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      const rect = canvas.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const colorObj = { r: pixel[0], g: pixel[1], b: pixel[2] };

      onColorPicked(colorObj);
   };

   return (
      <div>
         <canvas
            ref={canvasRef}
            onClick={handleClick}
            data-cy="color-picker"
            style={{
               cursor: "crosshair",
               border: "1px solid #ccc",
               maxWidth: "100%",
            }}
         />
         <img
            ref={imgRef}
            src={thumbnailSrc}
            alt="Hidden Thumbnail"
            style={{ display: "none" }}
         />
      </div>
   );
}
