/**
 * * DOM Elements
 * */
export const burgerMenu = document.querySelector('.icon') as HTMLAnchorElement

export const formModal = document.getElementById('validation')!
export const formModalBtn = document.querySelectorAll(
  '.modal-btn'
) as NodeListOf<HTMLButtonElement>
export const formModalCloseBtn = document.getElementById(
  'validation-close'
) as HTMLInputElement

export const confirmModal = document.getElementById('confirm')!
export const confirmModalBtn = document.getElementById(
  'confirm-btn'
) as HTMLInputElement
export const confirmModalCloseBtn = document.getElementById(
  'confirm-close'
) as HTMLInputElement

export const refuseModal = document.getElementById('reject')!
export const refuseModalBtn = document.getElementById(
  'reject-btn'
) as HTMLInputElement
export const refuseModalCloseBtn = document.getElementById(
  'reject-close'
) as HTMLInputElement

export const form = document.getElementById('form') as HTMLFormElement

export const firstNameInput = document.getElementById(
  'first'
) as HTMLInputElement
export const lastNameInput = document.getElementById('last') as HTMLInputElement
export const emailInput = document.getElementById('email') as HTMLInputElement
export const birthDateInput = document.getElementById(
  'birthdate'
) as HTMLInputElement
export const quantityInput = document.getElementById(
  'quantity'
) as HTMLInputElement
export const LocationsList = [
  ...(document.querySelectorAll(
    'input[name="location"]'
  ) as NodeListOf<HTMLInputElement>),
]
export const CGUInput = document.getElementById('checkbox1') as HTMLInputElement
