function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

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
}

// close modal event
modalCloseBtn.addEventListener('click', closeModal)

// close modal form
function closeModal() {
  modalbg.style.display = 'none'
}

// FORM VALIDATION //

//firstName validation
// const firstName = document.querySelector('#first')
// firstName.addEventListener('blur', () => {
//   if (firstName.value < 2) {
//     alert('Vous devez indiquer un prénom valide.')
//     // firstName.focus()
//     //FIXME message d'alert en boucle?
//   }
// })

//TODO existe-t-il une façon simple d'avoir le focus à ouverture modale (accessibilité)?

function errorMessage(id, message) {
  let error = document.getElementById(id)
  error.textContent = message
  error.style.color = 'red'
  error.style.fontSize = '1rem'
  //TODO switch avec les messages?
}

const validate = () => {
  //firstName validation
  const firstName = document.querySelector('#first')
  if (firstName.value.length < 2) {
    //FIXME message par défaut affiché pour 1 caractère...
    errorMessage('first-error', 'Vous devez indiquer un prénom valide.')
    firstName.focus()
    return false
  } else {
    errorMessage('first-error', '')
  }

  //lastName validation
  const lastName = document.querySelector('#last')
  if (lastName.value.length < 2) {
    errorMessage('last-error', 'Vous devez indiquer un nom valide.')
    lastName.focus()
    return false
  } else {
    errorMessage('last-error', '')
  }

  //email validation
  const email = document.querySelector('#email')
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    //FIXME ou pattern en attribut html?
    errorMessage('email-error', 'Vous devez indiquer une adresse mail valide.')
    email.focus()
    return false
  } else {
    errorMessage('email-error', '')
  }

  //birthdate validation
  const birthDate = document.querySelector('#birthdate')
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
  const quantity = document.querySelector('#quantity')
  if (!quantity.value) {
    errorMessage('quantity-error', 'Vous devez indiquer un nombre valide.')
    quantity.focus()
    return false
  } else {
    errorMessage('quantity-error', '')
  }

  //Location validation
  let selectedLocation
  document.querySelectorAll('input[name="location"]').forEach(location => {
    if (location.checked) {
      return (selectedLocation = location.value)
    }
  })
  if (!selectedLocation) {
    errorMessage('location-error', 'Vous devez indiquer un lieu.')
    return false
  } else {
    errorMessage('location-error', '')
  }

  //CGU validation
  const cgu = document.querySelector('#checkbox1')
  if (!cgu.checked) {
    errorMessage(
      'CGU-error',
      "Vous devez accepter les conditions d 'utilisation."
    )
    return false
  } else {
    errorMessage('CGU-error', '')
  }
  //FIXME conserve les données du formulaire par défaut...

  //validation successful
  return true
}
