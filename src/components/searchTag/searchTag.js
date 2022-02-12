import React, { useState, useEffect } from "react";
// Necessary library for animation as given in React docs: https://reactjs.org/docs/animation.html
import { TransitionGroup, CSSTransition } from "react-transition-group";
import astronautInfo from "../../assets/json/astronauts.json";
import "./searchTag.css";

export default function SearchTag() {
  // States
  const [originalPeople, setOriginalPeople] = useState(null);
  const [people, setPeople] = useState(null);
  const [search, setSearch] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [added, setAdded] = useState([]);

  // Fetch JSON data from provided link
  useEffect(() => {
    /*
    NOTE: I originally used the working fetch code below to get the astronaut names. However
    when deployed on an HTTPS server (in my case Netlify), the fetch would fail due to Chrome's mixed content blocking (the provided astronaut)
    api is served over HTTP). Therefore I have saved the json to the local file system.
   
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

    */
    const peopleArray = astronautInfo.people;
    const names = peopleArray.map((person) => person.name);
    setOriginalPeople(names);
    setPeople(names);
  }, []);

  // Event Handlers
  const handleDropdownClick = (e) => {
    const toAdd = e?.target.innerText;
    const copyArray = [...added];
    copyArray.push(toAdd);
    setAdded(copyArray);
    setSearch("");
    setIsFocus(false);
    setPeople(originalPeople);
  };

  const handleDropdownCreate = (searchText) => {
    const copyArray = [...added];
    copyArray.push(searchText);
    setAdded(copyArray);
    setSearch("");
    setIsFocus(false);
    setPeople(originalPeople);
  };

  const handleDelete = (deleteIndex) => {
    setAdded(added.filter((name, index) => index !== deleteIndex));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search !== "") {
      handleDropdownCreate(search);
      e.preventDefault();
      setIsFocus(true);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    const filteredPeople = originalPeople.filter((person) => {
      return person.startsWith(e.target.value);
    });
    setPeople(filteredPeople);
  };

  return (
    <>
      <div className="Search-container">
        <TransitionGroup className="Search-transition-container">
          {added.map((name, index) => {
            return (
              <CSSTransition
                key={`added-${name}-${index}`}
                classNames="Added"
                timeout={300}
              >
                <div className="Search-added">
                  <p>{name} </p>
                  <button
                    className="Search-delete"
                    onClick={() => handleDelete(index)}
                  >
                    &times;
                  </button>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <div style={{ width: "100%", padding: "0 5px" }}>
          <textarea
            id="search-field"
            className="Search-input"
            value={search}
            placeholder="&#43; Add tag"
            onFocus={() => setIsFocus(true)}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
            <CSSTransition
              in={isFocus}
              timeout={150}
              classNames="Matches-animate"
              unmountOnExit
            >
              <div>
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
              </div>
            </CSSTransition>
        </div>
      </div>
    </>
  );
}
