import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';

const table = {
   sports: 21,
   history: 23,
   politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const url = '';
const tempUrl =
   'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
   // setup waiting before the question
   // Todo setup form to enter
   const [waiting, setWaiting] = useState(false);
   const [loading, setLoading] = useState(false);
   const [index, setIndex] = useState(0);
   const [question, setQuestion] = useState([]);
  //  ! Show correct answer number
   const [correct, setCorrect] = useState(0);
  // ! if failed to fetch display error
   const [error, setError] = useState(false);
   return (
      <AppContext.Provider
         value={{ waiting, loading, index, question, correct, error }}
      >
         {children}
      </AppContext.Provider>
   );
};
// make sure use
export const useGlobalContext = () => {
   return useContext(AppContext);
};

export { AppContext, AppProvider };
