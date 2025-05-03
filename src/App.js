import { useEffect } from 'react';
import { db, collection, addDoc, getDocs, query, where } from './firebase'; 
import { getNextDays } from './utils/dateFunctions';
import { addDatesToFirestore } from './services/firebaseService';

function App() {

  // generate Fridays and Saturdays and check if they exist in Firestore
  useEffect(() => {
    const terminy = getNextDays();
    addDatesToFirestore(terminy);
  }, []); 

  return (
    <>
      <h1>It works</h1>
      <p>Check the console for results.</p>
    </>
  );
}

export default App;
