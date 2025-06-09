"use client";

import { useRef, useState, useEffect } from "react";

export default function ColorPicker({ thumbnailSrc, onColorPicked }) {
   const canvasRef = useRef(null);
   const imgRef = useRef(null);
   const [pickedColor, setPickedColor] = useState(null);

   // Canvas size
   const CANVAS_WIDTH = 320;
   const CANVAS_HEIGHT = 180;

   useEffect(() => {
      const img = imgRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      img.onload = () => {
         canvas.width = CANVAS_WIDTH;
         canvas.height = CANVAS_HEIGHT;
         ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      };
   }, [thumbnailSrc]);

   const handleClick = (e) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      const rect = canvas.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const colorObj = { r: pixel[0], g: pixel[1], b: pixel[2] };

      setPickedColor(`rgb(${colorObj.r}, ${colorObj.g}, ${colorObj.b})`);
      onColorPicked(colorObj); // Send RGB as object
   };

   return (
      <div>
         <canvas
            ref={canvasRef}
            onClick={handleClick}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{ cursor: "crosshair", border: "1px solid #ccc" }}
         />
         <img
            ref={imgRef}
            src={thumbnailSrc}
            alt="Video Thumbnail"
            style={{ display: "none" }}
         />
         {pickedColor && (
            <p>
               Picked Color:{" "}
               <span style={{ color: pickedColor }}>{pickedColor}</span>
            </p>
         )}
      </div>
   );
}
