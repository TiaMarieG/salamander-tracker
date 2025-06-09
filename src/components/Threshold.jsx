"use client"; // Ensures this component is rendered on the client side in Next.js

export default function ThresholdInput({ value, onChange }) {
   return (
      <div style={{ margin: "1rem 0" }}>
         {/* Label for the slider */}
         <label htmlFor="threshold">
            Threshold: <strong>{value}</strong>
         </label>

         {/* Range slider (0–255) */}
         <input
            id="threshold"
            type="range"
            min="0"
            max="255"
            value={value}
            onChange={onChange}
            style={{ width: "100%", marginTop: "0.5rem" }}
         />
      </div>
   );
}
