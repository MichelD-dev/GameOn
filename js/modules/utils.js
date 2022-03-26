import { formModal } from './domElements.js'

const launchModal = (modal = formModal) => modal.classList.add('visible')

const closeModal = (modal = formModal) => modal.classList.remove('visible')

function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

const isInputValid = ({ value, regex, id, errorText }) => {
  let trimmedValue = value.trim()

  if (!regex.test(trimmedValue) || !value) {
    setErrorMessage(id, errorText)
    document.getElementById(id).focus()
    return false
  }
  setErrorMessage(id, '')
  document.getElementById(id).value = trimmedValue
    .toLowerCase()
    .replace(/  +/g, ' ')
  return true
}

// FONCTION MESSAGE D'ERREUR:
const setErrorMessage = (id, message) => {
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

export { launchModal, closeModal, editNav, isInputValid, setErrorMessage }
