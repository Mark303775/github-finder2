import { useState } from "react";

const SUGGESTIONS = ["torvalds", "gaearon", "sindresorhus"];

export default function SearchBar({ onSearch, disabled }) {
  const [value, setValue] = useState(""); // controlled input

  function handleSubmit(e) {
    e.preventDefault(); // stop the page reload; pressing Enter also submits the form
    onSearch(value);
  }

  function handleSuggestion(name) {
    setValue(name);
    onSearch(name);
  }

  return (
    <section className="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="GitHub username"
          aria-label="GitHub username"
          autoComplete="off"
        />
        <button type="submit" disabled={disabled}>Search</button>
      </form>
      <div className="suggestions">
        <span>Try:</span>
        {SUGGESTIONS.map((name) => (
          <button key={name} type="button" className="chip" onClick={() => handleSuggestion(name)} disabled={disabled}>
            {name}
          </button>
        ))}
      </div>
    </section>
  );
}
