import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import Link from 'next/link';

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
            >
               Preview
            </Button>
            <Button
               href={`http://localhost:8080/api/videos/download/${encodeURIComponent(filename)}`}
               variant="contained"
               color="primary"
               target="_blank"
            >
               Download
            </Button>
         </CardActions>
      </Card>
   );
}
