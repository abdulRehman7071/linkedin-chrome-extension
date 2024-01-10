import React, { useState, useEffect } from "react";
import Generator from "./components/Generator";
import Profile from "./components/Profile";
import { loadData } from "./utils/localStorage";

function App() {
  const [activePage, setActivePage] = useState("Generator");
  const [resume, setResume] = useState("");
  const [openAiKey, setOpenAiKey] = useState("");

  useEffect(() => {
    const fetchLocalData = async () => {
      const fetchedResume = await loadData("resume");
      const fetchedOpenAiKey = await loadData("openAiKey");

      setResume(fetchedResume);
      setOpenAiKey(fetchedOpenAiKey);
    };
    fetchLocalData();
  }, []);

  const togglePage = (page) => {
    setActivePage(page);
  };
  return (
    <>
      {activePage === "Generator" ? (
        <Generator
          togglePage={togglePage}
          resume={resume}
          openAiKey={openAiKey}
        />
      ) : (
        <Profile
          togglePage={togglePage}
          resume={resume}
          setResume={setResume}
          openAiKey={openAiKey}
          setOpenAiKey={setOpenAiKey}
        />
      )}
    </>
  );
}

export default App;
