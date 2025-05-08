import { useEffect } from 'react';
import { getNextDays } from './utils/dateFunctions';
import { addDatesToFirestore } from './services/firebaseService';
import AttendanceTable from './components/AttendanceTable';

function App() {

  // generate Fridays and Saturdays and check if they exist in Firestore
  useEffect(() => {
    const terminy = getNextDays();
    addDatesToFirestore(terminy);
  }, []); 

  return (
    <>
      <AttendanceTable />
    </>
  );
}

export default App;
