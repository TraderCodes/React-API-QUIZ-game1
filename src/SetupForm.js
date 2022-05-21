import React from 'react';
import { useGlobalContext } from './context';

const SetupForm = () => {
   const { quiz, handleSubmit, handleChange, error } = useGlobalContext();

   return (
      <main>
         <section className="quiz quiz-main">
            <form className="setup-form">
               <h2>setup quiz</h2>
               <div className="form-control">
                  <label htmlFor="amount">Number of question</label>
                  <input
                     type="number"
                     name="amount"
                     id="amount"
                     value={quiz.amount}
                     onChange={handleChange}
                     className="form-input"
                     //  change number min max
                     min={1}
                     max={50}
                  />
               </div>

               {/* category */}
               <div className="form-control">
                  <label htmlFor="category"> Category</label>
                  <select
                     name="category"
                     id="category"
                     className="form-input"
                     value={quiz.category}
                     onChange={handleChange}
                  >
                     <option value="sports">sports</option>
                     <option value="history">history</option>
                     <option value="politics">politics</option>
                  </select>
               </div>
               <div className="form-control">
                  <label htmlFor="difficulty"> Pick difficulty</label>
                  <select
                     name="difficulty"
                     id="difficulty"
                     className="form-input"
                     value={quiz.difficulty}
                     onChange={handleChange}
                  >
                     <option value="easy">easy</option>
                     <option value="hard">hard</option>
                     <option value="medium">medium</option>
                  </select>
               </div>

               {error && (
                  <p className="error">
                     Can't generate questions, try differnt option
                  </p>
               )}
               {/* submit button */}
               <button
                  type="submit"
                  className="submit-btn"
                  onClick={handleSubmit}
               >
                  Submit
               </button>
            </form>
         </section>
      </main>
   );
};

export default SetupForm;
