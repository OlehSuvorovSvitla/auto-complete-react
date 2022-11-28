import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import "./Autocomplete.css";
import EmptyList from "./EmptyList";

export interface Props {
  suggestions: string[];
}

interface KeyboardEvent extends SyntheticEvent {
  code: string;
}

function Autocomplete({ suggestions }: Props): JSX.Element {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");
  const activeElement = useRef(null);

  useEffect(() => {
    activeElement?.current?.scrollIntoView();
  }, [activeSuggestion]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const userInput = e.currentTarget.value;
    setActiveSuggestion(0);
    setFilteredSuggestions(
      suggestions.filter((suggestion) => suggestion.indexOf(userInput) > -1)
    );
    setShowSuggestions(true);
    setUserInput(userInput);
  };

  const onClick = (suggestionValue) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(suggestionValue);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      setUserInput(filteredSuggestions[activeSuggestion]);
      setActiveSuggestion(0);
      setShowSuggestions(false);
    }

    if (e.code === "ArrowUp") {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }

    if (e.code === "ArrowDown") {
      if (activeSuggestion + 1 >= filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const highlightedText = (text, subString) =>
    text.replace(new RegExp(subString, "g"), `<b>${subString}</b>`);

  const isSuggestionsListAvailable =
    showSuggestions && userInput && filteredSuggestions.length;

  const suggestionsListComponent = isSuggestionsListAvailable ? (
    <ul className="suggestions">
      {filteredSuggestions.map((filteredSuggestion: string, index: number) => (
        <li
          ref={index === activeSuggestion ? activeElement : null}
          className={index === activeSuggestion ? "suggestion-active" : null}
          key={filteredSuggestion}
          onClick={() => onClick(filteredSuggestion)}
          dangerouslySetInnerHTML={{
            __html: highlightedText(filteredSuggestion, userInput),
          }}
        />
      ))}
    </ul>
  ) : (
    <EmptyList suggestions={suggestions} />
  );

  return (
    <div className="App-autocomplete">
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {userInput && showSuggestions && suggestionsListComponent}
    </div>
  );
}

export default Autocomplete;
