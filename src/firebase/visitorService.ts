import { doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { db } from './config';

export const incrementVisitorCount = async (): Promise<number> => {
  try {
    const counterRef = doc(db, 'analytics', 'visitor_count');
    const docSnap = await getDoc(counterRef);

    if (!docSnap.exists()) {
      await setDoc(counterRef, { count: 1 });
      return 1;
    } else {
      await setDoc(counterRef, { count: increment(1) }, { merge: true });
      const updatedSnap = await getDoc(counterRef);
      return updatedSnap.data()?.count || 1;
    }
  } catch (error) {
    console.warn('Firebase visitor counter fallback active:', error);
    return 142; // Fallback display count if Firebase keys not configured
  }
};
