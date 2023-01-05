import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Autocomplete.css";
import EmptyList from "./EmptyList";

export interface AutocompleteProps {
  suggestions: string[];
}

const Autocomplete: FunctionComponent<AutocompleteProps> = ({
  suggestions,
}) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");
  const activeElement = useRef(null);

  useEffect(() => {
    activeElement?.current?.scrollIntoView();
  }, [activeSuggestion]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const userInput = e.currentTarget.value;
      setActiveSuggestion(0);
      setFilteredSuggestions(
        suggestions.filter((suggestion) => suggestion.indexOf(userInput) > -1)
      );
      setShowSuggestions(true);
      setUserInput(userInput);
    },
    [suggestions]
  );

  const onClick = useCallback(
    (suggestionValue) => {
      setActiveSuggestion(0);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setUserInput(suggestionValue);
    },
    []
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
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
    },
    [filteredSuggestions, activeSuggestion]
  );

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
};

export default Autocomplete;
