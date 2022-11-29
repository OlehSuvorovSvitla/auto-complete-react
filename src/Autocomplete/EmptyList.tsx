import React, {FunctionComponent} from "react";
import {AutocompleteProps} from "./Autocomplete";

const EmptyList: FunctionComponent<AutocompleteProps> = ({suggestions}) => {
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
};

export default EmptyList
