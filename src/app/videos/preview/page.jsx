import Link from "next/link";

// User can preview videos from this page.
export default function Preview() {
   return (
      <div>
         <h1>Preview a Video</h1>
         <p>Select a video to preview from the list below.</p>
         <Link href="/videos/preview/newt1.mp4">Preview newt1.mp4</Link>
         <Link href="/videos/preview/newt2.mp4">Preview newt2.mp4</Link>

         <Link href="/videos/preview/newt3.mp4">Preview newt3.mp4</Link>
      </div>
   );
}
