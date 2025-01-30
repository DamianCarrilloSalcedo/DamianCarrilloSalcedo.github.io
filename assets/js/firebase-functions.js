// Importamos las funciones necesarias de Firebase Database
import { ref, onValue } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
import { database } from "./firebase-config.js";

// Definimos la pagina inicial del ranking
let paginaActual = 1;

// Establecemos la cantidad de resultados que se mostraran por pagina
const resultadosPorPagina = 5;

// Creamos un array vacio donde guardaremos la lista ordenada de jugadores
let rankingArray = [];

// Funcion para cargar el ranking desde la base de datos
export function cargarRanking() {
    // Obtenemos el elemento HTML donde se mostrara la lista del ranking
    const listaRanking = document.getElementById("ranking-list");

    // Obtenemos el elemento HTML donde se mostrara el mensaje de carga
    const mensajeCargando = document.getElementById("loading-message");

    // Obtenemos el elemento HTML donde se mostrara el paginador
    const paginador = document.getElementById("paginador");

    // Creamos una referencia a la base de datos en la ruta "datosJugador"
    const referenciaRanking = ref(database, "datosJugador");

    // Escuchamos los cambios en la base de datos en tiempo real
    onValue(referenciaRanking, (snapshot) => {
        // Obtenemos los datos de la base de datos
        const datos = snapshot.val();

        // Si no hay datos en la base de datos, mostramos un mensaje y limpiamos la tabla y el paginador
        if (!datos) {
            mensajeCargando.textContent = "No hay datos en el ranking.";
            listaRanking.innerHTML = "";
            paginador.innerHTML = "";
            return;
        }

        // Convertimos los datos en un array y los ordenamos de mayor a menor segun la puntuacion
        rankingArray = Object.values(datos).sort((a, b) => b.puntuacion - a.puntuacion);

        // Ocultamos el mensaje de carga
        mensajeCargando.style.display = "none";

        // Llamamos a la funcion para renderizar la tabla con los datos obtenidos
        renderizarTabla();
    });
}

// Funcion para renderizar la tabla con los jugadores segun la pagina actual
function renderizarTabla() {
    // Obtenemos el elemento HTML donde se mostrara la lista del ranking
    const listaRanking = document.getElementById("ranking-list");

    // Limpiamos la tabla antes de agregar los nuevos datos
    listaRanking.innerHTML = "";

    // Calculamos el indice de inicio segun la pagina actual
    const inicio = (paginaActual - 1) * resultadosPorPagina;

    // Obtenemos solo los datos correspondientes a la pagina actual
    const datosPagina = rankingArray.slice(inicio, inicio + resultadosPorPagina);

    // Recorremos los jugadores de la pagina actual y los agregamos a la tabla
    datosPagina.forEach((jugador, index) => {
        // Creamos una fila en formato HTML con la posicion, nombre y puntuacion del jugador
        const fila = `<tr>
            <td>${inicio + index + 1}</td>
            <td>${jugador.nombre}</td>
            <td>${jugador.puntuacion}</td>
        </tr>`;

        // Agregamos la fila al contenido de la tabla
        listaRanking.innerHTML += fila;
    });

    // Llamamos a la funcion para renderizar el paginador
    renderizarPaginador();
}

// Funcion para renderizar el paginador
function renderizarPaginador() {
    // Obtenemos el elemento HTML donde se mostrara el paginador
    const paginador = document.getElementById("paginador");

    // Limpiamos el paginador antes de actualizarlo
    paginador.innerHTML = "";

    // Calculamos el total de paginas segun la cantidad de jugadores
    const totalPaginas = Math.ceil(rankingArray.length / resultadosPorPagina);

    // Si solo hay una pagina, no mostramos el paginador
    if (totalPaginas <= 1) return;

    // Creamos el boton para ir a la pagina anterior
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "Anterior";

    // Deshabilitamos el boton si estamos en la primera pagina
    btnAnterior.disabled = paginaActual === 1;

    // Agregamos un evento al boton para cambiar a la pagina anterior
    btnAnterior.addEventListener("click", () => cambiarPagina(-1));

    // Creamos un elemento de texto para mostrar la pagina actual y el total de paginas
    const textoPagina = document.createElement("span");
    textoPagina.textContent = ` Pagina ${paginaActual} de ${totalPaginas} `;

    // Creamos el boton para ir a la siguiente pagina
    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "Siguiente";

    // Deshabilitamos el boton si estamos en la ultima pagina
    btnSiguiente.disabled = paginaActual === totalPaginas;

    // Agregamos un evento al boton para cambiar a la siguiente pagina
    btnSiguiente.addEventListener("click", () => cambiarPagina(1));

    // Agregamos los botones y el texto al paginador
    paginador.appendChild(btnAnterior);
    paginador.appendChild(textoPagina);
    paginador.appendChild(btnSiguiente);
}

// Funcion para cambiar de pagina y actualizar la tabla
function cambiarPagina(cambio) {
    // Modificamos el numero de la pagina actual segun el cambio
    paginaActual += cambio;

    // Llamamos a la funcion para renderizar la tabla con la nueva pagina
    renderizarTabla();
}
