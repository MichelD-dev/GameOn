/**
 * * DOM Elements
 * */
const DOM = {
  burgerMenu: document.querySelector('.icon'),
  formModal: document.getElementById('validation'),
  formModalBtn: document.querySelectorAll('.modal-btn'),
  formModalCloseBtn: document.getElementById('validation-close'),
  confirmModal: document.getElementById('confirm'),
  confirmModalBtn: document.getElementById('confirm-btn'),
  confirmModalCloseBtn: document.getElementById('confirm-close'),
  refuseModal: document.getElementById('reject'),
  refuseModalBtn: document.getElementById('reject-btn'),
  refuseModalCloseBtn: document.getElementById('reject-close'),
  form: document.getElementById('form'),
  firstNameInput: document.getElementById('first'),
  lastNameInput: document.getElementById('last'),
  emailInput: document.getElementById('email'),
  birthDateInput: document.getElementById('birthdate'),
  quantityInput: document.getElementById('quantity'),
  LocationsList: [...document.querySelectorAll('input[name="location"]')],
  CGUInput: document.getElementById('checkbox1'),
}

DOM.burgerMenu && (DOM.burgerMenu.onclick = editNav)

/**
 * Ouverture de la modale par click sur les deux boutons d'inscription (desktop/mobile)
 */
DOM.formModalBtn.forEach(btn => (btn.onclick = () => launchModal()))

/**
 * Fermeture de la modale par click sur le bouton X
 */
DOM.formModalCloseBtn && (DOM.formModalCloseBtn.onclick = () => closeModal())

/**
 * Fermeture de la modale de confirmation d'inscription
 */
DOM.confirmModalBtn &&
  (DOM.confirmModalBtn.onclick = () => closeModal(DOM.confirmModal))
DOM.confirmModalCloseBtn &&
  (DOM.confirmModalCloseBtn.onclick = () => closeModal(DOM.confirmModal))

/**
 * Fermeture de la modale de rejet d'inscription
 */
DOM.refuseModalBtn &&
  (DOM.refuseModalBtn.onclick = () => closeModal(DOM.refuseModal))

DOM.refuseModalCloseBtn &&
  (DOM.refuseModalCloseBtn.onclick = () => closeModal(DOM.refuseModal))

/* Fonction d'ouverture de la modale formulaire par ajout de la classe visible */
const launchModal = (modal = DOM.formModal) => modal.classList.add('visible')

/* Fonction de fermeture de la modale formulaire par retrait de la classe visible */
const closeModal = (modal = DOM.formModal) => modal.classList.remove('visible')

/* Fonction d'ouverture du menu burger en mode mobile */
function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

/**
 * Fonction de validation des champs firstname, lastname et email
 * @params - value: texte entré dans l'input
 * @params - regex: caractères autorisés dans le champ
 * @params - id: id: id de l'input
 * @params - errorText: texte à afficher en cas d'erreur
 */
const isInputValid = ({ value, regex, id, errorText }) => {
  let trimmedValue = value.trim()

  /*
  En cas d'absence de texte dans le champ ou de caractères non autorisés entrés, on appelle la fonction setErrorMessage() avec l'id du champ et le message approprié et on remet le focus sur le champ en erreur, et on renvoie false à destination du test de validation lors du submit
  */
  if (!regex.test(trimmedValue) || !value) {
    setErrorMessage(id, errorText)
    document.getElementById(id).focus()
    return false
  }
  /*
En cas de saisie valide de texte, on reset la fonction d'erreur, 
on affiche dans le champ le texte entré, debarrassé des éventuels espaces avant et après, passé en lowerCase, avec l'éventuel espace entre deux mots réduit à un seul caractère, et on renvoie true à destination du test de validation lors du submit
*/
  setErrorMessage(id, '')
  document.getElementById(id).value = trimmedValue
    .toLowerCase()
    .replace(/  +/g, ' ')
  return true
}

// FONCTION MESSAGE D'ERREUR:
const setErrorMessage = (id, message) => {
  /* On selectionne le champ d'erreur associé à l'input dont on a récupéré l'id */
  const error = document.getElementById(`${id}-error`)
  /* On crée une condition testant si le champ en erreur est un champ texte (Text, Number, Date) dont on pourra modifier l'apparence avec une bordure rouge */
  let fieldIsATextInput = id !== 'location' && id !== 'CGU'
  /* On affiche le message d'erreur approprié selon l'input */
  error.textContent = message

  if (fieldIsATextInput) {
    /* On ajoute une bordure rouge à l'input en erreur quand c'est possible */
    document.getElementById(id).classList.add('error')
  }
  /* S'il n'y a pas de message d'erreur reçu, il s'agit d'un reset, on affiche alors une bordure verte */
  if (message === '' && fieldIsATextInput) {
    document.getElementById(id).classList.remove('error')
    document.getElementById(id).classList.add('success')
  }
}

/**
 * Objets contenant une liste de paramètres utiles à chaque input
 */
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
  regex: /^[a-z0-9\-_]+[a-z0-9\.\-_]*@[a-z0-9\-_]{2,}\.[a-z\\.\-_]+[a-z\-_]+$/i,
  id: 'email',
  errorText: 'Vous devez indiquer une adresse mail valide.',
}

// FIRSTNAME VALIDATION:
/* Enregistrement du texte entré
 dans le champ prénom dans l'objet sus-mentionné*/
if (DOM.formModal) {
  DOM.firstNameInput.onchange = e => (firstName.value = e.target.value)
  /* Test de la validité de l'input prénom lorsque l'on quitte le champ */
  DOM.firstNameInput.onblur = () => isInputValid(firstName)

  // LASTNAME VALIDATION:
  /* Enregistrement du texte entré dans le champ nom dans l'objet sus-mentionné*/
  DOM.lastNameInput.onchange = e => (lastName.value = e.target.value)

  /* Test de la validité de l'input nom lorsque l'on quitte le champ */
  DOM.lastNameInput.onblur = () => isInputValid(lastName)

  // EMAIL VALIDATION:
  /* Enregistrement du texte entré dans le champ email dans l'objet sus-mentionné*/
  DOM.emailInput.onchange = e => (email.value = e.target.value)

  /* Test de la validité de l'input email lorsque l'on quitte le champ */
  DOM.emailInput.onblur = () => isInputValid(email)

  /* Test de la validité de l'input birthdate lorsque l'on quitte le champ */
  DOM.birthDateInput.onblur = () => isBirthdateValid()

  /* Test de la validité de l'input quantity lorsque l'on quitte le champ */
  DOM.quantityInput.onblur = () => isQuantityValid()
}

// BIRTHDATE VALIDATION:
const isBirthdateValid = () => {
  /*
   * En cas d'absence de saisie de date, on affiche un message d'erreur,on remet le focus sur le champ et on renvoie false à destination du test de validation lors du submit
   */
  if (!DOM.birthDateInput.value) {
    setErrorMessage('birthdate', 'Vous devez indiquer une date de naissance.')
    DOM.birthDateInput.focus()
    return false
  }
  /*
   * En cas de saisie d'une date postérieure à la date du jour, on affiche un message d'erreur,on remet le focus sur le champ et on renvoie false à destination du test de validation lors du submit
   */
  if (new Date(DOM.birthDateInput.value).getTime() > Date.now()) {
    setErrorMessage(
      'birthdate',
      'La date indiquée est postérieure à la date actuelle.'
    )
    DOM.birthDateInput.focus()
    return false
  }
  /*
   * En cas de saisie d'une date valide, on reset la fonction d'erreur et on renvoie une valeur "truthy" à destination du test de validation lors du submit
   */
  setErrorMessage('birthdate', '')
  return DOM.birthDateInput.value
}

// QUANTITY VALIDATION:
const isQuantityValid = () => {
  /*
   * En cas d'absence de saisie d'une quantité, on affiche un message d'erreur,on remet le focus sur le champ et on renvoie false à destination du test de validation lors du submit
   * le test de type de la donnée n'est pas nécessaire, s'agissant d'un champ Number
   */
  if (!DOM.quantityInput.value) {
    setErrorMessage('quantity', 'Vous devez indiquer un nombre valide.')
    DOM.quantityInput.focus()
    return false
  }
  /*
   * En cas de saisie d'une quantité qui n'est pas comprise entre 0 et 99, on affiche un message d'erreur,on remet le focus sur le champ et on renvoie false à destination du test de validation lors du submit
   */
  if (DOM.quantityInput.value < 0 || DOM.quantityInput.value > 99) {
    setErrorMessage(
      'quantity',
      'Vous devez indiquer un nombre compris entre 0 et 99.'
    )
    DOM.quantityInput.focus()
    return false
  }
  /*
   * En cas de saisie d'une date valide, on reset la fonction d'erreur et on renvoie une valeur "truthy" à destination du test de validation lors du submit
   */
  setErrorMessage('quantity', '')
  return true
}

// LOCATION VALIDATION:
const isLocationChecked = () => {
  /**
   * On récupère le tableau des boutons radios avec l'attribut name=location, on le filtre pour récupérer celui qui a été checké dans un tableau
   * Si ce tableau est vide, on affiche un message d'erreur et on renvoie false à destination du test de validation lors du submit
   */
  if (DOM.LocationsList.filter(location => location.checked).length === 0) {
    setErrorMessage('location', 'Vous devez indiquer un lieu.')
    return false
  }
  /*
   * En cas de présence d'un bouton location checké, on reset la fonction d'erreur et on renvoie true à destination du test de validation lors du submit
   */
  setErrorMessage('location', '')
  return true
}

// CGU VALIDATION:
const isCGUChecked = () => {
  /*
   * En cas de checkbox non checkée, on affiche un message d'erreur et on renvoie false à destination du test de validation lors du submit
   */
  if (!DOM.CGUInput.checked) {
    setErrorMessage('CGU', "Vous devez accepter les conditions d 'utilisation.")
    return false
  }
  /*
   * En cas de checkbox checkée, on reset la fonction d'erreur et on renvoie true à destination du test de validation lors du submit
   */
  setErrorMessage('CGU', '')
  return true
}

// FORM VALIDATION FUNCTION
const validate = e => {
  /* On prévient le rechargement de la page */
  e.preventDefault()
  /* on vérifie que tous les tests précédents ont renvoyé "true" */
  if (
    isInputValid(firstName) &&
    isInputValid(lastName) &&
    isInputValid(email) &&
    isBirthdateValid() &&
    isQuantityValid() &&
    isLocationChecked() &&
    isCGUChecked()
  ) {
    /* On calcule le temps écoulé en secondes entre la date de naissance entrée par l'utilisateur et la date du jour */
    let calcAge = Date.now() - new Date(isBirthdateValid()).getTime()
    let userAge = Math.ceil(calcAge / (1000 * 3600 * 24) / 365)

    /* On vide les champs du formulaire de leur contenu et on supprimme les messages d'erreur*/
    document
      .querySelectorAll('input:not([type="button"]):not([type="submit"])')
      .forEach(input => {
        input.classList.remove('error')
        input.classList.remove('success')
        input.value = ''
      })
    /* On "dé-checke" le champ Location checké */
    DOM.LocationsList.map(location => (location.checked = false))

    /* On ferme la modale au moment du submit */
    closeModal()

    /* En fonction de la durée calculée plus haut, correspondante à l'âge de l'utilisateur, on affichera une modale de refus s'il est mineur ou de validation s'il est majeur */
    if (userAge < 18) {
      launchModal(DOM.refuseModal)
    } else {
      launchModal(DOM.confirmModal)
    }
  }
}

/* Appel de la fonction de validation lors du click sur le bouton de soumission*/
DOM.form && (DOM.form.onsubmit = validate)

/* Lors d'un appui sur la touche Enter, on soumettra si on est sur la modale formulaire, on fermera la modale sinon */
document.onkeydown = e => {
  if (e.key === 'Enter') {
    if (DOM.formModal.classList.contains('visible')) return validate(e)
    if (DOM.confirmModal.classList.contains('visible'))
      return closeModal(DOM.confirmModal)
    if (DOM.refuseModal.classList.contains('visible'))
      return closeModal(DOM.refuseModal)
  }
  /* Lors d'un appui sur la touche Escape, on ferme la modale affichée */
  if (e.key === 'Escape') {
    closeModal()
    closeModal(DOM.confirmModal)
    closeModal(DOM.refuseModal)
  }
}
