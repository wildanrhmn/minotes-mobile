import { firestore } from "./firebase";

export async function getNotes(uid) {
  try {
    const querySnapshot = await firestore()
      .collection("notes")
      .where("creator", "==", uid)
      .get();

    const notes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return notes;
  } catch (error) {
    console.log(error);
    return [];
  }
}
