'use client';

import { Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

// This component renders the landing page of the Salamander Tracker application.
// It explains how to use the app in a step-by-step list inside a styled Paper box.
export default function HomePage() {
   return (
      <Box mt={4}>
         <Typography variant="h3" gutterBottom>
            Welcome to Salamander Tracker!
         </Typography>

         <Paper elevation={3} sx={{ p: 4 }}>
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
         </Paper>
      </Box>
   );
}
