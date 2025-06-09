"use client";

import { useState, useEffect } from "react";
import ColorPicker from "@/components/ColorPicker";
import ThresholdInput from "@/components/Threshold";
import { useParams } from "next/navigation";

export default function FileDetail() {
   const { filename } = useParams();
   const [color, setColor] = useState(null);
   const [threshold, setThreshold] = useState(128);
   const [thumbnail, setThumbnail] = useState(null);
   const [binarizedUrl, setBinarizedUrl] = useState(null);
   const [message, setMessage] = useState("");

   // Load the original thumbnail
   useEffect(() => {
      if (!filename) return;

      const controller = new AbortController();
      setMessage("🔄 Loading thumbnail...");
      setColor(null);
      setBinarizedUrl(null);

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

   // Binarize whenever color or threshold changes
   useEffect(() => {
      if (!filename || !color || isNaN(threshold)) return;

      const imageFilename = filename.replace(/\.[^/.]+$/, ".jpg"); // force .jpg

      const query = new URLSearchParams({
         filename,
         r: color.r,
         g: color.g,
         b: color.b,
         threshold,
      });

      fetch(`http://localhost:8080/api/binarize-thumbnail?${query}`)
         .then((res) => {
            if (!res.ok) throw new Error("Binarization failed");
            return res.blob();
         })
         .then((blob) => setBinarizedUrl(URL.createObjectURL(blob)))
         .catch((err) => {
            console.error(err);
         });
   }, [color, threshold, filename]);

   return (
      <div>
         <h1>Preview: {filename}</h1>

         {thumbnail && (
            <>
               <h2>Original Thumbnail</h2>
               <img
                  src={thumbnail}
                  alt="Thumbnail"
                  style={{ maxWidth: "100%", marginBottom: "1rem" }}
               />
            </>
         )}

         <ColorPicker 
            thumbnailSrc={thumbnail}
            onColorPicked={setColor}
            />
         <ThresholdInput
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
         />

         {message && <p>{message}</p>}

         <div style={{ marginTop: "20px" }}>
            {binarizedUrl ? (
               <>
                  <h2>Binarized Preview</h2>
                  <img
                     src={binarizedUrl}
                     alt="Binarized result"
                     style={{ maxWidth: "100%" }}
                  />
               </>
            ) : (
               color && <p>⏳ Waiting for binarized image...</p>
            )}
         </div>
      </div>
   );
}
