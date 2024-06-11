import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, updateDoc, query, where} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDlOopmKjyphFgnqpCAGvv0LSDC3fuRuvY",
    authDomain: "mylp-8d3b8.firebaseapp.com",
    projectId: "mylp-8d3b8",
    storageBucket: "mylp-8d3b8.appspot.com",
    messagingSenderId: "335266112018",
    appId: "1:335266112018:web:063fe0f599672f7ddaeecb"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const anadir = async (form) => {
  try {
    const q = query(collection(db, 'deckList'), where("codigo", "==", form.codigo));
  
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      await addDoc(collection(db, 'deckList'), form);
      return true;
    } else {
      return false;
    }
  } catch(error) {
    console.log(error)
  }
}

export const dato = (data) => {
    onSnapshot(collection(db, 'deckList'), data)
  }
export const eliminar = (id) => {
    deleteDoc(doc(db, 'deckList', id))
}
export const aña = (id) => {
    return getDoc(doc(db, 'deckList', id))
}
export const actu = (id, data) => {
    updateDoc(doc(db, 'deckList', id), data)
}
