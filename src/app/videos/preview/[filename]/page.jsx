export default async function PreviewPage({ params }) {
   const filename = params.filename;
   const videoUrl = `http://localhost:8080/videos/${filename}`;
   const csvUrl = `http://localhost:8080/results/${filename}.csv`;

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
      </div>
   );
}
