import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyB4ylpaWPqXk0e2tstbt2MGqQjvwzk5BTo",
  authDomain: "mmp-dbms.firebaseapp.com",
  projectId: "mmp-dbms",
  storageBucket: "mmp-dbms.appspot.com",
  messagingSenderId: "345354777994",
  appId: "1:345354777994:web:b4a580d7c8364dba608473"
};

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  
  export { storage, ref, uploadBytes, getDownloadURL };