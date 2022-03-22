function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}
//TODO faire un return (condition) dans les tests validation...

// DOM Elements
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
const modalCloseBtn = document.querySelector('.close')
const formData = document.querySelectorAll('.formData')

const confirmModalbg = document.querySelector('.bground__confirm')
const confirmModalBtn = document.querySelector('.btn-submit')
const confirmModalCloseBtn = document.querySelector('.btn-close')

// launch modal form event
modalBtn.forEach(btn => btn.addEventListener('click', launchModal))

// launch confirmation modal event
confirmModalBtn.addEventListener('click', launchConfirmModal)

// launch modal form
function launchModal() {
  modalbg.style.display = 'block'
  document.getElementById('first').focus()
}

//launch confirmation modal
function launchConfirmModal() {
  confirmModalbg.style.display = 'block'
}

// close modal form event //FIXME
modalCloseBtn.addEventListener('click', closeModal)

// close confirmation modal event
confirmModalCloseBtn.addEventListener('click', closeConfirmModal)

// close modal form
function closeModal() {
  modalbg.style.display = 'none'
}

// close confirm modal
function closeConfirmModal() {
  confirmModalbg.style.display = 'none'
}

// FONCTION MESSAGE D'ERREUR:
const errorMessage = (id, message) => {
  const error = document.getElementById(`${id}-error`)
  error.textContent = message
  // if (id !== 'location' || id !== 'CGU') document.getElementById(id).classList.add('error')
  id !== 'location' &&
    id !== 'CGU' &&
    document.getElementById(id).classList.add('error')
}

// FORM VALIDATION FUNCTION
const validate = e => {
  e.preventDefault()

  // FIRSTNAME VALIDATION:
  const firstName = document.getElementById('first')
  if (firstName.value.length < 2) {
    //TODO ajouter validation regex (a/9/_/-/./é)
    errorMessage('first', 'Vous devez indiquer un prénom valide.')
    firstName.focus()
    return
  } else {
    errorMessage('first', '')
  }

  // LASTNAME VALIDATION:
  const lastName = document.getElementById('last')
  if (lastName.value.length < 2) {
    errorMessage('last', 'Vous devez indiquer un nom valide.')
    lastName.focus()
    return
  } else {
    errorMessage('last', '')
  }

  // EMAIL VALIDATION:
  const email = document.getElementById('email')
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    errorMessage('email', 'Vous devez indiquer une adresse mail valide.')
    email.focus()
    return
  } else {
    errorMessage('email', '')
  }

  // BIRTHDATE VALIDATION:
  const birthDate = document.getElementById('birthdate')
  if (!birthDate.value) {
    errorMessage('birthdate', 'Vous devez indiquer une date de naissance.')
    birthDate.focus()
    return
  } else {
    errorMessage('birthdate', '')
  }

  // QUANTITY VALIDATION:
  const quantity = document.getElementById('quantity')
  if (!quantity.value) {
    errorMessage('quantity', 'Vous devez indiquer un nombre valide.')
    quantity.focus()
    return
  } else {
    errorMessage('quantity', '')
  }

  // LOCATION VALIDATION:
  if (
    //FIXME pas satisfaisant de passer par un tableau, car un seul radio selectionnable...
    document.querySelectorAll('input[name="location"]:checked').length === 0
  ) {
    errorMessage('location', 'Vous devez indiquer un lieu.')
    return
  } else {
    errorMessage('location', '')
  }

  // CGU VALIDATION:
  const cgu = document.getElementById('checkbox1')
  if (!cgu.checked) {
    errorMessage('CGU', "Vous devez accepter les conditions d 'utilisation.")
    return
  } else {
    errorMessage('CGU', '')
  }

  // VALIDATION:
  document.querySelectorAll('input:not([type="button"])').forEach(input => {
    input.classList.remove('error')
    input.value = ''
  })
  launchConfirmModal()
  closeModal()
}
