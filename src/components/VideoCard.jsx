"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ColorPicker from "@/components/ColorPicker";
import Threshold from "@/components/Threshold";

export default function VideoCard({ video }) {
   const [color, setColor] = useState("");
   const [threshold, setThreshold] = useState(100);
   const router = useRouter();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", video);
      const [r, g, b] = color.match(/\d+/g);
      formData.append("color", `${r},${g},${b}`);
      formData.append("threshold", threshold);

      const res = await fetch("http://localhost:8080/process", {
         method: "POST",
         body: formData,
      });

      const data = await res.json();
      router.push(`/videos/preview/${data.id}`);
   };

   return (
      <form
         onSubmit={handleSubmit}
         
      >
         <h3>{video}</h3>
         <ColorPicker
            thumbnailSrc={`http://localhost:8080/thumbnail/${video}.jpg`}
            onColorPicked={setColor}
         />
         <Threshold
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
         />
         <button type="submit">
            Submit
         </button>
      </form>
   );
}
