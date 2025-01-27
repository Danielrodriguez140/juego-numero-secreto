/* ----VARIAVLES----------- ------------------------*/

let maxDeNumeros = 6;
let numeroSecreto = null; // null deja en espera que algo resivira
let reinicia = document.getElementById("reiniciar");
let maxIntentos = 3;
let intento = 0;
let arrayNumSecret = [];

/* ------FUNCIONES------------------------------------ */

function clearArray() {
  arrayNumSecret = [];
  return reinicia.removeAttribute("disabled");
}

/* creamos esta funcion para dar inicio al juego y reiniciar */
function condicionesIniciales() {
  numeroSecreto = numeroSecretoAliatorio();

  console.log(numeroSecreto);
  console.log(arrayNumSecret);

  asiganarTextoElemento("h1", "Juego del Numero Secreto");

  asiganarTextoElemento(
    ".texto__parrafo",
    `Ingresa un numero entre 1 y ${maxDeNumeros}`
  );
  intento = 1;
}

/* esta funcion da da funcionalidad al boton "jugar de nuevo" y reinicia el juego*/
function nuevoJuego() {
  clearInput();

  condicionesIniciales();

  // Otro modo de hacer que no se repita el numero secreto

  /* for (let i = 0; i < arrayNumSecret.length - 1; i++) {
    if (arrayNumSecret[arrayNumSecret.length - 1] == arrayNumSecret[i]) {
      arrayNumSecret.pop();
      nuevoJuego();
    }
  }
  if (arrayNumSecret.length == maxDeNumeros) {
    arrayNumSecret = [];
    return reinicia.removeAttribute("disabled");
  } */

  reinicia.setAttribute("disabled", true);
}

/* esta funcion limpia el campo del input */
function clearInput() {
  document.getElementById("valorUsuario").value = "";
}

/* pedimos que nos genere un numero random */
function numeroSecretoAliatorio() {
  let numeroGenerado = Math.floor(Math.random() * maxDeNumeros) + 1;

  if (arrayNumSecret.includes(numeroGenerado)) {
    return numeroSecretoAliatorio();
  } else {
    arrayNumSecret.push(numeroGenerado);
    return numeroGenerado;
  }
}

/* creamos esta funcion para generalizar el cambio de contenido de los elementos
 */
function asiganarTextoElemento(elemento, texto) {
  let elementoHtml = document.querySelector(elemento);
  elementoHtml.innerHTML = texto;
  return;
}

function verificarIntento() {
  let numeroUsuario = parseInt(document.getElementById("valorUsuario").value); //tomamos el valor que ingresa el usuario mediante el imput

  if (arrayNumSecret.length == maxDeNumeros) {
    asiganarTextoElemento(
      ".texto__parrafo",
      `ya probaste todos los nuemros que eran del 1 al ${maxDeNumeros}, vuelve a jugar de nuevo`
    );
    clearArray();
    return;
  }

  //si el numero dado esta fuera del rango del juego
  if (!(1 <= numeroUsuario && numeroUsuario <= maxDeNumeros)) {
    asiganarTextoElemento(
      ".texto__parrafo",
      `debe ser entre 1 y ${maxDeNumeros}, vuelve a jugar de nuevo`
    );

    clearArray();

    return;
  }

  if (numeroSecreto == numeroUsuario) {
    asiganarTextoElemento(
      ".texto__parrafo",
      `Ganaste!!!, el numero Secreto es: ${numeroSecreto} y con ${intento} ${
        intento > 1 ? "intentos" : "intento"
      }!!`
    );

    reinicia.removeAttribute("disabled");
  } else if (intento == maxIntentos) {
    asiganarTextoElemento(
      ".texto__parrafo",
      `Superaste el numero de intentos que es ${intento}, vuelte a intentarlo de nuevo!!!`
    );
    reinicia.removeAttribute("disabled");
  } else {
    if (numeroSecreto < numeroUsuario) {
      asiganarTextoElemento(".texto__parrafo", `El numero es menor`);
      clearInput();
    } else {
      asiganarTextoElemento(".texto__parrafo", `El numero es mayor`);
      clearInput();
    }
    intento++;
    return;
  }
}

/* --------------------EJECUTAR FUCIONES--------- */

// llamamos a las funcion para darle contenido a los elementos

condicionesIniciales();
