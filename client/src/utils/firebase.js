import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAtYv1AdEgs5EOFLhaPAccDiF9hGLocJZs',
  authDomain: 'ecommerce-mern-ded3f.firebaseapp.com',
  databaseURL: 'https://ecommerce-mern-ded3f.firebaseio.com',
  projectId: 'ecommerce-mern-ded3f',
  storageBucket: 'ecommerce-mern-ded3f.appspot.com',
  messagingSenderId: '731621646987',
  appId: '1:731621646987:web:e6390014dd78bd2f2e6a8e'
};

firebase.initializeApp(firebaseConfig);
