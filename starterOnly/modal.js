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

const validate = () => {
  //firstName validation
  const firstName = document.querySelector('#first')
  if (firstName.value.length < 2) {
    //FIXME validation html5 existante
    alert('Vous devez indiquer un prénom valide.')
    firstName.focus()
    return false
  }

  //lastName validation
  const lastName = document.querySelector('#last')
  if (lastName.value.length < 2) {
    alert('Vous devez indiquer un nom valide.')
    lastName.focus()
    return false
  }

  //email validation
  const email = document.querySelector('#email')
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    //FIXME ou pattern en attribut html?
    alert('Vous devez indiquer une adresse mail valide.')
    email.focus()
    return false
  }

  //quantity validation
  const quantity = document.querySelector('#quantity')
  if (!quantity.value) {
    alert('Vous devez indiquer un nombre valide.')
    return false
  }

  //Location validation
  let selectedLocation
  document.querySelectorAll('input[name="location"]').forEach(location => {
    if (location.checked) {
      return (selectedLocation = location.value)
    }
  })
  if (!selectedLocation) {
    alert('Vous devez indiquer un lieu.')
    return false
  }

  //CGU validation
  const cgu = document.querySelector('#checkbox1')
  if (!cgu.checked) {
    alert("Vous devez indiquer accepter les conditions d'utilisation.")
    return false
  }
  //FIXME conserve les données du formulaire par défaut...
  //validation successful
  return true
}
