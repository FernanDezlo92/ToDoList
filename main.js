const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
const nombrePersona = document.querySelector("#nombrePersona");

let LIST;
let id;
let NOMBREP;

//Funcion para guardar el nombre de la persona

function cargarNombrePersona(NOMBREPERSONAL) {
  if (NOMBREP == false) {
    NOMBREPERSONAL = prompt("¿Como te llamas?: ");
  }
  nombrePersona.innerHTML = `Hola,${NOMBREPERSONAL}`; //Carga el nombre de la persona
  NOMBREP.push(NOMBREPERSONAL);
  localStorage.setItem("NOMBRE", JSON.stringify(NOMBREP));
}

//Funcion para agregar fecha
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es-ES", {
  weekday: "long",
  month: "short",
  day: "numeric",
}); //Muestra la fecha en el html

//Funcion agregar tarea con el estilo predefinido

function agregarTarea(tarea, id, realizado, eliminado) {
  //Plantilla para ir creando tareas

  if (eliminado) {
    //Si la tarea esta eliminada, no se agrega
    return;
  }

  const REALIZADO = realizado ? check : uncheck; //Si la tarea esta realizada o no

  const LINE = realizado ? lineThrough : ""; //Si la tarea esta realizada o no

  const elemento = ` 
                        <li id = "elemento">
                        <i class="far ${REALIZADO} co" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash-alt" data="eliminado" id="${id}"></i>
                        </li>
                    `;

  lista.insertAdjacentHTML("beforeend", elemento); //Inserta el elemento en la lista antes del final en el html
}

// funcion de tarea realizada

function tareaRealizada(element) {
  // lee el elemento por que dependiendo de donde se haga click, se hara una u otra, esto viene de la funcion de seleccionar tareas
  element.classList.toggle(check); //cambia el estado de la clase " añade una" cuando detecta un click, y la quita cuando detecta otro click (la clase esta en las constantes) taggle
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough); // Para ver los elementos padre, selecciona el elemento de texto, es lo que trae element y element pertenece al li y con el taggle le añade la clase line-through
  LIST[element.id].realizado = !LIST[element.id].realizado; //Cambia el estado de la tarea de primero sera false
}

// funcion de eliminar tarea

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode); //Elimina el elemento padre del elemento que se haya seleccionado
  LIST[element.id].eliminado = true; //Cambia el estado de la tarea cuando tocas la basura es true
}

// funcion para agregar tareas pero presionando el boton (+) solo sirve si le das al boton

botonEnter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea, id, false, false);
    LIST.push({
      id: id,
      nombre: tarea,
      realizado: false,
      eliminado: false,
    });
  }

  localStorage.setItem("to-do", JSON.stringify(LIST)); //Guarda la lista en el localStorage

  input.value = "";
  id++;
});

// funcion para agregar tareas pulsando (enter) dentro de toda la pagina por eso se pone document

document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      LIST.push({
        id: id,
        nombre: tarea,
        realizado: false,
        eliminado: false,
      });
    }

    localStorage.setItem("to-do", JSON.stringify(LIST));

    input.value = "";
    id++;
  }
});

// funcion para seleccionar las tareas realizadas o eliminarlas

lista.addEventListener("click", function (event) {
  const element = event.target; //El elemento que se clickeo da todo la informacion del bloque de codigo
  const elementData = element.attributes.data.value; // la clase attribute genera un atributo data (lista) con los indicadores del elemento, cuando los coja lee el valor de data y el valor que tiene dentro.
  if (elementData === "realizado") {
    tareaRealizada(element);
  } else {
    tareaEliminada(element);
  }

  localStorage.setItem("to-do", JSON.stringify(LIST));
});

// LocalStorage getItem para cargar la lista

let data = localStorage.getItem("to-do");
if (data) {
  LIST = JSON.parse(data); //Convierte el string en el formato utilizado (en este caso un array)
  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}

function cargarLista(DATA) {
  DATA.forEach(function (i) {
    //Recorre el array y los manda a llamar
    agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
  });
}

//LocalStorage para cargar el nombre de la persona

let dataName = localStorage.getItem("NOMBRE");
if (dataName) {
  NOMBREP = JSON.parse(dataName);
  id2 = NOMBREP.length;
  cargarNombre(NOMBREP);
} else {
  NOMBREP = [];
  cargarNombrePersona();
}

function cargarNombre() {
  cargarNombrePersona(NOMBREP);
}
