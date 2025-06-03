"use client"; // Ensures this component is rendered on the client side in Next.js

// A reusable slider component for selecting a numeric threshold
export default function ThresholdInput({ value, onChange }) {
   return (
      <div>
         {/* Label for the slider, improves accessibility and UX */}
         <label htmlFor="threshold">
            Threshold
         </label>

         {/* Range slider input (0–255), bound to the parent’s value and change handler */}
         <input
            id="threshold"          // Connects label to input
            type="range"            // Renders a horizontal slider
            min="0"                 // Minimum selectable value
            max="255"               // Maximum selectable value
            value={value}           // Controlled value from parent
            onChange={onChange}     // Updates parent state on interaction
         />

         {/* Displays the currently selected value below the slider */}
         <span>
            Selected: {value}
         </span>
      </div>
   );
}