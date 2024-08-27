import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, getDocs, addDoc,
    deleteDoc, doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyALsn_CM0Wo2igk2-H7D_iKSWZzoAZThQY",
    authDomain: "quantombot-core.firebaseapp.com",
    projectId: "quantombot-core",
    storageBucket: "quantombot-core.appspot.com",
    messagingSenderId: "874884564779",
    appId: "1:874884564779:web:126c66da28376d7eba276e",
    measurementId: "G-2N8FQVPMTF"
  }

  // init firebase app
  initializeApp(firebaseConfig)

  // init services
  const db = getFirestore()

  // collection ref
  const colRef = collection(db, 'box')

  // get collection data

//   getDocs(colRef)
//   .then ((snapshot) => {
//     console.log(snapshot.docs)
//   })

getDocs(colRef)
.then((snapshot) => {
    let books = []
    snapshot.docs.forEach(doc => {
        books.push({ ...doc.data(), id: doc.id})
    })
    console.log (books)
})
.catch((error) => {
    console.error('Error fetching documents:', error);
});

// adding documents

const addBookFrom = document.querySelector('.add')
addBookFrom.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookFrom.title.value,
        author: addBookFrom.author.value, 
    })
    .then(() => {
        addBookFrom.reset()
    })

})

// deleting documents

const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'box', deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })

})

const admin = require ("firebase-admin");
admin.initializeApp();

// Import the functioin from the specific file 
const {addMessage} = require('./api/addMessage');

//Export the function for deployment
exports.addMessage = addMessage;