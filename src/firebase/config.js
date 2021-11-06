import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB5uIpNpcFVV-RHDGaKekCPOdNGi8upzP4",
    authDomain: "bubl-a72c1.firebaseapp.com",
    databaseURL: "https://bubl-a72c1.firebaseio.com",
    projectId: "bubl-a72c1",
    storageBucket: "bubl-a72c1.appspot.com",
    messagingSenderId: "1007212790236",
    appId: "1:1007212790236:web:fd8e90e20e3e194f0c8f19",
  };
  
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();
  const firestore = firebase.firestore()
  export{firebase}
  export { auth };
  export { firestore };
  
  