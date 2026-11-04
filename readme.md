# 🧭 Reto Semana: El Laberinto (Indiana Jones)

## Contexto

El reto de esta semana está basado en un **examen real de la primera evaluación del año 2023** del módulo **Desarrollo Web en Entorno Cliente (DWEC)**.

El ejercicio consiste en desarrollar un **mini juego tipo laberinto**, inspirado en *Indiana Jones*, en el que el jugador debe **recorrer un tablero hasta llegar a la meta en el menor tiempo posible**, evitando obstáculos y siendo perseguido por un **fantasma** que sigue su mismo recorrido.

📄 El enunciado completo del ejercicio se encuentra en el **PDF proporcionado**.

---

## 🎯 Objetivo del reto

Desarrollar toda la lógica del juego **exclusivamente en JavaScript**, cumpliendo estrictamente las reglas del examen:

- Crear dinámicamente el jugador dentro del tablero.
- Mover el jugador usando **teclas de cursor**.
- Respetar los límites del laberinto y los muros (`bg-black`).
- Permitir movimientos adicionales mediante **teclas tipo A1, B3, etc.**
- Animar al jugador mediante sprites.
- Medir el tiempo que tarda el jugador en llegar a la meta.
- Crear un **fantasma** que recorra el camino del jugador.
- Detectar colisiones entre jugador y fantasma.
- Guardar el mejor tiempo usando **cookies**.

---

## Solución

La solución completa se puede ver en:

[https://www.handmadegames.org/jorge/1-evaluacion-examen-b-2023/](https://www.handmadegames.org/jorge/1-evaluacion-examen-b-2023/)

Y aquí se puede jugar:  --> [PLAY 👾](https://www.handmadegames.org/jorge/1-evaluacion-examen-b-2023/) <--

### Cómo jugar

- Pulsar el botón `Empezar partida`.
- Mover al jugador con las flechas del teclado.
- Encontrar la salida y evitar que el fantasma nos atrape en el menor tiempo posible.

---

## 🧱 Resumen de la implementación

- El tablero está formado por una cuadrícula de `div` con identificadores.
- El jugador comienza en la casilla `00`.
- El objetivo final es llegar a la casilla `89`.
- Algunas casillas son muros (`bg-black`) y no se pueden atravesar.
- El tiempo comienza a contar al iniciar la partida.
- Tras unos segundos, aparece un **fantasma** que sigue el mismo camino que recorrió el jugador.

---

## 🎮 Controles del juego

### Movimiento con teclado

- ⬅️ Flecha izquierda
- ⬆️ Flecha arriba
- ➡️ Flecha derecha
- ⬇️ Flecha abajo

> ⚠️ El jugador **solo puede moverse**:
- A casillas que tengan `id`
- Que no tengan la clase `bg-black`
- Que estén justo a la izquierda, derecha, arriba o abajo

---

### Movimiento por coordenadas (extra)

También se permite mover el jugador escribiendo una **letra seguida de un número**  
(por ejemplo: `A2`, `C5`, etc.), siempre que:

- El formato sea correcto (usando **expresiones regulares**).
- La casilla exista.
- No sea un muro.
- Sea adyacente a la posición actual.

---

## 🕺 Animaciones

### Jugador

El jugador debe animarse cambiando su sprite cada **300 ms**, siguiendo este orden:

```js
[
  "Player-1.png",
  "Player-2.png",
  "Player-3.png",
  "Player-4.png",
  "Player-5.png",
  "Player-6.png"
]
```
Al llegar al último sprite, la animación vuelve a empezar.

### Fantasma

- Aparece 3 segundos después de iniciar la partida.

- Recorre el mismo camino que hizo el jugador.

- Avanza una casilla por segundo.

- Se anima cada `700 ms` alternando entre:

```js
["Fantasma-1.png", "Fantasma-2.png"]
```

### 👻 Si el fantasma alcanza al jugador:

- El jugador deja de moverse.

- El jugador desaparece.

- El contador de tiempo se detiene.

--- 

## ⏱️ Control del tiempo

- El input `#segundos` empieza en `0`.

- Aumenta cada segundo mientras la partida está activa.

- Se detiene cuando:

  - El jugador llega a la casilla `89`

  - O el fantasma alcanza al jugador

--- 

## 🍪 Mejor tiempo (Cookies)

- Si el jugador llega a la meta (`id="89"`):

    - Se compara su tiempo con el mejor tiempo guardado.

    - Si es mejor, se guarda en una cookie válida hasta las 00:00 del día siguiente.

    - El valor se muestra en el `span.tiempos`.

- Al cargar la página:

    - Se leen las cookies.

    - Si existe un mejor tiempo, se muestra automáticamente.

--- 

# Lo que debes saber antes de empezar

## 🔑 Eventos de teclado en JavaScript

En JavaScript, se puede detectar cuándo el usuario pulsa una tecla usando los eventos:

- `keydown` → se dispara cuando se presiona una tecla (y se mantiene si la tecla se mantiene pulsada).

- `keyup` → se dispara cuando se suelta una tecla.

- `keypress` → se disparaba al pulsar teclas que producen caracteres (menos usado hoy).

### **1. Escuchar el evento**

Se hace con `addEventListener` sobre window o un elemento:

```js
window.addEventListener("keydown", procesaTecla);
```
> `keydown`: tipo de evento.
> `procesaTecla`: función que se ejecuta cuando se presiona una tecla.


### **2. La función manejadora (`procesaTecla`)**
Un ejemplo útil para nuestro reto:

```js
function procesaTecla(e: KeyboardEvent) {
  e.preventDefault(); // evita que la página haga scroll con las flechas
  if (e.repeat || gameOver) return; // ignorar si se mantiene la tecla o el juego ha terminado

  switch (e.keyCode) {
    case 37: // flecha izquierda
      // mover jugador a la izquierda
      break;
    case 38: // flecha arriba
      // mover jugador hacia arriba
      break;
    case 39: // flecha derecha
      // mover jugador a la derecha
      break;
    case 40: // flecha abajo
      // mover jugador hacia abajo
      break;
  }
}
```

### **3. Propiedades importantes del evento**

- `e.key` → nombre de la tecla (ej: `ArrowLeft`, `a`)

- `e.keyCode` → código numérico de la tecla (ej: `37` = izquierda, `38` = arriba)

- `e.repeat` → indica si la tecla se mantiene pulsada (`true` o `false`)

- `e.preventDefault()` → evita que el navegador haga la acción por defecto (como *scrollar* la página al usar flechas)

---

## 🛠️ Tecnologías utilizadas

- HTML (estructura proporcionada)

- CSS / TailwindCSS (NO modificar)

- JavaScript puro

- Cookies

- Eventos de teclado

- Manipulación del DOM

- Timers (`setInterval`, `setTimeout`)

---

## 🧠 Lo que estás practicando con este reto

- Eventos de teclado (keydown)

- Control de movimiento en cuadrículas

- Detección de colisiones

- Animaciones con sprites

- Gestión del tiempo

- Uso real de cookies

- Lógica de juego

- Organización del código

---

## 🏁 Reto extra (opcional)
### **Cuando lo completes ... ¿serías capaz de hacerlo en TypeScript? 🤔**