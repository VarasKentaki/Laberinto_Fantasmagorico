const imagenPLayer = document.createElement('img');
imagenPLayer.setAttribute('class', 'player');
const imagenFantasma = document.createElement('img');
imagenFantasma.setAttribute('class', 'fantasma');
const tablero = document.getElementById('tablero');
const divFicha = document.querySelectorAll('.ficha[id]');
const fichasN = document.querySelectorAll('.bg-black[id]');
const segundos = document.getElementById('segundos');
const partida = document.getElementById('partida');
const primero = document.getElementById('00');
const mejortiempo = document.getElementsByClassName('tiempos')[0];

let teclado = '';
let contador = 0;
let posicionFantasma = [];
let posicionJugador = 0;
let tiempo1 = 0;
let perseguir;
let moveset;
let idFantasma;
let idFantasmaArray;
let cazado = false;
let contadormove = 0;
let contadortiempo = 0;
let movimiento = [
  'Player-1.png',
  'Player-2.png',
  'Player-3.png',
  'Player-4.png',
  'Player-5.png',
  'Player-6.png',
];
primero.appendChild(imagenPLayer);
function teclas(event) {
  if (cazado != true) {
    if (parseInt(divFicha[contador].id) != 89) {
      if (event.key.startsWith('Arrow')) event.preventDefault();
      switch (event.key) {
        case 'ArrowUp':
          if (!divFicha[contador - 10]?.classList.contains('bg-black')) {
            if (divFicha[contador - 10]?.id) {
              divFicha[(contador -= 10)].appendChild(imagenPLayer);
            }
          }
          break;
        case 'ArrowLeft':
          if (!divFicha[contador - 1]?.classList.contains('bg-black')) {
            if (divFicha[contador - 1]?.id && contador % 10 != 0) {
              divFicha[--contador].appendChild(imagenPLayer);
            }
          }
          break;
        case 'ArrowDown':
          if (!divFicha[contador + 10]?.classList.contains('bg-black')) {
            if (divFicha[contador + 10]?.id) {
              divFicha[(contador += 10)].appendChild(imagenPLayer);
            }
          }
          break;
        case 'ArrowRight':
          if (!divFicha[contador + 1]?.classList.contains('bg-black')) {
            if (divFicha[contador + 1]?.id && contador % 10 != 9) {
              divFicha[++contador].appendChild(imagenPLayer);
            }
          }
          break;

        default:
          teclado += event.key;
          let filas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
          let vecinos = [contador - 1, contador + 1, contador - 10, contador + 10];
          // * Esto es por si pulsa teclas que tiene mas de 2 caracteres como el shift
          if (teclado.length > 2) {
            teclado = '';
          }
          // * Comprobamos que tengamos 2 teclas pulsadas
          if (teclado.length == 2) {
            // *  Usamos uan Expresion Regular para comprobar si las 2 teclas pulsadas cumplen el requisito de estar entre a-1 y luego un 0-9
            if (/[a-i][0-9]/.test(teclado)) {
              // * Buscamos el indice de la fila y luego la 2 tecla la sumamos (porq solo entraba si era un numero de 0-1)
              let destino = filas.indexOf(teclado[0]) * 10 + parseInt(teclado[1]);
              // * Comprobamos que nuesto destino sea vecino de donde estamos es decir que este al lado
              if (vecinos.includes(destino) & !divFicha[destino].classList.contains('bg-black')) {
                contador = destino;
                divFicha[destino].appendChild(imagenPLayer);
              }
            }
            // * Si tiene 2 teclas pero no cumple con la Expresion regular nos quedaremos solo con la 2 letra hasta que la primera letra sea entre a-i y la segunda sea 0-9
            teclado = event.key;
          }
          break;
      }
    }
  } else {
    contador = 0;
    posicionFantasma = [];
    document.body.removeEventListener('keydown', teclas);
  }
  if (divFicha[contador].id == 89) {
    clearInterval(tiempo1);
    clearInterval(perseguir);
    contador = 0;
    posicionFantasma = [];
    document.body.removeEventListener('keydown', teclas);
  }

  posicionFantasma.push(contador);
  posicionJugador = contador;
}
function mover() {
  document.body.addEventListener('keydown', teclas);
}

function jugadorArray() {
  moveset = setInterval(() => {
    if (contadormove < 6) {
      imagenPLayer.setAttribute('src', 'img/' + movimiento[contadormove++]);
    } else {
      contadormove = 0;
    }
  }, 300);
}

const imagenFantasmaArray = ['Fantasma-1.png', 'Fantasma-2.png'];
function IniciarFantasma() {
  idFantasma = setTimeout(() => {
    primero.appendChild(imagenFantasma);
    let contadorFantasmaArray = 0;
    idFantasmaArray = setInterval(() => {
      if (contadorFantasmaArray < 2) {
        imagenFantasma.setAttribute('src', 'img/' + imagenFantasmaArray[contadorFantasmaArray++]);
      } else {
        contadorFantasmaArray = 0;
      }
    }, 700);
    fantasmaPerseguir();
  }, 3000);
}
function fantasmaPerseguir() {
  let contfantasma = 0;
  perseguir = setInterval(() => {
    if (posicionFantasma.length != 0) {
      if (parseInt(divFicha[posicionFantasma[contfantasma]].id) != posicionJugador) {
        divFicha[posicionFantasma[contfantasma++]].appendChild(imagenFantasma);
        cazado = false;
      } else {
        divFicha[posicionFantasma[contfantasma++]].appendChild(imagenFantasma);
        imagenPLayer.remove();
        clearInterval(moveset);
        contfantasma = 0;
        posicionJugador = 0;
        posicionFantasma = [];
        clearInterval(perseguir);
        clearInterval(tiempo1);
        clearInterval(idFantasmaArray);
        cazado = true;
      }
    } else {
      imagenPLayer.remove();
      clearInterval(moveset);
      divFicha[0].appendChild(imagenFantasma);
      clearInterval(perseguir);
      clearInterval(tiempo1);
      clearInterval(idFantasmaArray);
      cazado = true;
    }
  }, 1000);
}
function tiempo() {
  tiempo1 = setInterval(() => {
    segundos.setAttribute('value', ++contadortiempo);
  }, 1000);
}
function cookies() {
  let maximo;
  if (contadortiempo < (maximo = Infinity)) {
    mejortiempo.textContent = contadortiempo;
    maximo = mejortiempo.textContent;
    document.cookie = `mejorTiempo=${mejortiempo.textContent},max-age=216000`;
  }
}

partida.addEventListener('click', () => {
  clearInterval(tiempo1);
  clearInterval(moveset);
  clearInterval(perseguir);
  clearTimeout(idFantasma);
  clearInterval(idFantasmaArray);
  contador = 0;
  cazado = false;
  jugadorArray();
  primero.appendChild(imagenPLayer);
  imagenFantasma.remove();
  mover(contador);
  tiempo();
  IniciarFantasma();
  cookies();
  contadortiempo = 0;
});
