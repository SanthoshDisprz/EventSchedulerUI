import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Scheduler from "./Views/Scheduler";
const App = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [canShowSearchResults, setCanShowSearchResults] = useState(false);
  const handleSearchTitle = (title) => {
    setSearchTitle(title);
  };
  const closeSearch=()=>{
    setSearchTitle("")
  }
  const handleSearchResults = (bool) => {
    setCanShowSearchResults(bool);
  };
  return (
    <>
      <Header searchTitle={searchTitle} handleSearchTitle={handleSearchTitle} onSearch={handleSearchResults} onClose={closeSearch}/>
      <Scheduler canShowSearchResults={canShowSearchResults} searchTitle={searchTitle} handleSearchResults={handleSearchResults}/>
    </>
  );
};

export default App;
