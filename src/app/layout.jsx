import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/videos">Videos</Link></li>
            <li><Link href="/videos/preview">Preview</Link></li>
          </ul>
        </nav>

        {/* Needed to show page content */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
