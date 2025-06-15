"use client";

import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { Box, Typography, Paper, Alert, Container, Grid } from "@mui/material";

import ColorPicker from "@/components/ColorPicker";
import ThresholdInput from "@/components/Threshold";
import GenerateCsvButton from "@/components/GenerateCsvButton";

export default function FileDetail() {
   const { filename } = useParams();
   const [color, setColor] = useState(null);
   const [threshold, setThreshold] = useState(128);
   const [thumbnail, setThumbnail] = useState(null);
   const [message, setMessage] = useState("");

   const binarizedCanvasRef = useRef(null);

   // Fetch thumbnail
   useEffect(() => {
      if (!filename) return;

      const controller = new AbortController();
      setMessage("🔄 Loading thumbnail...");
      setColor(null);

      fetch(`http://localhost:8080/thumbnail/${filename}`, {
         signal: controller.signal,
      })
         .then((res) => {
            if (!res.ok) throw new Error("Thumbnail fetch failed");
            return res.blob();
         })
         .then((blob) => {
            setThumbnail(URL.createObjectURL(blob));
            setMessage("");
         })
         .catch((err) => {
            if (err.name !== "AbortError") {
               console.error("Failed to load thumbnail:", err);
               setMessage("❌ Failed to load thumbnail.");
            }
         });

      return () => controller.abort();
   }, [filename]);

   // Generate binarized preview
   useEffect(() => {
      if (
         !thumbnail ||
         !color ||
         isNaN(threshold) ||
         !binarizedCanvasRef.current
      )
         return;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = thumbnail;

      img.onload = () => {
         const canvas = binarizedCanvasRef.current;
         const ctx = canvas.getContext("2d");
         const width = img.naturalWidth * 0.5;
         const height = img.naturalHeight * 0.5;

         canvas.width = width;
         canvas.height = height;
         ctx.drawImage(img, 0, 0, width, height);

         const imageData = ctx.getImageData(0, 0, width, height);
         const data = imageData.data;

         for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const dist = Math.sqrt(
               Math.pow(r - color.r, 2) +
                  Math.pow(g - color.g, 2) +
                  Math.pow(b - color.b, 2)
            );

            const value = dist <= threshold ? 255 : 0;
            data[i] = data[i + 1] = data[i + 2] = value;
            data[i + 3] = 255;
         }

         ctx.putImageData(imageData, 0, 0);
      };
   }, [thumbnail, color, threshold]);

   return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
         <Typography variant="h4" gutterBottom>
            Preview: {filename}
         </Typography>

         <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={3} justifyContent="center">
               {/* Thumbnail + Picker */}
               <Grid item xs={12} md={5}>
                  <Typography variant="subtitle1" gutterBottom>
                     Thumbnail Preview
                  </Typography>
                  <Box display="flex" justifyContent="center">
                     <ColorPicker
                        thumbnailSrc={thumbnail}
                        onColorPicked={setColor}
                     />
                  </Box>
                  {!color && thumbnail && (
                     <Typography sx={{ mt: 1, textAlign: "center" }}>
                        🎯 Click the image above to select a color
                     </Typography>
                  )}
                  {color && (
                     <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        mt={2}
                     >
                        <Box
                           sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "4px",
                              backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                              border: "1px solid #000",
                              mr: 1,
                           }}
                        />
                        <Typography variant="body1" data-cy="selected-color">
                           Selected Color: rgb({color.r}, {color.g}, {color.b})
                        </Typography>
                     </Box>
                  )}
               </Grid>

               {/* Binarized canvas */}
               <Grid item xs={12} md={5}>
                  <Typography
                     variant="subtitle1"
                     gutterBottom
                     textAlign="center"
                  >
                     Binarized Preview
                  </Typography>
                  <Box display="flex" justifyContent="center">
                     <canvas
                        ref={binarizedCanvasRef}
                        style={{
                           border: "1px solid #888",
                           maxWidth: "100%",
                           display: "block",
                        }}
                     />
                  </Box>
               </Grid>
            </Grid>
         </Paper>

         {/* Step 2: Threshold */}
         <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
               Adjust Threshold
            </Typography>
            <ThresholdInput
               value={threshold}
               onChange={(e) => setThreshold(Number(e.target.value))}
            />
         </Paper>

         {/* Message display */}
         {message && (
            <Alert
               severity={message.startsWith("❌") ? "error" : "info"}
               sx={{ mb: 3 }}
            >
               {message}
            </Alert>
         )}

         {/* Step 4: Generate CSV */}
         {color && (
            <Box textAlign="center" mt={3}>
               <GenerateCsvButton
                  filename={filename}
                  color={color}
                  threshold={threshold}
               />
            </Box>
         )}
      </Container>
   );
}
