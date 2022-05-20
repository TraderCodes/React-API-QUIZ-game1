import React from 'react';
import { useGlobalContext } from './context';

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';
function App() {
   const { waiting, loading, questions, correct, index } = useGlobalContext();
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
   const answers = [...incorrect_answers, correct_answer];
   console.log(answers);
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
                        <button key={index} className="answer-btn">
                           {answer}
                        </button>
                     );
                  })}
               </div>
            </article>
            {/*🟢 Next question button */}
            <button className="next-question">Next</button>
         </section>
      </main>
   );
}

export default App;
