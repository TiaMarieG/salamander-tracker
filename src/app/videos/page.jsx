"use client";
import { useEffect, useState } from "react";
import VideoCard from "@/components/VideoCard";

export default function VideosPage() {
   const [videos, setVideos] = useState([]);

   useEffect(() => {
      fetch("http://localhost:8080/api/videos")
         .then((res) => res.json())
         .then((data) => setVideos(data))
         .catch((err) => console.error("Failed to load videos:", err));
   }, []);

   return (
      <div>
         <h2>
            Select a Salamander Video
         </h2>
         <div>
            {videos.map((video) => (
               <VideoCard key={video} video={video} />
            ))}
         </div>
      </div>
   );
}
