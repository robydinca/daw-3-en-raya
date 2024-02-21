import Tablero from './tablero';
import './style.scss';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const buttonCreateTable = document.getElementById('createTable');
const inputDimensions = document.getElementById('dimension');
const inputNumPartidas = document.getElementById('numPartidas');
const resetButton = document.getElementById('resetGame');
const clearButtons = document.querySelectorAll('.clearGameButton');
const preGame = document.querySelector('.preGame');
const inGame = document.querySelector('.inGame');
const startGame = document.getElementById('startGame');
const inicio = document.querySelector('.inicio');

let tablero;

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const btnOpenModal = document.getElementById('startGame');
const spanClose = document.getElementsByClassName('close')[0];

startGame.addEventListener('click', e => {
  preGame.classList.remove('hide');
  inicio.classList.add('hide');
});
btnOpenModal.onclick = function () {
  modal.style.display = 'block';
};

spanClose.onclick = function () {
  if (tablero) {
    modal.style.display = 'none';
  } else {
    Toastify({
      text: 'Debes crear el tablero antes de salir',
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: 'red',
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }
};

window.onclick = function (event) {
  if (event.target == modal && !tablero) {
    Toastify({
      text: 'Debes crear el tablero antes de salir',
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: 'red',
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  } else if (event.target == modal && tablero) {
    modal.style.display = 'none';
  }
};

buttonCreateTable.addEventListener('click', e => {
  if (!inputDimensions.value) {
    Toastify({
      text: 'Debe indicar una dimensión válida',
      duration: 3000,
      newWindow: false,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: 'red',
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    inputDimensions.classList.add('error');
    inputDimensions.focus();
    return false;
  }

  if (isNaN(inputDimensions.value)) {
    Toastify({
      text: 'Debe introducir un número válido',
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: 'red',
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    inputDimensions.classList.add('error');
    inputDimensions.focus();
    return false;
  }

  if (inputNumPartidas.value && isNaN(inputNumPartidas.value)) {
    Toastify({
      text: 'Debe introducir un número válido',
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: 'red',
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    inputNumPartidas.classList.add('error');
    inputNumPartidas.focus();
    return false;
  }

  let checkMachine = document.getElementById('machine');
  tablero = new Tablero(
    parseInt(inputDimensions.value),
    checkMachine.checked,
    parseInt(inputNumPartidas.value)
  );
  tablero.imprimir('tablero');

  preGame.classList.toggle('hide');
  inGame.classList.toggle('hide');

  modal.style.display = 'none';
  modalContent.innerHTML = '';

  resetButton.classList.add('hidden');

  // Mostrar el botón de limpiar tablero
  clearButtons.forEach(button => {
    button.classList.remove('hidden');
  });

  // Agregar el evento click a los botones de limpiar tablero
  clearButtons.forEach(button => {
    button.addEventListener('click', limpiarTablero);
  });
});

inputDimensions.addEventListener('keydown', () => {
  inputDimensions.classList.remove('error');
});

for (let button of clearButtons) {
  button.addEventListener('click', () => {
    tablero.limpiar();
  });
}

resetButton.addEventListener('click', e => {
  // Limpiar el tablero y el marcador
  document.getElementById(tablero.elementID).innerHTML = '';
  document.getElementById('marcador').innerHTML = '';
  document.getElementById('jugada').innerHTML = '';

  // Eliminar la referencia al tablero actual
  tablero = null;

  // Ocultar el juego actual y mostrar el modal de configuración
  inGame.classList.add('hide');
  preGame.classList.remove('hide');

  // Limpiar el valor del campo de dimensiones y enfocarlo
  inputDimensions.value = '';
  inputDimensions.focus();

  // Mostrar el modal de configuración
  modal.style.display = 'block';
  modalContent.innerHTML = '';

  // Mostrar el botón de reiniciar
  resetButton.classList.remove('hidden');

  // Ocultar el botón de limpiar tablero
  clearButtons.forEach(button => {
    button.classList.add('hidden');
  });

  // Eliminar el evento click de los botones de limpiar tablero
  clearButtons.forEach(button => {
    button.removeEventListener('click', limpiarTablero);
  });
});

function limpiarTablero() {
  tablero.limpiar();
}
