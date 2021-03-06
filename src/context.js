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

// =================================================================

const AppProvider = ({ children }) => {
   // setup waiting before the question
   // Todo setup form to enter
   const [waiting, setWaiting] = useState(true);
   const [loading, setLoading] = useState(false);
   const [index, setIndex] = useState(0);
   const [questions, setQuestions] = useState([]);
   //  ! Show correct answer number
   const [correct, setCorrect] = useState(0);
   // ! if failed to fetch display error
   const [error, setError] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   // !Set quiz  input
   const [quiz, setQuiz] = useState({
      amount: 10,
      category: 'sports',
      difficulty: 'easy',
   });
   // todo FETCH 🟢
   const fetchQuestion = async (url) => {
      setLoading(true);
      setWaiting(false);
      const response = await axios(url).catch((error) => {
         console.log(error);
      });
      if (response) {
         const data = response.data.results;
         // ! If data.length is bigger than 0 that means there is question to load

         if (data.length > 0) {
            //  👇have to place first
            setQuestions(data); // pass the data into question
            setLoading(false);
            setWaiting(false);
            setError(false); //whipe error
         } else {
            //  ! If data.length is smaller than 0
            setError(true);
            setWaiting(true);
         }
      } else {
         setWaiting(true);
      }
   };
   const setNextQuestion = () => {
      setIndex((oldIndex) => {
         const index = oldIndex + 1;
         if (index > questions.length - 1) {
            //  once end of the question openModal
            openModal();
            return 0;
         } else {
            return index;
         }
      });
   };
   //  checkanswer
   const checkAnswer = (value) => {
      if (value) {
         setCorrect((oldState) => oldState + 1);
         //  jump right to the next question
      }
      setNextQuestion();
   };
   const openModal = () => {
      setIsModalOpen(true);
   };
   const closeModal = () => {
      // show the form after closeModal
      setWaiting(true);
      setCorrect(0);
      setIsModalOpen(false);
   };
   const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      // return old quiz and just change
      setQuiz({ ...quiz, [name]: value });
   };
   // After submitting the form change url and get new API
   const handleSubmit = (e) => {
      e.preventDefault();

      const { amount, category, difficulty } = quiz;
      const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${category} &category=${table[category]}&type=multiple`;
      fetchQuestion(url);
   };

   //  =================================================================
   return (
      <AppContext.Provider
         value={{
            waiting,
            loading,
            index,
            questions,
            correct,
            error,
            setNextQuestion,
            checkAnswer,
            closeModal,
            isModalOpen,
            quiz,
            handleChange,
            handleSubmit,
         }}
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
