// Inicializaar app Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDClutGFp5IVwNmQRDwAKbzusCYLUwqdCQ",
  authDomain: "form-firebase-309e2.firebaseapp.com",
  projectId: "form-firebase-309e2",
  storageBucket: "form-firebase-309e2.appspot.com",
  messagingSenderId: "60445545666",
  appId: "1:60445545666:web:01019366effcd19f33575b"
};
firebase.initializeApp(firebaseConfig); //inicia Firestore (firestorei init)
const db = firebase.firestore(); //inicia data base (DDBB init)


//Registrar contacto en firestore
const createContact = (contact) => {
  db.collection('contacts')
    .add(contact)
    .then(contact => contact.id)
    .catch(error => console.error("Error adding document: ", error))
}

//Obtener datos de contacto
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

//Print into DOM
const printContact = (id, name, email, message='Mensaje: ', image='https://media.istockphoto.com/id/1130884625/es/vector/icono-de-vector-de-miembro-de-usuario-para-interfaz-de-usuario-ui-o-perfil-cara-aplicaci%C3%B3n.jpg?s=612x612&w=0&k=20&c=ilhyDyzPONgmDcwiEcxnd17M0NHt-4PlrQQ55VxVQmw=') => {
  const list = document.querySelector('.contactsList');
  const article = document.createElement('article');
  const contactImage = document.createElement('img');
  contactImage.className = 'contactImg'
  contactImage.src = image

  const contactInfo = document.createElement('section');
  const contactName = document.createElement('h2');
  contactName.textContent = name;

  const contactEmail = document.createElement('p');
  contactEmail.textContent = email;

  const contactMessage = document.createElement('p');
  contactMessage.textContent = message;

  const removebutton = document.createElement('button');
  removebutton.textContent = 'Borrar';
  removebutton.className = 'btn';
  removebutton.setAttribute('id', id);
  removebutton.addEventListener('click', removeContact); //escucha de evento

  list.append(article, contactInfo);
  article.append(contactImage, contactInfo, removebutton);
  contactInfo.append(contactName, contactEmail);
}

//leer contactos
const readAllContacts = () => {
  db.collection('contacts')
    .get()
    .then(contactList => {
      contactList.forEach(contact => {
        printContact(contact.id, contact.data().name, contact.data().email, contact.data().message, contact.data().image);
      })
    })
    .catch(error => {
      console.log("Error getting contacts:", error);
    });
};

//Borrar un contacto
const removeContact = (e) => {
  db.collection('contacts')
    .doc(e.target.id)
    .delete()
    .then(() => {
      e.target.remove() //Borra btn
      document.querySelector('.contactsList').innerHTML = ""; //Borra lista
      readAllContacts(); //lee y pinta de nuevo
    })
    .catch(() => console.log('Error borrando el contacto'));
}

//Obtener id de contactos
const removeContactById = (id) => {
  db.collection('contacts')
    .doc(id)
    .delete()
    .then(() => {
      document.querySelector('.contactsList').innerHTML = ""; //Borra lista
      readAllContacts(); //lee y pinta de nuevo
    })
    .catch(() => console.log('Error borrando el contacto'));
}

//Borrar todos los contactos
const removeAllContacts = () => {
  db.collection('contacts')
    .get()
    .then(contactList => {
      contactList.forEach(contact => {
        removeContactById(contact.id);
      })
    })
    .catch(error => {
      console.log("Error getting contacts:", error);
    });
};

//eventos
document.querySelector("#contactForm").addEventListener("submit", handleSubmit);
document.querySelector('.showAllContactsBtn').addEventListener('click', readAllContacts);
document.querySelector('.hideAllContactsBtn').addEventListener('click', () => document.querySelector('.contactsList').innerHTML = '');
document.querySelector('.removeAllContactsBtn').addEventListener('click', removeAllContacts);