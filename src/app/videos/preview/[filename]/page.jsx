// app/videos/preview/[filename]/page.jsx
"use client";

export default function PreviewPage({ params }) {
   const filename = params.filename;
   const videoUrl = `http://localhost:8080/videos/${filename}`;
   const csvUrl = `http://localhost:8080/results/${filename}.csv`;
   const chartUrl = `http://localhost:8080/results/${filename}.png`;

   return (
      <div>
         <h2>Video Preview: {filename}</h2>
         <video controls width="600" src={videoUrl}></video>

         <p>
            <a
               href={csvUrl}
               target="_blank">
               Download Centroid Data (CSV)
            </a>
         </p>

         <div>
            <h3>
               Salamander Movement Chart
            </h3>
            <img
               src={chartUrl}
               alt="Salamander Movement Chart"/>
         </div>
      </div>
   );
}
