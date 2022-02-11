import React, { useState, useEffect } from "react";
import "./searchTag.css";

export default function SearchTag() {
  // States
  const [people, setPeople] = useState(null);
  const [search, setSearch] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [added, setAdded] = useState([]);

  // Fetch JSON data from provided link
  useEffect(() => {
    fetch("http://api.open-notify.org/astros.json")
      .then((res) => res.json())
      .then(
        (result) => {
          const peopleArray = result.people;
          setPeople(peopleArray.map((person) => person.name));
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  // Event Handlers
  const handleDropdownClick = (e) => {
    const toAdd = e?.target.innerText;
    const copyArray = [...added];
    copyArray.push(toAdd);
    setAdded(copyArray);
    setSearch("");
    setIsFocus(false);
  };

  const handleDropdownCreate = (searchText) => {
    const copyArray = [...added];
    copyArray.push(searchText);
    setAdded(copyArray);
    setSearch("");
    setIsFocus(false);
  };

  const handleDelete = (deleteIndex) => {
    setAdded(added.filter((name, index) => index !== deleteIndex));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search !== "") {
      handleDropdownCreate(search);
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="Search-container">
        {added.length > 0 &&
          added.map((name, index) => {
            return (
              <div key={`added-${name}-${index}`} className="Search-added">
                {name}{" "}
                <button
                  className="Search-delete"
                  onClick={() => handleDelete(index)}
                >
                  &times;
                </button>
              </div>
            );
          })}
        <div>
          <textarea
            id="search-field"
            className="Search-input"
            value={search}
            placeholder="&#43; Add tag"
            onFocus={() => setIsFocus(true)}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearch(e.target.value)}
          />
          {isFocus && (
            <>
              <div
                className="Matches-blocker"
                onClick={() => setIsFocus(false)}
              />
              <div className="Matches-container">
                {people?.map((name, index) => {
                  return (
                    <p
                      key={`people-${index}`}
                      className="Matches-row"
                      onClick={handleDropdownClick}
                    >
                      {name}
                    </p>
                  );
                })}
                {search !== "" && (
                  <p
                    className="Matches-row"
                    onClick={() => handleDropdownCreate(search)}
                  >
                    <span style={{ color: "gray" }}>Create </span>
                    {search}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
