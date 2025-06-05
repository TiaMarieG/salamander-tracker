"use client";
import Link from "next/link";

export default function VideosList({ videos }) {
   return (
      <ul className="space-y-3">
         {videos.map((video) => {
            const baseName = video.replace(".mp4", "");
            return (
               <li
                  key={video}
                  className="border p-4 rounded shadow flex justify-between items-center"
               >
                  <span>{video}</span>
                  <Link href={`/videos/preview/${baseName}`}>
                     <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Preview
                     </button>
                  </Link>
               </li>
            );
         })}
      </ul>
   );
}
