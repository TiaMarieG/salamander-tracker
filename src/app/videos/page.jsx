import Test from '@/components/Test.jsx';
import Link from 'next/link';

// Created fake videos for the user to select on and test the preview dynamic route
// Also tested the Test component to see that it can be imported into the route
export default function VideosPage() {

   const sampleVideos = ['newt1.mp4', 'newt2.mp4', 'newt3.mp4'];

   return(
      <div>
         List of Videos
         <ul>
            {sampleVideos.map(file => (
               <li key={file}>
                  <Link href={`/videos/preview/${file}`}>{file}</Link>
               </li>
            ))}
         </ul>
         <Test />
      </div>
   )
}