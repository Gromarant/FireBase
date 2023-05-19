// Inicializaar app Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDClutGFp5IVwNmQRDwAKbzusCYLUwqdCQ",
  authDomain: "form-firebase-309e2.firebaseapp.com",
  projectId: "form-firebase-309e2",
  storageBucket: "form-firebase-309e2.appspot.com",
  messagingSenderId: "60445545666",
  appId: "1:60445545666:web:01019366effcd19f33575b"
};
firebase.initializeApp(firebaseConfig); //inicia Firestore
const db = firebase.firestore(); //inicia data base


//read form info *********<<<<<<<
// const validationForm = (e) => {
//   e.preventDefault();

//   let contactName = e.target;
//   let contactEmail = e.target;
//   let contactImage = e.target;
//   let contactMessage = e.target;

//   console.log('contactName', contactName)
//   console.log('contactEmail', contactEmail)
//   console.log('contactImage', contactImage)
//   console.log('contactMessage', contactMessage)
// }
// document.querySelector('#contactForm').addEventListener('submit', validationForm)

// let contact = [
//   {
//     userName:'Mariangelica',
//     userEmail: 'mariangelica0203@gmail.com',
//     userMessage: 'My first message',
//     UserImage: 'https://www.google.com/search?q=imagenes+graciosas&rlz=1C1CHBF_esES930ES930&sxsrf=APwXEdeYSHUOZQQXSiyYedYfOK-eXYwttg:1684478643135&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjMmJ_544D_AhUnVqQEHV-tD-kQ_AUoAXoECAEQAw&biw=1024&bih=497&dpr=1.88#imgrc=cw_wNQ7vSoXGUM',
//   }
// ]

// Create contact
const createContact = (contact) => {
  db.collection('contacts')
    .add(contact)
    .then((docRef) => console.log("Document written with ID: ", docRef.id))
    .catch((error) => console.error("Error adding document: ", error))
}
// createContact(contact);

// createContact(contact);
// //leer todos los contactos
// db.collection("users")
//   .get()
//   .then((querySnapshot) => {
//   querySnapshot.forEach((doc) => console.log(`${doc.id} => ${doc.data()}`));
// });
// //grab info into collection data

// //paint info into DOM

// //validate form

document.querySelector("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let name = e.target.name.value;
  let email = e.target.email.value;
  let message = e.target.message.value;
  let image = e.target.image.value;

  createContact({name, email, message, image}); //Registro de contacto en fireStore
  e.target.name.value = '';
  e.target.email.value = '';
  e.target.message.value = '';
  e.target.image.value = '';
});