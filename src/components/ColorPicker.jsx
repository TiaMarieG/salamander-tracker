"use client";

import { useRef, useState, useEffect } from "react";

export default function ColorPicker({ thumbnailSrc, onColorPicked, threshold }) {
   const canvasRef = useRef(null);
   const imgRef = useRef(null);
   const [pickedColor, setPickedColor] = useState(null);

   // Draw and binarize when image or inputs change
   useEffect(() => {
      const img = imgRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      if (!img || !canvas) return;

      img.onload = () => {
         const scale = 0.5; // reduce size for performance
         const width = img.naturalWidth * scale;
         const height = img.naturalHeight * scale;

         canvas.width = width;
         canvas.height = height;
         ctx.drawImage(img, 0, 0, width, height);

         if (pickedColor && !isNaN(threshold)) {
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
               const r = data[i];
               const g = data[i + 1];
               const b = data[i + 2];

               const dist = Math.sqrt(
                  Math.pow(r - pickedColor.r, 2) +
                  Math.pow(g - pickedColor.g, 2) +
                  Math.pow(b - pickedColor.b, 2)
               );

               if (dist <= threshold) {
                  data[i] = 255;
                  data[i + 1] = 255;
                  data[i + 2] = 255;
               } else {
                  data[i] = 0;
                  data[i + 1] = 0;
                  data[i + 2] = 0;
               }

               data[i + 3] = 255;
            }

            ctx.putImageData(imageData, 0, 0);
         }
      };

      if (thumbnailSrc) {
         img.src = thumbnailSrc;
      }
   }, [thumbnailSrc, pickedColor, threshold]);

   const handleClick = (e) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      const rect = canvas.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const colorObj = { r: pixel[0], g: pixel[1], b: pixel[2] };

      setPickedColor(colorObj);
      onColorPicked(colorObj);
   };

   return (
      <div>
         <h3>Select a Color</h3>
         <canvas
            ref={canvasRef}
            onClick={handleClick}
            style={{ cursor: "crosshair", border: "1px solid #ccc", maxWidth: "100%" }}
         />
         <img
            ref={imgRef}
            src={thumbnailSrc}
            alt="Hidden Thumbnail"
            style={{ display: "none" }}
         />
         {pickedColor && (
            <div style={{ marginTop: "10px" }}>
               <strong>Picked Color:</strong>{" "}
               <span
                  style={{
                     display: "inline-block",
                     width: "20px",
                     height: "20px",
                     backgroundColor: `rgb(${pickedColor.r}, ${pickedColor.g}, ${pickedColor.b})`,
                     marginLeft: "8px",
                     verticalAlign: "middle",
                     border: "1px solid #888",
                  }}
               ></span>{" "}
               rgb({pickedColor.r}, {pickedColor.g}, {pickedColor.b})
            </div>
         )}
      </div>
   );
}
