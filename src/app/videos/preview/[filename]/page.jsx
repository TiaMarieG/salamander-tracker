"use client";

import { useState, useEffect } from "react";
import ColorPicker from "@/components/ColorPicker";
import ThresholdInput from "@/components/Threshold";
import { useParams } from "next/navigation";

export default function FileDetail() {
   const params = useParams();
   const filename = params.filename;

   const [color, setColor] = useState(null);
   const [threshold, setThreshold] = useState(128);
   const [thumbnail, setThumbnail] = useState(null);
   const [binarizedUrl, setBinarizedUrl] = useState(null);
   const [message, setMessage] = useState("");

   // Load the thumbnail
   useEffect(() => {
      if (!filename) return;

      setThumbnail(null); // reset while loading
      fetch(`http://localhost:8080/thumbnail/${filename}`)
         .then((res) => res.blob())
         .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            setThumbnail(imageUrl);
         })
         .catch((err) => {
            console.error("Failed to fetch thumbnail:", err);
            setMessage("❌ Failed to load thumbnail.");
         });

      // Reset binarized image if file changes
      setBinarizedUrl(null);
      setMessage("");

   }, [filename]);

   // Load binarized version when color + threshold are set
   useEffect(() => {
      if (!color || !threshold || !filename) return;

      const { r, g, b } = color;
      const base = filename.replace(/\.[^/.]+$/, "");
      fetch(
         `http://localhost:8080/api/binarize?filename=${base}&r=${r}&g=${g}&b=${b}&threshold=${threshold}`
      )
         .then((res) => {
            if (!res.ok) throw new Error("Binarization failed");
            return res.blob();
         })
         .then((blob) => {
            const binUrl = URL.createObjectURL(blob);
            setBinarizedUrl(binUrl);
            setMessage("");
         })
         .catch((err) => {
            console.error("Binarize error:", err);
            setBinarizedUrl(null);
            setMessage("❌ Failed to binarize thumbnail.");
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

         <ColorPicker thumbnailSrc={thumbnail} onColorPicked={setColor} />
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
               color && <p>Loading binarized image...</p>
            )}
         </div>
      </div>
   );
}
