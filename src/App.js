import { db, collection, addDoc, getDocs, query, where } from './firebase'; 

function App() {
  const addData = async () => {
    try {
      const q = query(collection(db, 'users'), where('name', '==', 'Anča'));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        alert('Anča již existuje v databázi!');
        return;
      }
  
      await addDoc(collection(db, 'users'), {
        name: "Anča",
      });
      alert('Anča přidána!');
    } catch (error) {
      console.error("Chyba při přidávání dat: ", error);
    }
  };

  return (
    <>
      <h1>It works</h1>
      <button onClick={addData}>Přidat data</button>
    </>
  );
}

export default App;
