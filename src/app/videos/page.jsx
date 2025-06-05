"use client";
import React, { useEffect, useState } from "react";
import VideoCard from "@/components/VideoCard";

export default function VideosPage() {
   const [videos, setVideos] = useState([]);
   const [error, setError] = useState(null);

   useEffect(() => {
      fetch("http://localhost:8080/api/videos")
         .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch videos");
            return res.json();
         })
         .then((data) => setVideos(data))
         .catch((err) => {
            console.error("Error fetching videos:", err);
            setError("Could not load videos.");
         });
   }, []);

   return (
      <div>
         <h1>Available Videos</h1>
         {error && <p>{error}</p>}
         <ul>
            {videos.map((video) => (
               <li key={video}>
                  <VideoCard filename={video} />
               </li>
            ))}
         </ul>
      </div>
   );
}
