import SearchTag from "./components/searchTag/searchTag";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SearchTag />
        <h2 style={{marginBottom: 10}}>Custom Tag Bar Component</h2>
        <p className="App-authortext"><i>by Alexander Stiles</i></p>
        <p className="App-subtext">
          Matches given{" "}
          <a
            style={{color: 'white'}}
            href="https://dribbble.com/shots/16941063-Crew-work-Add-tag"
            target="_blank"
            rel="noopener noreferrer"
          >
            design.
          </a>
          <br /><br />
          A couple of assumptions/cases handled:
          </p>
          <ul className="App-subtext" style={{ textAlign: "left" }}>
            <li>Pressing the 'Enter' key can also create tags</li>
            <li>Adding enough tags leads to a horizontal scroll bar</li>
          </ul>
          <p className="App-subtext">
          ****
          <br /><br />
          I hope you enjoy it!
        </p>
      </header>
    </div>
  );
}

export default App;
