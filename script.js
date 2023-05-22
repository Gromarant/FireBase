// Inicializaar app Firebase
const firebaseConfig = {
 //YOUR CONFIG OBJECT HERE
};
firebase.initializeApp(firebaseConfig); //inicia Firestore (firestorei init)
const db = firebase.firestore(); //inicia data base (DDBB init)


//Registrar contacto en firestore (add contact into firestore)
const createContact = (contact) => {
  db.collection('contacts')
    .add(contact)
    .then(contact => contact.id)
    .catch(error => console.error("Error adding document: ", error))
}

//Agregar mensaje de error (add error message)
const setErrorMessage = (errorMessage) =>
Swal.fire({
  icon: 'error',
  title: 'Error',
  text: errorMessage,
  footer: '<a href="">Why do I have this issue?</a>'
})


//validations patterns
const nameValidation = /^[a-zA-Z]{2,20}$/;
const emailValidation = /^\w+([*@\/hotmail\/gmail([\.-]?\w+)*(\.\w{2,4})$/;

//Validation Functions
const checkEmail = (contactEmail) => emailValidation.test(contactEmail);
const checkName = (contactName) => nameValidation.test(contactName);

//limpiar los valores de los inputs
const cleanInputsValue = (e) => {
  e.target.name.value = '';
  e.target.email.value = '';
  e.target.message.value = '';
  e.target.image.value = '';
}

//Obtener datos de contacto (get contact data)
const handleSubmit = (e) => {
  e.preventDefault();
  let name = e.target.name.value;
  let email = e.target.email.value;
  let message = e.target.message.value;
  let image = e.target.image.value;
  
  //Validación del formulario (validation form)
  let errorMessage = '';
  let validated = true;

  
  if(!checkName(name)) {
    validated = false;
    errorMessage += '* Nombre: debe tener un mínimo de 3 letras';
    cleanInputsValue(e);
  } 
  
  if (!checkName) {
    errorMessage  += '* Nombre: debe tener al menos 2 caracteres, no contener números, caracteres especiales o espacios y tener un máximo de 20 caracteres';
    cleanInputsValue(e);
  }
  else if (!checkEmail) {
    errorMessage += '* Email: no admite caracteres especiales';
    cleanInputsValue(e);
  }
  else if (message.length > 280) {
    validated = false;
    errorMessage += '* Mensaje: muy largo, debe ser de máximo 280 caracteres';
    cleanInputsValue(e);
  }
  
  if (!image) {
    image = '/assets/images/defaultSAvatar.jpg';
  }

  if (validated) {
    createContact({name, email, message, image});
    cleanInputsValue(e);
  } 
  else {
    setErrorMessage(errorMessage);
  }
}

//Pintar en el DOM (Print into DOM)
const printContact = (id, name, email, message='Mensaje: ', image='/assets/images/defaultSAvatar.jpg') => {
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

  removebutton.addEventListener('click', removeContact); //escucha de evento (listener of event)

  list.append(article, contactInfo);
  article.append(contactImage, contactInfo, removebutton);
  contactInfo.append(contactName, contactEmail);
}

//leer contactos (read contacts)
const readAllContacts = () => {
  db.collection('contacts')
    .get()
    .then(contactList => {
      cleanContactList(); //Borra lista (remove list)
      contactList.forEach(contact => {
          printContact(contact.id, contact.data().name, contact.data().email, contact.data().message, contact.data().image);
      })
    })
    .catch(error => {
      console.log("Error getting contacts:", error);
    });
};

//limpiar lista de contactos
const cleanContactList = () => document.querySelector('.contactsList').innerHTML = "";
//Borrar un contacto (remove a contact)
const removeContact = (e) => {
  db.collection('contacts')
    .doc(e.target.id)
    .delete()
    .then(() => {
      e.target.remove(); //Borra btn (remove btn)
      cleanContactList(); //Borra lista (remode list)
      readAllContacts(); //lee y pinta de nuevo
    })
    .catch(() => console.log('Error borrando el contacto'));
}

//Obtener id de contactos (get contacts id)
const removeContactById = (id) => {
  db.collection('contacts')
    .doc(id)
    .delete()
    .then(() => {
      cleanContactList(); //Borra lista (remove list)
      readAllContacts(); //lee y pinta de nuevo
    })
    .catch(() => console.log('Error borrando el contacto'));
}

//Borrar todos los contactos (remove all contacts from firestore)
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

//eventos (events call)
document.querySelector("#contactForm").addEventListener("submit", handleSubmit);
document.querySelector('.showAllContactsBtn').addEventListener('click', readAllContacts);
document.querySelector('.hideAllContactsBtn').addEventListener('click', () => document.querySelector('.contactsList').innerHTML = '');
document.querySelector('.removeAllContactsBtn').addEventListener('click', removeAllContacts);