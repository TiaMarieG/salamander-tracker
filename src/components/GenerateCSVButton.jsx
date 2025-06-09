"use client";

import { useState } from "react";

export default function GenerateCsvButton({ filename, color, threshold }) {
   const [status, setStatus] = useState("idle"); // idle | waiting | done | error
   const [downloadUrl, setDownloadUrl] = useState(null);
   const [errorMessage, setErrorMessage] = useState("");

   const handleGenerate = async () => {
      setStatus("waiting");
      setDownloadUrl(null);
      setErrorMessage("");

      try {
         const res = await fetch("http://localhost:8080/api/generate-csv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename, color, threshold }),
         });

         if (!res.ok) throw new Error(`CSV generation failed (${res.status})`);
         const { jobId } = await res.json();

         const pollInterval = 2000;
         const timeout = 60000; // allow longer for large CSVs
         const start = Date.now();

         const poll = setInterval(async () => {
            if (Date.now() - start > timeout) {
               clearInterval(poll);
               setStatus("error");
               setErrorMessage("⏱️ CSV generation timed out.");
               return;
            }

            try {
               const pollRes = await fetch(
                  `http://localhost:8080/process/${jobId}/status`
               );
               if (!pollRes.ok) throw new Error("Polling failed");

               const data = await pollRes.json();

               if (data.status === "done" && data.result) {
                  clearInterval(poll);
                  setStatus("done");
                  setDownloadUrl(data.result.startsWith("http")
                     ? data.result
                     : `http://localhost:8080${data.result}`);
               } else if (data.status === "error") {
                  clearInterval(poll);
                  setStatus("error");
                  setErrorMessage(data.error || "Unknown error during processing.");
               }
            } catch (err) {
               clearInterval(poll);
               console.error("Polling error:", err);
               setStatus("error");
               setErrorMessage("Failed to poll CSV job status.");
            }
         }, pollInterval);
      } catch (err) {
         console.error("CSV request error:", err);
         setStatus("error");
         setErrorMessage("CSV request failed.");
      }
   };

   return (
      <div style={{ marginTop: "1.5rem" }}>
         <button onClick={handleGenerate} disabled={status === "waiting"}>
            🚀 Generate CSV
         </button>

         {status === "waiting" && <p>⏳ Waiting for Salamander API to finish...</p>}

         {status === "done" && downloadUrl && (
            <p>
               ✅ CSV Ready!{" "}
               <a href={downloadUrl} download style={{ fontWeight: "bold" }}>
                  📥 Download CSV
               </a>
            </p>
         )}

         {status === "error" && (
            <p style={{ color: "red" }}>❌ {errorMessage}</p>
         )}
      </div>
   );
}
