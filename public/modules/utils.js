import { formModal } from './domElements.js';
/* Fonction d'ouverture de la modale formulaire par ajout de la classe visible */
const launchModal = (modal = formModal) => modal.classList.add('visible');
/* Fonction de fermeture de la modale formulaire par retrait de la classe visible */
const closeModal = (modal = formModal) => modal.classList.remove('visible');
/* Fonction d'ouverture du menu burger en mode mobile */
function editNav() {
    var x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
        x.className += ' responsive';
    }
    else {
        x.className = 'topnav';
    }
}
/**
 * Fonction de validation des champs firstname, lastname et email
 */
const isInputValid = ({ value, regex, id, errorText }) => {
    let trimmedValue = value.trim();
    /*
    En cas d'absence de texte dans le champ ou de caractères non autorisés entrés, on appelle la fonction setErrorMessage() avec l'id du champ et le message approprié et on remet le focus sur le champ en erreur, et on renvoie false à destination du test de validation lors du submit
    */
    if (!regex.test(trimmedValue) || !value) {
        setErrorMessage(id, errorText);
        document.getElementById(id).focus();
        return false;
    }
    /*
  En cas de saisie valide de texte, on reset la fonction d'erreur,
  on affiche dans le champ le texte entré, debarrassé des éventuels espaces avant et après, passé en lowerCase, avec l'éventuel espace entre deux mots réduit à un seul caractère, et on renvoie true à destination du test de validation lors du submit
  */
    setErrorMessage(id, '');
    document.getElementById(id).value = trimmedValue
        .toLowerCase()
        .replace(/  +/g, ' ');
    return true;
};
// FONCTION MESSAGE D'ERREUR:
const setErrorMessage = (id, message) => {
    /* On selectionne le champ d'erreur associé à l'input dont on a récupéré l'id */
    const error = document.getElementById(`${id}-error`);
    /* On crée une condition testant si le champ en erreur est un champ texte (Text, Number, Date) dont on pourra modifier l'apparence avec une bordure rouge */
    let fieldIsATextInput = id !== 'location' && id !== 'CGU';
    /* On affiche le message d'erreur approprié selon l'input */
    error && (error.textContent = message);
    if (fieldIsATextInput) {
        /* On ajoute une bordure rouge à l'input en erreur quand c'est possible */
        ;
        document.getElementById(id).classList.add('error');
    }
    /* S'il n'y a pas de message d'erreur reçu, il s'agit d'un reset, on affiche alors une bordure verte */
    if (message === '' && fieldIsATextInput) {
        ;
        document.getElementById(id).classList.remove('error');
        document.getElementById(id).classList.add('success');
    }
};
export { launchModal, closeModal, editNav, isInputValid, setErrorMessage };
//# sourceMappingURL=utils.js.map