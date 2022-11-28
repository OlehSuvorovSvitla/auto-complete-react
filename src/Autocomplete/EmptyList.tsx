import React from "react";
import { Props } from "./Autocomplete";

export default function EmptyList({ suggestions }: Props) {
  return (
    <div className="no-suggestions">
      <p>
        <em>No matching suggestions</em>
      </p>
      <details>
        <summary>List of imported values</summary>
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
