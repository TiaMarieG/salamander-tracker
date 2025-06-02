//Dynamic route to test id functionality

export default async function FileDetail({ params }) {
   const fileInfo = params.filename;

   return <div>Video File: {fileInfo}</div>;
}
