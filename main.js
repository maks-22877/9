const contactForm = document.getElementById('contactForm');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const saveContactBtn = document.getElementById('saveContactBtn');
const contactList = document.getElementById('contactList');

let editIndex = null;
let contacts = JSON.parse(localStorage.getItem('user_contacts')) || [];

function saveAndRenderContacts() {
  localStorage.setItem('user_contacts', JSON.stringify(contacts));
  renderContacts();
}

function renderContacts() {
  contactList.innerHTML = '';

  contacts.forEach((contact, index) => {
    const li = document.createElement('li');

    const infoDiv = document.createElement('div');
    infoDiv.style.lineHeight = '1.4';
    infoDiv.innerHTML = `
      <strong>${contact.firstName} ${contact.lastName}</strong><br>
      📞 ${contact.phone}<br>
      ✉️ ${contact.email}
    `;

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Змінити';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => {
      firstNameInput.value = contact.firstName;
      lastNameInput.value = contact.lastName;
      phoneInput.value = contact.phone;
      emailInput.value = contact.email;
      editIndex = index;
      saveContactBtn.textContent = 'Зберегти';
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = () => {
      contacts.splice(index, 1);
      if (editIndex === index) {
        resetForm();
      }
      saveAndRenderContacts();
    };

    actionsDiv.append(editBtn, deleteBtn);
    li.append(infoDiv, actionsDiv);
    contactList.appendChild(li);
  });
}

function resetForm() {
  contactForm.reset();
  editIndex = null;
  saveContactBtn.textContent = 'Додати';
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newContact = {
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    phone: phoneInput.value.trim(),
    email: emailInput.value.trim(),
  };

  if (editIndex !== null) {
    contacts[editIndex] = newContact;
  } else {
    contacts.push(newContact);
  }

  resetForm();
  saveAndRenderContacts();
});

renderContacts();