'use client';

import { useState } from 'react';
import {
   Box,
   Typography,
   Button,
   CircularProgress,
   Alert,
   Paper,
   Stack,
   Link as MuiLink,
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DownloadIcon from '@mui/icons-material/Download';

export default function GenerateCsvButton({ filename, color, threshold }) {
   const [status, setStatus] = useState('idle'); // idle | waiting | done | error
   const [downloadUrl, setDownloadUrl] = useState(null);
   const [errorMessage, setErrorMessage] = useState('');

   const handleGenerate = async () => {
      setStatus('waiting');
      setDownloadUrl(null);
      setErrorMessage('');

      try {
         const res = await fetch('http://localhost:8080/api/generate-csv', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, color, threshold }),
         });

         if (!res.ok) throw new Error(`CSV generation failed (${res.status})`);
         const { jobId } = await res.json();

         const pollInterval = 2000;
         const timeout = 60000;
         const start = Date.now();

         const poll = setInterval(async () => {
            if (Date.now() - start > timeout) {
               clearInterval(poll);
               setStatus('error');
               setErrorMessage('⏱️ CSV generation timed out.');
               return;
            }

            try {
               const pollRes = await fetch(`http://localhost:8080/process/${jobId}/status`);
               if (!pollRes.ok) throw new Error('Polling failed');

               const data = await pollRes.json();

               if (data.status === 'done' && data.result) {
                  clearInterval(poll);
                  setStatus('done');
                  setDownloadUrl(data.result.startsWith('http')
                     ? data.result
                     : `http://localhost:8080${data.result}`);
               } else if (data.status === 'error') {
                  clearInterval(poll);
                  setStatus('error');
                  setErrorMessage(data.error || 'Unknown error during processing.');
               }
            } catch (err) {
               clearInterval(poll);
               console.error('Polling error:', err);
               setStatus('error');
               setErrorMessage('Failed to poll CSV job status.');
            }
         }, pollInterval);
      } catch (err) {
         console.error('CSV request error:', err);
         setStatus('error');
         setErrorMessage('CSV request failed.');
      }
   };

   return (
      <Paper elevation={4} sx={{ p: 4, mt: 5, borderRadius: 2 }}>
         <Stack spacing={3} alignItems="center" justifyContent="center">
            <Button
               variant="contained"
               color="success"
               size="large"
               onClick={handleGenerate}
               disabled={status === 'waiting'}
               startIcon={<RocketLaunchIcon />}
            >
               Generate CSV
            </Button>

            {status === 'waiting' && (
               <Box display="flex" alignItems="center" gap={2}>
                  <CircularProgress size={24} />
                  <Typography>⏳ Processing request...</Typography>
               </Box>
            )}

            {status === 'done' && downloadUrl && (
               <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
                  ✅ CSV Ready!
                  <Box mt={2} textAlign="center">
                     <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        href={downloadUrl}
                        download
                     >
                        Download CSV
                     </Button>
                  </Box>
               </Alert>
            )}

            {status === 'error' && (
               <Alert severity="error" sx={{ width: '100%' }}>
                  ❌ {errorMessage}
               </Alert>
            )}
         </Stack>
      </Paper>
   );
}
