import React, { useState, useEffect } from 'react';
const axios = require('axios');

function Synonyms(props) {
  if (!props.pr_synonyms) {
    return null
  }

  return (
    <React.Fragment>
      <p>Synonyms:</p>
      {props.pr_synonyms.map((item, index) =>
        <span key={index}>
          {JSON.stringify(item)}
        </span>
      )}
    </React.Fragment>
  );
}

function Definitions(props) {
  const content = props.pr_definitions.map((item, index) =>
    <div key={index}>
      <span>{JSON.stringify(item.definition)}</span>
      <Synonyms pr_synonyms={item.synonyms} />
    </div>
  );

  return (
    <React.Fragment>
      <p>Definitions:</p>
      {content}
    </React.Fragment>
  );
}

function Meanings(props) {
  const content = props.pr_meanings.map((item, index) =>
    <div key={index}>
      <span>{JSON.stringify(item.partOfSpeech)}</span>
      <Definitions pr_definitions={item.definitions} />
    </div>
  );

  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  );
}

function Results(props) {
  const content = props.pr_results.map((item, index) =>
    <div key={index}>
      <Meanings pr_meanings={item.meanings} />
    </div>
  );

  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  );
}

function App() {
  const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  // 1. Use the name state variable
  const [st_currentWord, setCurrentWord] = useState("");
  const [st_definitions, setCurrentDefinitions] = useState([]);

  function getMeaning(word) {
    axios.get(apiUrl + word)
      .then(function (response) {
        console.log(response.data);
        setCurrentDefinitions(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
  }

  return (
    <div>
      <Results pr_results={st_definitions} />
      <input type="text" value={st_currentWord} onChange={(e) => setCurrentWord(e.target.value)} />
      <button onClick={() => getMeaning(st_currentWord)}>Get Meaning</button>
    </div>
  );
}

export default App;