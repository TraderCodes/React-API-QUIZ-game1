import React from 'react';
import { useGlobalContext } from './context';

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';
function App() {
   const {
      waiting,
      loading,
      questions,
      correct,
      index,
      setNextQuestion,
      checkAnswer,
   } = useGlobalContext();
   // 👇when waiting return form for user to enter
   if (waiting) {
      return <SetupForm />;
   }
   if (loading) {
      return <Loading />;
   }
   //  if is not loading or waiting show 🟢quiz app
   console.log(questions);
   const { question, incorrect_answers, correct_answer } = questions[index];
   // const answers = [...incorrect_answers, correct_answer];
   let answers = [...incorrect_answers ];
   // set a random number between 0 and 3
   const tempIndex = Math.floor(Math.random() * 4);

   if (tempIndex === 3) {
      answers.push(correct_answer);
   } else {
      answers.push(answers[tempIndex]);
      answers[tempIndex] = correct_answer;
   }
   return (
      <main>
         <Modal />
         <section className="quiz">
            <p className="correct-answers">
               correct answers : {correct}/{index}
            </p>
            {/* container for questions */}
            <article className="container">
               <h2 dangerouslySetInnerHTML={{ __html: question }} />
               {/* set answers into buttons by looping  */}
               <div className="btn-container">
                  {answers.map((answer, index) => {
                     return (
                        <button
                           key={index}
                           className="answer-btn"
                           onClick={() =>
                              checkAnswer(correct_answer === answer)
                           }
                        >
                           {answer}
                        </button>
                     );
                  })}
               </div>
            </article>
            {/*🟢 Next question button */}
            <button className="next-question" onClick={() => setNextQuestion()}>
               Next
            </button>
         </section>
      </main>
   );
}

export default App;
