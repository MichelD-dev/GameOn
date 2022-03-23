

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

const confirmModalbg = document.querySelector('.bground__confirm')
const refuseModalbg = document.querySelector('#not-of-legal-age')
const confirmModalBtn = document.querySelector('.btn-submit')
const confirmModalCloseBtn = document.querySelector('.btn-close')
const refuseModalCloseBtn = document.querySelector('#refuse-btn-close')

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

//launch refuse modal
function launchRefuseModal() {
  refuseModalbg.style.display = 'block'
}

// close modal form event //FIXME
modalCloseBtn.addEventListener('click', closeModal)

// close confirmation modal addEventListener
confirmModalCloseBtn.addEventListener('click', closeConfirmModal)
modalbg.addEventListener('keypress', e => {
  if (e.key === 'enter') closeConfirmModal
})

// close refuse modal events
refuseModalCloseBtn.addEventListener('click', closeRefuseModal)
refuseModalbg.addEventListener('keypress', e => {
  if (e.key === 'enter') closeRefuseModal  //FIXME
})

// close modal form
function closeModal() {
  modalbg.style.display = 'none'
}

// close confirm modal
function closeConfirmModal() {
  confirmModalbg.style.display = 'none'
}

// close refuse modal
function closeRefuseModal() {
  refuseModalbg.style.display = 'none'
}

// FONCTION MESSAGE D'ERREUR:
const errorMessage = (id, message) => {
  const error = document.getElementById(`${id}-error`)
  error.textContent = message
  if (id !== 'location' && id !== 'CGU') {
    document.getElementById(id).classList.add('error')
  }
  // if (message === '') {
  //   document.getElementById(id).classList.remove('error')
  // }
}

// FORM VALIDATION FUNCTION
const validate = e => {
  e.preventDefault()

  // FIRSTNAME VALIDATION:
  const firstName = document.getElementById('first')
  if (!/[a-z][a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ-_.]{1,}/.test(first.value.toLowerCase())) {
    errorMessage('first', 'Vous devez indiquer un prénom valide.')
    firstName.focus()
    return
  } else {
    errorMessage('first', '')
    first.value = first.value.toLowerCase()
  }

  // LASTNAME VALIDATION:
  const lastName = document.getElementById('last')
  if (!/[a-zA-Z][a-zA-Z0-9-_.]{1,}/.test(last.value.toLowerCase())) {
    errorMessage('last', 'Vous devez indiquer un nom valide.')
    lastName.focus()
    return
  } else {
    errorMessage('last', '')
    last.value = last.value.toLowerCase()
  }

  // EMAIL VALIDATION:
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
  const birthDate = document.getElementById('birthdate')
  if (!birthDate.value || new Date(birthDate.value).getTime() > Date.now()) {
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
  let timeDiff = Math.abs(Date.now() - new Date(birthDate.value).getTime())
  let diffyears = Math.ceil(timeDiff / (1000 * 3600 * 24) / 365)
  if (diffyears < 18) {
    launchRefuseModal()
  } else {
    launchConfirmModal('')
  }

  document
    .querySelectorAll('input:not([type="button"]):not([type="submit"])')
    .forEach(input => {
      input.classList.remove('error')
      input.value = ''
    })
  closeModal()
}
