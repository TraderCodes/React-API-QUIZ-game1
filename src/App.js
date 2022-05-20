import React from 'react';
import { useGlobalContext } from './context';

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';
function App() {
   const { waiting, loading, question, correct, index } = useGlobalContext();
   // 👇when waiting return form for user to enter
   if (waiting) {
      return <SetupForm />;
   }
   if (loading) {
      return <Loading />;
   }
   //  if is not loading or waiting show 🟢quiz app
   return <main> quiz app</main>;
}

export default App;
