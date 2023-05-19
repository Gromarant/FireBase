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

//---> 1 exercise
//Print into DOM
const printContact = (name, email, message='Mensaje: ', image='https://cdn-icons-png.flaticon.com/512/3135/3135715.png') => {
  const list = document.querySelector('.contactsList');
  list.innerHTML += `<article>
                      <img src="${image}" alt="${name}">
                      <section>
                        <h2>${name}</h2>
                        <p>${email}</p>
                        <p>${message}</p>
                      </section>
                      <button class="takeOff">Quitar</button>
                    </article>`
}

// Create contact
const createContact = (contact) => {
  db.collection('contacts')
    .add(contact)
    .then(contact => console.log(contact.id))
    .catch(error => console.error("Error adding document: ", error))
}

//leer contactos
const readAllContacts = () => {
  db.collection('contacts')
    .get()
    .then(contactList => {
      contactList.forEach(contact => {
        printContact(contact.data().name, contact.data().email, contact.data().message, contact.data().image);
      })
    })
    .catch(error => {
      console.log("Error getting contacts:", error);
    });
};
document.querySelector('.showContactsBtn').addEventListener('click', readAllContacts);

const handleSubmit = (e) => {
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
}
document.querySelector("#contactForm").addEventListener("submit", handleSubmit);