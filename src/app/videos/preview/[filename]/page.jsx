"use client";

import { useRef, useState, useEffect } from "react";
import ColorPicker from "@/components/ColorPicker";
import ThresholdInput from "@/components/Threshold";
import { useParams } from "next/navigation";

export default function FileDetail() {
   const { filename } = useParams();
   const [color, setColor] = useState(null);
   const [threshold, setThreshold] = useState(128);
   const [thumbnail, setThumbnail] = useState(null);
   const [message, setMessage] = useState("");

   // Load thumbnail
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

   return (
      <div>
         <h1>Preview: {filename}</h1>

         <ColorPicker
            thumbnailSrc={thumbnail}
            onColorPicked={setColor}
            threshold={threshold}
         />

         <ThresholdInput
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
         />

         {message && <p>{message}</p>}
         {!color && thumbnail && <p>🎯 Click the canvas to select a color</p>}
      </div>
   );
}
