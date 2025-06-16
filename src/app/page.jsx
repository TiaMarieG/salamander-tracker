'use client';

import { useState } from "react";
import {
   Typography,
   Box,
   Paper,
   List,
   ListItem,
   ListItemText,
   Button,
} from "@mui/material";
import '../../styles/global.css';

export default function HomePage() {
   const [showSalamanders, setShowSalamanders] = useState(false);
   const [flyingLizards, setFlyingLizards] = useState([]);

   const summonLizards = () => {
      setShowSalamanders(true);

      // Generate 10 random lizards
      const newLizards = Array.from({ length: 10 }).map((_, i) => ({
         id: Date.now() + i,
         left: Math.random() * window.innerWidth,
         emoji: '🦎',
      }));

      setFlyingLizards((prev) => [...prev, ...newLizards]);

      // Remove them after 3 seconds
      setTimeout(() => {
         setFlyingLizards((prev) => prev.slice(newLizards.length));
      }, 3000);
   };

   return (
      <Box mt={4} position="relative" overflow="hidden">
         <Typography variant="h3" gutterBottom>
            Welcome to Salamander Tracker!
         </Typography>

         <Paper
            elevation={3}
            sx={{
               p: 4,
               mt: 4,
               position: "relative",
               overflow: "hidden",
               textAlign: "center",
            }}
         >
            {/* Salamander fade-ins on button click */}
            {showSalamanders && (
               <>
                  <img
                     src="/mrsal.png"
                     alt="Salamander Left"
                     className="salamander fade-in"
                     style={{
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        width: "100px",
                        transform: "scaleX(-1)",
                     }}
                  />
                  <img
                     src="/mrsal.png"
                     alt="Salamander Right"
                     className="salamander fade-in"
                     style={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        width: "100px",
                     }}
                  />
               </>
            )}

            {/* Flying emoji lizards */}
            {flyingLizards.map((lizard) => (
               <div
                  key={lizard.id}
                  className="flying-lizard"
                  style={{ left: `${lizard.left}px` }}
               >
                  {lizard.emoji}
               </div>
            ))}

            <Typography variant="h5" gutterBottom>
               Steps on how to use the website:
            </Typography>

            <List>
               <ListItem alignItems="flex-start">
                  <ListItemText
                     primary="1) Select 'Videos' from the navigation bar above"
                     secondary="This will bring you to a page where you are presented with a list of available videos."
                  />
               </ListItem>
               <ListItem alignItems="flex-start">
                  <ListItemText
                     primary="2) Select 'Preview' under the desired video"
                     secondary="You can also choose the 'Download' option to download the video to your computer."
                  />
               </ListItem>
               <ListItem alignItems="flex-start">
                  <ListItemText
                     primary="3) Select a color to track from the interactive thumbnail"
                     secondary="This can be changed at any time by selecting another part of the provided thumbnail."
                  />
               </ListItem>
               <ListItem alignItems="flex-start">
                  <ListItemText
                     primary="4) Adjust the Threshold slider to desired level"
                     secondary="The binarized image will display how strictly the program will track your selected color."
                  />
               </ListItem>
               <ListItem alignItems="flex-start">
                  <ListItemText
                     primary="5) Click 'Generate CSV'"
                     secondary="The program will start tracking the selected color. Once finished, it will provide a link to download the CSV."
                  />
               </ListItem>
            </List>

            {/* Trigger animation */}
            <Button
               variant="outlined"
               color="secondary"
               sx={{ mt: 3 }}
               onClick={summonLizards}
            >
               🐾 Summon Salamanders
            </Button>
         </Paper>
      </Box>
   );
}
