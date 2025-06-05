// src/components/VideoCard.jsx
"use client";
import Link from "next/link";

export default function VideoCard({ filename }) {
   return (
      <div className="video-card">
         <h3>{filename}</h3>
         <div>
            <Link href={`/videos/preview/${filename}`}>Preview</Link>
            {" | "}
            <a href={`http://localhost:3001/videos/${filename}`} download>
               Download
            </a>
         </div>
      </div>
   );
}
