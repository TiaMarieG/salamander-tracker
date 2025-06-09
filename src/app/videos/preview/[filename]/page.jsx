"use client";

import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";

import ColorPicker from "@/components/ColorPicker";
import ThresholdInput from "@/components/Threshold";
import GenerateCsvButton from "@/components/GenerateCsvButton";

export default function FileDetail() {
   const { filename } = useParams();
   const [color, setColor] = useState(null);
   const [threshold, setThreshold] = useState(128);
   const [thumbnail, setThumbnail] = useState(null);
   const [message, setMessage] = useState("");

   const binarizedCanvasRef = useRef(null);

   // Fetch thumbnail on load
   useEffect(() => {
      if (!filename) return;

      const controller = new AbortController();
      setMessage("🔄 Loading thumbnail...");
      setColor(null);

      fetch(`http://localhost:8080/thumbnail/${filename}`, {
         signal: controller.signal,
      })
         .then((res) => {
            if (!res.ok) throw new Error("Thumbnail fetch failed");
            return res.blob();
         })
         .then((blob) => {
            setThumbnail(URL.createObjectURL(blob));
            setMessage("");
         })
         .catch((err) => {
            if (err.name !== "AbortError") {
               console.error("Failed to load thumbnail:", err);
               setMessage("❌ Failed to load thumbnail.");
            }
         });

      return () => controller.abort();
   }, [filename]);

   // Binarize preview
   useEffect(() => {
      if (
         !thumbnail ||
         !color ||
         isNaN(threshold) ||
         !binarizedCanvasRef.current
      )
         return;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = thumbnail;

      img.onload = () => {
         const canvas = binarizedCanvasRef.current;
         const ctx = canvas.getContext("2d");
         const width = img.naturalWidth * 0.5;
         const height = img.naturalHeight * 0.5;

         canvas.width = width;
         canvas.height = height;
         ctx.drawImage(img, 0, 0, width, height);

         const imageData = ctx.getImageData(0, 0, width, height);
         const data = imageData.data;

         for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const dist = Math.sqrt(
               Math.pow(r - color.r, 2) +
                  Math.pow(g - color.g, 2) +
                  Math.pow(b - color.b, 2)
            );

            const value = dist <= threshold ? 255 : 0;
            data[i] = data[i + 1] = data[i + 2] = value;
            data[i + 3] = 255;
         }

         ctx.putImageData(imageData, 0, 0);
      };
   }, [thumbnail, color, threshold]);

   return (
      <div>
         <h1>Preview: {filename}</h1>

         <ColorPicker thumbnailSrc={thumbnail} onColorPicked={setColor} />

         <ThresholdInput
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
         />

         <h3>Binarized Preview</h3>
         <canvas
            ref={binarizedCanvasRef}
            style={{ border: "1px solid #888", maxWidth: "100%" }}
         />

         {message && <p>{message}</p>}
         {!color && thumbnail && (
            <p>🎯 Click the image above to select a color</p>
         )}

         {color && (
            <GenerateCsvButton
               filename={filename}
               color={color}
               threshold={threshold}
            />
         )}
      </div>
   );
}
