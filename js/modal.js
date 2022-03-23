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

// FORM VALIDATION FUNCTION
const validate = e => {
  /* It prevents the page reload */
  e.preventDefault()

  // FIRSTNAME VALIDATION:
  /* It checks if the first name is valid. */
  const firstName = document.getElementById('first')
  if (
    !first.value
      .toLowerCase()
      .match(/^[a-z][a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\._-]{1,}$/)
  ) {
    errorMessage('first', 'Vous devez indiquer un prénom valide.')
    firstName.focus()
    return
  } else {
    errorMessage('first', '')
    first.value = first.value.toLowerCase()
  }

  // LASTNAME VALIDATION:
  /* It checks if the last name is valid. */
  const lastName = document.getElementById('last')
  if (
    !last.value
      .toLowerCase()
      .match(/^[a-z][a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\._-]{1,}$/)
  ) {
    errorMessage('last', 'Vous devez indiquer un nom valide.')
    lastName.focus()
    return
  } else {
    errorMessage('last', '')
    last.value = last.value.toLowerCase()
  }

  // EMAIL VALIDATION:
  /* It checks if the email is valid. */
  const email = document.getElementById('email')
  if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email.value.toLowerCase()
    )
  ) {
    errorMessage('email', 'Vous devez indiquer une adresse mail valide.')
    email.focus()
    return
  } else {
    errorMessage('email', '')
    email.value = email.value.toLowerCase()
  }

  // BIRTHDATE VALIDATION:
  /* It checks if the birthdate is valid. */
  const birthDate = document.getElementById('birthdate')
  if (!birthDate.value) {
    errorMessage('birthdate', 'Vous devez indiquer une date de naissance.')
    birthDate.focus()
    return
  } else if (new Date(birthDate.value).getTime() > Date.now()) {
    errorMessage(
      'birthdate',
      'La date indiquée est postérieure à la date actuelle.'
    )
    birthDate.focus()
    return
  } else {
    errorMessage('birthdate', '')
  }

  // QUANTITY VALIDATION:
  /* It checks if the quantity is valid. */
  const quantity = document.getElementById('quantity')
  if (!quantity.value || typeof +quantity.value === NaN) {
    errorMessage('quantity', 'Vous devez indiquer un nombre valide.')
    quantity.focus()
    return
  } else {
    errorMessage('quantity', '')
  }

  // LOCATION VALIDATION:
  /* It checks if the location is checked. */
  if (
    document.querySelectorAll('input[name="location"]:checked').length === 0
  ) {
    errorMessage('location', 'Vous devez indiquer un lieu.')
    return
  } else {
    errorMessage('location', '')
  }

  // CGU VALIDATION:
  /* It checks if the CGU checkbox is checked. */
  const cgu = document.getElementById('checkbox1')
  if (!cgu.checked) {
    errorMessage('CGU', "Vous devez accepter les conditions d 'utilisation.")
    return
  } else {
    errorMessage('CGU', '')
  }

  // VALIDATION:
  /**
   *  It calculate if the user age is above 18 from the provided birthdate
   * and then accept or refuse the submission
   */
  let timeDiff = Date.now() - new Date(birthDate.value).getTime()
  let diffyears = Math.ceil(timeDiff / (1000 * 3600 * 24) / 365)

  if (diffyears < 18) {
    launchRefuseModal()
  } else {
    launchConfirmModal()
  }

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
}
