import React, { useEffect, useState } from "react";
import data from "../data/recipe.json";

const Search = ({ searchText, setSearchText }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchText) {
        const url =
          "https://forkify-api.herokuapp.com/api/search?q=" + searchText;
        const response = await fetch(url);
        // console.log(await response.json());
        setSuggestions((await response.json()).recipes);
      }
    };

    fetchSuggestions();
  }, [searchText]);

  // console.log(suggestions);

  const filteredSuggestion = suggestions?.map((suggestion) => {
    return suggestion.title;
  });

  console.log(typeof filteredSuggestion);

  // const filteredSuggestion = suggestions?.filter((suggestion) => {
  //   console.log(suggestion);
  //   return suggestion.includes(searchText.toLowerCase());
  // });

  const handleChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleClick = (suggestion) => {
    setSearchText(suggestion);
  };

  return (
    <div>
      <input
        value={searchText}
        type="text"
        placeholder="Enter the recipe name"
        onChange={handleChange}
      />
      <ul>
        {filteredSuggestion?.map((suggestion) => {
          return (
            <button onClick={() => handleClick(suggestion)}>
              {suggestion}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

export default Search;
