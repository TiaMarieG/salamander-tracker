"use client";

import { Box, Typography, Slider } from "@mui/material";

// Renders a labeled threshold slider for adjusting color-matching sensitivity
export default function ThresholdInput({ value, onChange }) {
   return (
      <Box sx={{ mt: 2, mb: 3 }}>
         {/* Label with current value */}
         <Typography variant="subtitle1" gutterBottom>
            Threshold: <strong>{value}</strong>
         </Typography>

         {/* Material UI Slider */}
         <Slider
            id="threshold"
            data-cy="threshold-slider"
            value={value}
            onChange={onChange}
            min={0}
            max={255}
            step={1}
            aria-label="Threshold"
            valueLabelDisplay="auto"
            sx={{ mt: 1 }}
         />

         {/* Helper text */}
         <Typography variant="caption" color="text.secondary">
            Higher values match more colors. Lower values are more precise.
            Please be aware that if the camera is shifted during tracking,
            tracking results may be affected.
         </Typography>
      </Box>
   );
}
