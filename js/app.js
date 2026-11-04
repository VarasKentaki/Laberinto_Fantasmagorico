const imagenPLayer = document.createElement('img');
imagenPLayer.setAttribute('class', 'player');
const tablero = document.getElementById('tablero');
const divFicha = document.querySelectorAll('.ficha[id]');
const fichasN = document.querySelectorAll('.bg-black[id]');
const segundos = document.getElementById('segundos');
const partida = document.getElementById('partida');
const primero = document.getElementById('00');
let teclado = '';
let contador = 0;
let tiempo1 = 0;
function mover(contador) {
  document.body.addEventListener('keydown', (event) => {
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
          // * Esto es por si pulsa teclados que tiene mas de 2 caracteres como el shift
          if (teclado.length > 2) {
            teclado = '';
          }
          // * Comprobamos que tengamos 2 teclas pulsadas
          if (teclado.length == 2) {
            // *  Usamos uan Expresion Regular para comprobar si las 2 teclas pulsadas cumplem el requisito de estar entre a-1 y luego un 0-9
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
    if (divFicha[contador].id == 89) {
      clearInterval(tiempo1);
    }
  });
}
let contadormove = 0;
let contadortiempo = 0;
movimiento = [
  'Player-1.png',
  'Player-2.png',
  'Player-3.png',
  'Player-4.png',
  'Player-5.png',
  'Player-6.png',
];

let moveset = setInterval(() => {
  if (contadormove < 6) {
    imagenPLayer.setAttribute('src', 'img/' + movimiento[contadormove++]);
  } else {
    contadormove = 0;
  }
}, 300);
segundos.setAttribute('value', '0');
function tiempo(contadortiempo) {
  tiempo1 = setInterval(() => {
    segundos.setAttribute('value', contadortiempo++);
  }, 1000);
}
partida.addEventListener('click', () => {
  clearInterval(tiempo1);
  primero.appendChild(imagenPLayer);
  tiempo(0);
  mover(contador);
});
