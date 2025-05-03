import { db } from '../firebase';  // Import konfigurace Firebase
import { doc, getDoc, setDoc, writeBatch } from 'firebase/firestore';

/**
 * Check if date is already in Firestore and add it if not
 * @param {Array} dates - Array of objects containing Friday and Saturday dates
 */
export const addDatesToFirestore = async (dates) => {
  try {
    // create a batch to perform multiple writes
    const batch = writeBatch(db);

    for (const { friday, saturday } of dates) {
      // check if the date already exists in Firestore
      const fridayDocRef = doc(db, 'dates', friday);
      const fridayDocSnap = await getDoc(fridayDocRef);
      
      if (!fridayDocSnap.exists()) {
        batch.set(fridayDocRef, {
          date: friday,
          attendance: {}
        });
        console.log(`Přidán pátek: ${friday}`);
      } else {
        console.log(`Pátek ${friday} již existuje.`);
      }

      const saturdayDocRef = doc(db, 'dates', saturday);
      const saturdayDocSnap = await getDoc(saturdayDocRef);

      if (!saturdayDocSnap.exists()) {
        batch.set(saturdayDocRef, {
          date: saturday,
          attendance: {}
        });
        console.log(`Přidána sobota: ${saturday}`);
      } else {
        console.log(`Sobota ${saturday} již existuje.`);
      }
    }

    // commit the batch
    await batch.commit();
    console.log('Termíny byly úspěšně přidány do Firestore!');
  } catch (error) {
    console.error("Chyba při přidávání termínů: ", error);
  }
};
