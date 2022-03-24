function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

// DOM Elements
const modalbg = document.querySelector('#validation')
const modalBtn = document.querySelectorAll('.modal-btn')
const modalCloseBtn = document.querySelector('#validation-close')
const formData = document.querySelectorAll('.formData')

const confirmModalbg = document.querySelector('#confirm')
const confirmModalBtn = document.querySelector('#confirm-btn')
const confirmModalCloseBtn = document.querySelector('#confirm-close')

const refuseModalbg = document.querySelector('#reject')
const refuseModalBtn = document.querySelector('#reject-btn')
const refuseModalCloseBtn = document.getElementById('reject-close')

/**
 * Launch modal modal event:
 * Adding an event listener to the buttons that will open the form modal.
 */
modalBtn.forEach(btn => btn.addEventListener('click', launchModal))

/**
 * close modal modal event:
 * Adding an event listener to the close button that will close the form modal.
 */
modalCloseBtn.addEventListener('click', closeModal) //FIXME
// window.addEventListener('keypress', e => {
//   if (e.key === 'Escape') closeModal
// })

/**
 * close confirmation modal events:
 * Adding an event listener to the main button that will close the confirm modal.
 */
confirmModalBtn.addEventListener('click', closeConfirmModal)
/* Adding an event listener to the close button that will close the confirm modal. */
confirmModalCloseBtn.addEventListener('click', closeConfirmModal)
// window.addEventListener('keypress', e => {
//   if (e.key === 'enter') closeConfirmModal
// })

/**
 * close refuse modal events:
 * Adding an event listener to the main button that will close the refuse modal.
 */
refuseModalBtn.addEventListener('click', closeRefuseModal)
/* Adding an event listener to the close button that will close the refuse modal. */
refuseModalCloseBtn.addEventListener('click', closeRefuseModal)
// refuseModalbg.addEventListener('keypress', e => {
//   if (e.key === 'enter') closeRefuseModal
// })

/**
 * launch modal form
 * The function launchModal() will displays the modalbg div
 * and focuses on the first input field.
 */
function launchModal() {
  modalbg.classList.add('visible')
  document.getElementById('first').focus()
}

/**
 * launch confirmation modal
 * The function launchConfirmModal() will display the confirmModalbg div
 */
function launchConfirmModal() {
  confirmModalbg.classList.add('visible')
}

/**
 * launch refuse modal
 * The function launchRefuseModal() will display the refuseModalbg div
 */
function launchRefuseModal() {
  refuseModalbg.classList.add('visible')
}

/**
 * Close modal form
 * The function closeModal() closes the form modal by removing the class 'visible' from the Modalbg div
 */
function closeModal() {
  modalbg.classList.remove('visible')
}

/**
 * Close confirm modal
 * The function closeConfirmModal() closes the confirm modal by removing the class 'visible' from the confirmModalbg div
 */
function closeConfirmModal() {
  confirmModalbg.classList.remove('visible')
}

/**
 * Close refuse modal
 * The function closeRefuseModal() closes the refuse modal by removing the class 'visible' from the refuseModalbg div
 */
function closeRefuseModal() {
  refuseModalbg.classList.remove('visible')
}

// FONCTION MESSAGE D'ERREUR:
/**
 * It takes an id and a message as arguments, it adds the message to the error element with the
 * same id, and a error or success class to the input field
 * @param id - The id of the input field.
 * @param message - The message to display in the error message.
 */
const errorMessage = (id, message) => {
  const error = document.getElementById(`${id}-error`)
  let fieldIsATextInput = id !== 'location' && id !== 'CGU'
  error.textContent = message

  if (fieldIsATextInput) {
    document.getElementById(id).classList.add('error')
  }
  if (message === '' && fieldIsATextInput) {
    document.getElementById(id).classList.remove('error')
    document.getElementById(id).classList.add('success')
  }
}

// FIRSTNAME VALIDATION:
/* It checks if the first name is valid. */
const firstName = document.getElementById('first')
const isFirstNameValid = () => {
  let value = first.value.trim()

  if (!/^[a-z][ a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ._-]{1,}$/i.test(value)) {
    errorMessage('first', 'Vous devez indiquer un prénom valide.')
    firstName.focus()
    return false
  } else {
    errorMessage('first', '')
    first.value = value.toLowerCase()
    return true
    //FIXME reduire le nb d'espaces
  }
}
// firstName.addEventListener('blur', isFirstNameValid)
firstName.onblur = isFirstNameValid
//FIXME différence?
//FIXME contrainte focus pour xp user?
//TODO success onchange?

// LASTNAME VALIDATION:
/* It checks if the last name is valid. */
const lastName = document.getElementById('last')
const isLastNameValid = () => {
  let value = last.value.trim()

  if (!/^[a-z][ a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ._-]{1,}$/i.test(value)) {
    errorMessage('last', 'Vous devez indiquer un nom valide.')
    lastName.focus()
    return false
  } else {
    errorMessage('last', '')
    last.value = value.toLowerCase()
    return true
  }
}
lastName.onblur = isLastNameValid

// EMAIL VALIDATION:
/* It checks if the email is valid. */
const email = document.getElementById('email')
const isEmailValid = () => {
  let value = email.value.trim()

  if (
    !/^[a-z0-9\-_]+[a-z0-9\.\-_]*@[a-z0-9\-_]{2,}\.[a-z\\.\-_]+[a-z\-_]+/i.test(
      value
    )
  ) {
    errorMessage('email', 'Vous devez indiquer une adresse mail valide.')
    email.focus()
    return false
  } else {
    errorMessage('email', '')
    email.value = value.toLowerCase()
    return true
  }
}
email.onblur = isEmailValid

// BIRTHDATE VALIDATION:
/* It checks if the birthdate is valid. */
const birthDate = document.getElementById('birthdate')
const isBirthdateValid = () => {
  if (!birthDate.value) {
    errorMessage('birthdate', 'Vous devez indiquer une date de naissance.')
    birthDate.focus()
    return false
  } else if (new Date(birthDate.value).getTime() > Date.now()) {
    errorMessage(
      'birthdate',
      'La date indiquée est postérieure à la date actuelle.'
    )
    birthDate.focus()
    return false
  } else {
    errorMessage('birthdate', '')
    return birthDate.value
  }
}
birthdate.onblur = isBirthdateValid
//FIXME class error lors du blank valid
// QUANTITY VALIDATION:
/* It checks if the quantity is valid. */
const quantity = document.getElementById('quantity')
const isQuantityValid = () => {
  if (!quantity.value) {
    errorMessage('quantity', 'Vous devez indiquer un nombre valide.')
    quantity.focus()
    return false
  } else {
    errorMessage('quantity', '')
    return true
  }
}
// LOCATION VALIDATION:
/* It checks if the location is checked. */
const isLocationChecked = () => {
  if (
    document.querySelectorAll('input[name="location"]:checked').length === 0
  ) {
    errorMessage('location', 'Vous devez indiquer un lieu.')
    return false
  } else {
    errorMessage('location', '')
    return true
  }
}
quantity.onblur = isQuantityValid

// CGU VALIDATION:
/* It checks if the CGU checkbox is checked. */
const isCGUChecked = () => {
  const cgu = document.getElementById('checkbox1')
  if (!cgu.checked) {
    errorMessage('CGU', "Vous devez accepter les conditions d 'utilisation.")
    return false
  } else {
    errorMessage('CGU', '')
    return true
  }
}
// VALIDATION:

// FORM VALIDATION FUNCTION
const validate = e => {
  /* It prevents the page reload */
  e.preventDefault()

  /**
     *  It calculate if the user age is above 18 from the provided birthdate
     * and then accept or refuse the submission
     //  */
  let calcAge = Date.now() - new Date(isBirthdateValid()).getTime()
  let userAge = Math.ceil(calcAge / (1000 * 3600 * 24) / 365)

  if (
    isFirstNameValid() &&
    isLastNameValid() &&
    isEmailValid() &&
    isBirthdateValid() &&
    isQuantityValid() &&
    isLocationChecked() &&
    isCGUChecked()
  ) {
    /* It removes the error class (red border), success class (green border) and empty all the input fields
     */
    document
      .querySelectorAll('input:not([type="button"]):not([type="submit"])')
      .forEach(input => {
        input.classList.remove('error')
        input.classList.remove('success')
        input.value = ''
      })
    /* Closing the modal. */
    closeModal()

    if (userAge < 18) {
      launchRefuseModal()
    } else {
      launchConfirmModal()
    }
  }
}
