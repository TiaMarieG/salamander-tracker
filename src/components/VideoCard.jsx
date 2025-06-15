import {
   Card,
   CardContent,
   CardActions,
   Button,
   Typography,
} from "@mui/material";
import Link from "next/link";

// Renders a Material UI card for a single video entry with a Preview button
export default function VideoCard({ filename }) {
   return (
      <Card>
         <CardContent>
            <Typography variant="h6" gutterBottom>
               {filename}
            </Typography>
         </CardContent>
         <CardActions>
            <Button
               component={Link}
               href={`/videos/preview/${encodeURIComponent(filename)}`}
               variant="outlined"
               data-cy={`preview-button-${filename}`}
            >
               Preview
            </Button>
         </CardActions>
      </Card>
   );
}
