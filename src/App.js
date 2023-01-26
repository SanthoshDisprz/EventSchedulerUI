import { useState } from "react";
import "./App.css";
import Header from "./Views/Header/Header";
import Scheduler from "./Views/Scheduler/Scheduler";
const App = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [canShowSearchResults, setCanShowSearchResults] = useState(false);
  const handleSearchTitle = (title) => {
    setSearchTitle(title);
  };
  const handleSearchResults = (bool) => {
    setCanShowSearchResults(bool);
  };
  return (
    <>
      <Header searchTitle={searchTitle} handleSearchTitle={handleSearchTitle} onSearch={handleSearchResults}/>
      <Scheduler canShowSearchResults={canShowSearchResults} searchTitle={searchTitle} handleSearchResults={handleSearchResults}/>
    </>
  );
};

export default App;
