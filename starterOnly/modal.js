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

// launch modal event
modalBtn.forEach(btn => btn.addEventListener('click', launchModal))

// launch modal form
function launchModal() {
  modalbg.style.display = 'block'
  document.getElementById('first').focus()
}

// close modal event
modalCloseBtn.addEventListener('click', closeModal)

// close modal form
function closeModal() {
  modalbg.style.display = 'none'
}

//firstName validation
const firstName = document.getElementById('first')
firstName.addEventListener('blur', () => {
  if (firstName.value.length < 2) {
    errorMessage('first-error', 'Vous devez indiquer un prénom valide.')
    firstName.focus()
    return false
  } else {
    errorMessage('first-error', '')
  }
})

//TODO existe-t-il une façon simple d'avoir le focus à ouverture modale (accessibilité)?

//Error message
const errorMessage = (id, message) => {
  const error = document.getElementById(id)
  error.style.cssText = `
  font-size: 1rem;
  color: red
  `
  error.textContent = message
}

// FORM VALIDATION
const validate = e => {
  e.preventDefault()
  //firstName validation
  const firstName = document.getElementById('first')
  firstName.focus()

  if (firstName.value.length < 2) {
    errorMessage('first-error', 'Vous devez indiquer un prénom valide.')
    firstName.focus()
    return false
  } else {
    errorMessage('first-error', '')
  }

  //lastName validation
  const lastName = document.getElementById('last')
  if (lastName.value.length < 2) {
    errorMessage('last-error', 'Vous devez indiquer un nom valide.')
    lastName.focus()
    return false
  } else {
    errorMessage('last-error', '')
  }

  //email validation
  const email = document.getElementById('email')
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    errorMessage('email-error', 'Vous devez indiquer une adresse mail valide.')
    email.focus()
    return false
  } else {
    errorMessage('email-error', '')
  }

  //birthdate validation
  const birthDate = document.getElementById('birthdate')
  if (!birthDate.value) {
    errorMessage(
      'birthdate-error',
      'Vous devez indiquer une date de naissance.'
    )
    birthDate.focus()
    return false
  } else {
    errorMessage('birthdate-error', '')
  }

  //quantity validation
  const quantity = document.getElementById('quantity')
  if (!quantity.value) {
    errorMessage('quantity-error', 'Vous devez indiquer un nombre valide.')
    quantity.focus()
    return false
  } else {
    errorMessage('quantity-error', '')
  }

  //Location validation
  if (
    document.querySelectorAll('input[name="location"]:checked').length === 0
  ) {
    errorMessage('location-error', 'Vous devez indiquer un lieu.')
    return false
  } else {
    errorMessage('location-error', '')
  }

  //CGU validation
  const cgu = document.getElementById('checkbox1')
  if (!cgu.checked) {
    errorMessage(
      'CGU-error',
      "Vous devez accepter les conditions d 'utilisation."
    )
    return false
  } else {
    errorMessage('CGU-error', '')
  }

  //validation successful + confirmation message
  const confirmation = document.getElementById('confirmation-msg')
  confirmation.textContent = 'Merci ! Votre réservation a bien été reçue.'
  confirmation.style.fontSize = '1.2rem'
}
