import * as DOM from './modules/domElements.js';
import { launchModal, closeModal, isInputValid, editNav, setErrorMessage, } from './modules/utils.js';
DOM.burgerMenu.onclick = editNav;
/**
 * Ouverture de la modale par click sur les deux boutons d'inscription (desktop/mobile)
 */
DOM.formModalBtn.forEach(btn => (btn.onclick = () => launchModal()));
/**
 * Fermeture de la modale par click sur le bouton X
 */
DOM.formModalCloseBtn.onclick = () => closeModal();
/**
 * Fermeture de la modale de confirmation d'inscription
 */
DOM.confirmModalBtn.onclick = DOM.confirmModalCloseBtn.onclick = () => closeModal(DOM.confirmModal);
/**
 * Fermeture de la modale de rejet d'inscription
 */
DOM.refuseModalBtn.onclick = DOM.refuseModalCloseBtn.onclick = () => closeModal(DOM.refuseModal);
/**
 * Objets contenant une liste de paramètres utiles à chaque input
 */
let firstName = {
    value: '',
    regex: /^[a-z][ a-z0-9á-ÿæœ\._\-]{1,}$/i,
    id: 'first',
    errorText: 'Vous devez indiquer un prénom valide.',
};
let lastName = {
    value: '',
    regex: /^[a-z][ a-z0-9á-ÿæœ\._\-]{1,}$/i,
    id: 'last',
    errorText: 'Vous devez indiquer un nom valide.',
};
let email = {
    value: '',
    regex: /^[a-z0-9\-_]+[a-z0-9\.\-_]*@[a-z0-9\-_]{2,}\.[a-z\\.\-_]+[a-z\-_]+$/i,
    id: 'email',
    errorText: 'Vous devez indiquer une adresse mail valide.',
};
// FIRSTNAME VALIDATION:
/* Enregistrement du texte entré dans le champ prénom dans l'objet sus-mentionné*/
DOM.firstNameInput.onchange = e => (firstName.value = e.target.value);
/* Test de la validité de l'input prénom lorsque l'on quitte le champ */
DOM.firstNameInput.onblur = () => isInputValid(firstName);
// LASTNAME VALIDATION:
/* Enregistrement du texte entré dans le champ nom dans l'objet sus-mentionné*/
DOM.lastNameInput.onchange = e => (lastName.value = e.target.value);
/* Test de la validité de l'input nom lorsque l'on quitte le champ */
DOM.lastNameInput.onblur = () => isInputValid(lastName);
// EMAIL VALIDATION:
/* Enregistrement du texte entré dans le champ email dans l'objet sus-mentionné*/
DOM.emailInput.onchange = e => (email.value = e.target.value);
/* Test de la validité de l'input email lorsque l'on quitte le champ */
DOM.emailInput.onblur = () => isInputValid(email);
/* Test de la validité de l'input birthdate lorsque l'on quitte le champ */
DOM.birthDateInput.onblur = () => isBirthdateValid();
/* Test de la validité de l'input quantity lorsque l'on quitte le champ */
DOM.quantityInput.onblur = () => isQuantityValid();
// BIRTHDATE VALIDATION:
const isBirthdateValid = () => {
    /*
     * En cas d'absence de saisie de date, on affiche un message d'erreur,on remet le focus sur le champ et on renvoie false à destination du test de validation lors du submit
     */
    if (!DOM.birthDateInput.value) {
        setErrorMessage('birthdate', 'Vous devez indiquer une date de naissance.');
        DOM.birthDateInput.focus();
        return false;
    }
    /*
     * En cas de saisie d'une date postérieure à la date du jour, on affiche un message d'erreur,on remet le focus sur le champ et on renvoie false à destination du test de validation lors du submit
     */
    if (new Date(DOM.birthDateInput.value).getTime() > Date.now()) {
        setErrorMessage('birthdate', 'La date indiquée est postérieure à la date actuelle.');
        DOM.birthDateInput.focus();
        return false;
    }
    /*
     * En cas de saisie d'une date valide, on reset la fonction d'erreur et on renvoie une valeur "truthy" à destination du test de validation lors du submit
     */
    setErrorMessage('birthdate', '');
    return DOM.birthDateInput.value;
};
// QUANTITY VALIDATION:
const isQuantityValid = () => {
    /*
     * En cas d'absence de saisie d'une quantité, on affiche un message d'erreur,on remet le focus sur le champ et on renvoie false à destination du test de validation lors du submit
     * le test de type de la donnée n'est pas nécessaire, s'agissant d'un champ Number
     */
    if (!DOM.quantityInput.value) {
        setErrorMessage('quantity', 'Vous devez indiquer un nombre valide.');
        DOM.quantityInput.focus();
        return false;
    }
    /*
     * En cas de saisie d'une quantité qui n'est pas comprise entre 0 et 99, on affiche un message d'erreur,on remet le focus sur le champ et on renvoie false à destination du test de validation lors du submit
     */
    if (parseInt(DOM.quantityInput.value) < 0 ||
        parseInt(DOM.quantityInput.value) > 99) {
        setErrorMessage('quantity', 'Vous devez indiquer un nombre compris entre 0 et 99.');
        DOM.quantityInput.focus();
        return false;
    }
    /*
     * En cas de saisie d'une date valide, on reset la fonction d'erreur et on renvoie une valeur "truthy" à destination du test de validation lors du submit
     */
    setErrorMessage('quantity', '');
    return true;
};
// LOCATION VALIDATION:
const isLocationChecked = () => {
    /**
     * On récupère le tableau des boutons radios avec l'attribut name=location, on le filtre pour récupérer celui qui a été checké dans un tableau
     * Si ce tableau est vide, on affiche un message d'erreur et on renvoie false à destination du test de validation lors du submit
     */
    if (DOM.LocationsList.filter(location => location.checked)
        .length === 0) {
        setErrorMessage('location', 'Vous devez indiquer un lieu.');
        return false;
    }
    /*
     * En cas de présence d'un bouton location checké, on reset la fonction d'erreur et on renvoie true à destination du test de validation lors du submit
     */
    setErrorMessage('location', '');
    return true;
};
// CGU VALIDATION:
const isCGUChecked = () => {
    /*
     * En cas de checkbox non checkée, on affiche un message d'erreur et on renvoie false à destination du test de validation lors du submit
     */
    if (!DOM.CGUInput.checked) {
        setErrorMessage('CGU', "Vous devez accepter les conditions d 'utilisation.");
        return false;
    }
    /*
     * En cas de checkbox checkée, on reset la fonction d'erreur et on renvoie true à destination du test de validation lors du submit
     */
    setErrorMessage('CGU', '');
    return true;
};
// FORM VALIDATION FUNCTION
const validate = (e) => {
    /* On prévient le rechargement de la page */
    e.preventDefault();
    /* on vérifie que tous les tests précédents ont renvoyé "true" */
    if (isInputValid(firstName) &&
        isInputValid(lastName) &&
        isInputValid(email) &&
        isBirthdateValid() &&
        isQuantityValid() &&
        isLocationChecked() &&
        isCGUChecked()) {
        /* On calcule le temps écoulé en secondes entre la date de naissance entrée par l'utilisateur et la date du jour */
        let calcAge = Date.now() - new Date(DOM.birthDateInput.value).getTime();
        let userAge = Math.ceil(calcAge / (1000 * 3600 * 24) / 365) /* On vide les champs du formulaire de leur contenu et on supprimme les messages d'erreur*/;
        document.querySelectorAll('input:not([type="button"]):not([type="submit"])').forEach((input) => {
            input.classList.remove('error');
            input.classList.remove('success');
            input.value = '';
        });
        /* On "dé-checke" le champ Location checké */
        DOM.LocationsList.map(location => (location.checked = false));
        /* On ferme la modale au moment du submit */
        closeModal();
        /* En fonction de la durée calculée plus haut, correspondante à l'âge de l'utilisateur, on affichera une modale de refus s'il est mineur ou de validation s'il est majeur */
        if (userAge < 18) {
            launchModal(DOM.refuseModal);
        }
        else {
            launchModal(DOM.confirmModal);
        }
    }
};
/* Appel de la fonction de validation lors du click sur le bouton de soumission*/
DOM.form.onsubmit = validate;
/* Lors d'un appui sur la touche Enter, on soumettra si on est sur la modale formulaire, on fermera la modale sinon */
document.onkeydown = e => {
    var _a, _b, _c;
    if (e.key === 'Enter') {
        if ((_a = DOM.formModal) === null || _a === void 0 ? void 0 : _a.classList.contains('visible'))
            return validate(e);
        if ((_b = DOM.confirmModal) === null || _b === void 0 ? void 0 : _b.classList.contains('visible'))
            return closeModal(DOM.confirmModal);
        if ((_c = DOM.refuseModal) === null || _c === void 0 ? void 0 : _c.classList.contains('visible'))
            return closeModal(DOM.refuseModal);
    }
    /* Lors d'un appui sur la touche Escape, on ferme la modale affichée */
    if (e.key === 'Escape') {
        closeModal();
        closeModal(DOM.confirmModal);
        closeModal(DOM.refuseModal);
    }
};
