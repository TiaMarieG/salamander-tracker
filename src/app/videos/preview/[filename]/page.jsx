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
   const [message, setMessage] = useState("");

   useEffect(() => {
      fetch(`http://localhost:8080/thumbnail/${filename}`)
         .then((res) => res.blob())
         .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            setThumbnail(imageUrl);
         })
         .catch((err) => console.error("Failed to fetch thumbnail:", err));
   }, [filename]);

   const handleSubmit = () => {
      fetch("http://localhost:8080/process", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ filename, color, threshold }),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log("Processing complete:", data);
            setMessage("Processing started! Check the console or server logs for updates.");
         })
         .catch((err) => {
            console.error("Error processing video:", err);
            setMessage("An error occurred during processing.");
         });
   };

   return (
      <div>
         <h1>Preview: {filename}</h1>

         <ColorPicker thumbnailSrc={thumbnail} onColorPicked={setColor} />
         <ThresholdInput value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} />

         <button onClick={handleSubmit}>Submit</button>

         {message && <p>{message}</p>}
      </div>
   );
}
