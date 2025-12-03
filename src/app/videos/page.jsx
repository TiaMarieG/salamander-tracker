'use client';

import React, { useEffect, useState } from "react";
import VideoCard from "@/components/VideoCard";
import { Typography, Grid, Alert, Container } from "@mui/material";

// VideosPage fetches a list of available videos from the backend and displays them as individual cards.
export default function VideosPage() {
   const [videos, setVideos] = useState([]);
   const [error, setError] = useState(null);

   useEffect(() => {
      fetch("http://64.23.238.198:8080/api/videos")
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
      <Container maxWidth="lg" sx={{ mt: 4 }}>
         <Typography variant="h4" gutterBottom>
            Available Videos
         </Typography>

         {error && <Alert severity="error">{error}</Alert>}

         <Grid container spacing={3}>
            {videos.map((video) => (
               <Grid item xs={12} sm={6} md={4} key={video}>
                  <VideoCard filename={video} />
               </Grid>
            ))}
         </Grid>
      </Container>
   );
}
