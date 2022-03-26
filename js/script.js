import * as DOM from './modules/domElements.js'
import {
  launchModal,
  closeModal,
  isInputValid,
  editNav,
  setErrorMessage,
} from './modules/utils.js'
DOM.burgerMenu.onclick = editNav

DOM.formModalBtn.forEach(btn => (btn.onclick = () => launchModal()))

DOM.formModalCloseBtn.onclick = () => closeModal()

DOM.confirmModalBtn.onclick = DOM.confirmModalCloseBtn.onclick = () =>
  closeModal(DOM.confirmModal)

DOM.refuseModalBtn.onclick = DOM.refuseModalCloseBtn.onclick = () =>
  closeModal(DOM.refuseModal)

let firstName = {
  value: '',
  regex: /^[a-z][ a-z0-9á-ÿæœ\._\-]{1,}$/i,
  id: 'first',
  errorText: 'Vous devez indiquer un prénom valide.',
}

let lastName = {
  value: '',
  regex: /^[a-z][ a-z0-9á-ÿæœ\._\-]{1,}$/i,
  id: 'last',
  errorText: 'Vous devez indiquer un nom valide.',
}

let email = {
  value: '',
  regex: /^[a-z0-9\-_]+[a-z0-9\.\-_]*@[a-z0-9\-_]{2,}\.[a-z\\.\-_]+[a-z\-_]+/i,
  id: 'email',
  errorText: 'Vous devez indiquer une adresse mail valide.',
}

// FIRSTNAME VALIDATION:
DOM.firstNameInput.onchange = e => (firstName.value = e.target.value)
DOM.firstNameInput.onblur = () => isInputValid(firstName)

// LASTNAME VALIDATION:
DOM.lastNameInput.onchange = e => (lastName.value = e.target.value)
DOM.lastNameInput.onblur = () => isInputValid(lastName)

// EMAIL VALIDATION:
DOM.emailInput.onchange = e => (email.value = e.target.value)
DOM.emailInput.onblur = () => isInputValid(email)

// BIRTHDATE VALIDATION:
const isBirthdateValid = () => {
  if (!DOM.birthDateInput.value) {
    setErrorMessage('birthdate', 'Vous devez indiquer une date de naissance.')
    DOM.birthDateInput.focus()
    return false
  }
  if (new Date(DOM.birthDateInput.value).getTime() > Date.now()) {
    setErrorMessage(
      'birthdate',
      'La date indiquée est postérieure à la date actuelle.'
    )
    DOM.birthDateInput.focus()
    return false
  }

  setErrorMessage('birthdate', '')
  return DOM.birthDateInput.value
}

DOM.birthDateInput.onblur = isBirthdateValid

// QUANTITY VALIDATION:
const isQuantityValid = () => {
  console.log('hello')
  if (!DOM.quantityInput.value) {
    setErrorMessage('quantity', 'Vous devez indiquer un nombre valide.')
    DOM.quantityInput.focus()
    return false
  }
  setErrorMessage('quantity', '')
  return true
}

DOM.quantityInput.onblur = isQuantityValid //FIXME conflit avec un submit à champs vides corrigés un à un avec un resubmit derrière

// LOCATION VALIDATION:
const isLocationChecked = () => {
  if (
    document.querySelectorAll('input[name="location"]:checked').length === 0
  ) {
    setErrorMessage('location', 'Vous devez indiquer un lieu.')
    return false
  }
  setErrorMessage('location', '')
  return true
}

// CGU VALIDATION:
const isCGUChecked = () => {
  if (!DOM.CGUInput.checked) {
    setErrorMessage('CGU', "Vous devez accepter les conditions d 'utilisation.")
    return false
  }
  setErrorMessage('CGU', '')
  return true
}

// FORM VALIDATION FUNCTION
const validate = e => {
  /* It prevents the page reload */
  e.preventDefault()

  if (
    isInputValid(firstName) &&
    isInputValid(lastName) &&
    isInputValid(email) &&
    isBirthdateValid() &&
    isQuantityValid() &&
    isLocationChecked() &&
    isCGUChecked()
  ) {
    let calcAge = Date.now() - new Date(isBirthdateValid()).getTime()
    let userAge = Math.ceil(calcAge / (1000 * 3600 * 24) / 365)

    document
      .querySelectorAll('input:not([type="button"]):not([type="submit"])')
      .forEach(input => {
        input.classList.remove('error')
        input.classList.remove('success')
        input.value = ''
      })
    document
      .querySelectorAll('input[name="location"]:checked')
      .forEach(input => {
        input.checked = false
      })
    firstName.value = lastName.input = email.input = ''

    closeModal()

    if (userAge < 18) {
      launchModal(DOM.refuseModal)
    } else {
      launchModal(DOM.confirmModal)
    }
  }
}

DOM.form.onsubmit = validate

document.onkeydown = e => {
  if (e.key === 'Enter') {
    if (DOM.formModal.classList.contains('visible')) return validate(e)
    if (DOM.confirmModal.classList.contains('visible'))
      return closeModal(DOM.confirmModal)
    if (DOM.refuseModal.classList.contains('visible'))
      return closeModal(DOM.refuseModal)
  }
  if (e.key === 'Escape') {
    closeModal()
    closeModal(DOM.confirmModal)
    closeModal(DOM.refuseModal)
  }
}
