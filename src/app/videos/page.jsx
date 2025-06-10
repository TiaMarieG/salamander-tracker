'use client';

import React, { useEffect, useState } from "react";
import VideoCard from "@/components/VideoCard";
import { Typography, Grid, Alert, Container } from "@mui/material";

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
