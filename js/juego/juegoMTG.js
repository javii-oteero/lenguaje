// Definición de un objeto que contiene las rutas de las imágenes de las cartas del juego
let cards = {
    c1: "../../img/juego/juegoMTG/anillo.jpg",
    c2: "../../img/juego/juegoMTG/liliana.jpg",
    c3: "../../img/juego/juegoMTG/aves.jpg",
    c4: "../../img/juego/juegoMTG/bolt.jpg",
    c5: "../../img/juego/juegoMTG/lotus.jpg",
    c6: "../../img/juego/juegoMTG/timewalk.jpg"
};

// Cantidad total de cartas
let numCartas = Object.keys(cards).length;

// Número de cartas levantadas actualmente
let cartasLevantadas = 0;

// Variables para almacenar las imágenes de las cartas seleccionadas
let img1, img2;

// Variables para almacenar el HTML de las cartas seleccionadas para revertir si no hay coincidencia
let old_carta, old_carta2;

// Contadores de aciertos y fallos del jugador
let aciertos = 0;
let fallos = 0;

// Selecciona todos los divs que tienen un evento onclick
let divsConOnclick = document.querySelectorAll('div[onclick]');

// Función que inicia el juego
function start(){
    // Reinicia la visibilidad de las cartas
    reiniciarCartas();

    // Crea un diccionario con cada carta duplicada
    const nuevoDiccionario = {};
    for (const clave in cards) {
        const valor = cards[clave];
        nuevoDiccionario[clave] = valor;
        nuevoDiccionario[clave + "_duplicado"] = valor;
    }
    // Randomiza las cartas y las muestra en el tablero
    randomizarCartas(nuevoDiccionario);
}

// Función para reiniciar la visibilidad de las cartas
function reiniciarCartas(){
    let cartas = document.getElementsByClassName("back");
    for (let i = 0; i < cartas.length; i++){
        cartas[i].style.visibility = 'visible';
    }
}

// Función para randomizar las cartas
function randomizarCartas(diccionario){
    // Mezcla las imágenes del diccionario
    let shuffledImages = shuffle(Object.values(diccionario));
    for (let i = 0; i < numCartas*2; i++){
        // Asigna las imágenes randomizadas a las cartas en el tablero
        document.getElementById("img" + (i+1)).setAttribute("src", shuffledImages[i])
    }
}

// Función para mezclar un array utilizando el algoritmo de shuffle de Fisher-Yates
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Función para comprobar si las dos cartas seleccionadas son iguales
function comprueba(){
    if (img1.getAttribute('src') == img2.getAttribute('src')){
        return true;
    } else {
        return false;
    }
}

// Función que revela la carta seleccionada
function reveal(numCarta){
    // Incrementa el contador de cartas levantadas
    cartasLevantadas++;
    let carta = document.getElementById("carta" + numCarta);
    let backCarta = carta.getElementsByClassName("back")[0];
    if (cartasLevantadas == 1){
        // Si es la primera carta levantada, la guarda y oculta su parte trasera
        img1 = document.getElementById("img" + numCarta); 
        old_carta = img1.parentNode.parentNode.outerHTML;
        backCarta.style.visibility = 'hidden';
        carta.removeAttribute("onclick");
    } else if (cartasLevantadas == 2){
        // Si es la segunda carta levantada, la guarda y oculta su parte trasera
        img2 = document.getElementById("img" + numCarta);
        old_carta2 = img2.parentNode.parentNode.outerHTML;
        backCarta.style.visibility = 'hidden';
        carta.removeAttribute("onclick");
        // Si las dos cartas son diferentes, las oculta después de un breve tiempo
        if (!comprueba()){
            setTimeout(function (){
                img1.parentNode.parentNode.outerHTML = old_carta;
                img2.parentNode.parentNode.outerHTML = old_carta2;
            }, 500);
            fallos++;
            document.getElementById('fallos').innerHTML = ("FALLOS: " + fallos);
        } else {
            aciertos++;
        }
        // Reinicia el contador de cartas levantadas
        cartasLevantadas = 0;
    } 
    // Comprueba si se han encontrado todos los aciertos
    compruebaAciertos();
}

// Función que comprueba si se han encontrado todos los aciertos
function compruebaAciertos(){
    if (aciertos == 6){
        // Si se han encontrado todos los aciertos, muestra un mensaje de victoria y sombrea el botón de reinicio
        let cartas = document.getElementsByClassName("carta");
        for (let i = 0; i < cartas.length; i++){
            cartas[i].style.opacity = 0.5;
        }
        document.getElementById('winner').style.visibility = 'visible';
        document.getElementById('reiniciar').style.boxShadow = '0 10px 15px rgba(0,0,0)';
    }
}


// SCRIPT COOKIES
document.addEventListener("DOMContentLoaded", function() {
    var avisoCookies = document.getElementById("avisoCookies");
    var cookiesForm = document.getElementById("cookiesForm");

    // Comprobar si el usuario ya aceptó las cookies
    if (!cookiesAceptadas()) {
        mostrarAvisoCookies();
    }

    // Mostrar el aviso de cookies
    function mostrarAvisoCookies() {
        avisoCookies.style.display = "block";
    }

    // Ocultar el aviso de cookies y almacenar las preferencias del usuario
    function aceptarCookies(event) {
        event.preventDefault();
        avisoCookies.style.display = "none";
        almacenarCookiesAceptadas();
    }

    // Función para verificar si el usuario ya aceptó las cookies
    function cookiesAceptadas() {
        return localStorage.getItem("cookiesAceptadas") === "true";
    }

    // Función para almacenar las preferencias del usuario en el almacenamiento local
    function almacenarCookiesAceptadas() {
        var checkboxes = cookiesForm.querySelectorAll("input[type=checkbox]:checked");
        localStorage.setItem("cookiesAceptadas", "true");
        checkboxes.forEach(function(checkbox) {
            localStorage.setItem(checkbox.name, "true");
        });
    }

    // Agregar evento de envío al formulario de cookies
    cookiesForm.addEventListener("submit", aceptarCookies);
    cookiesForm2.addEventListener("submit", aceptarCookies);

    // Ocultar el aviso de cookies si ya han sido aceptadas
    if (cookiesAceptadas()) {
        avisoCookies.style.display = "none";
    }
});

function visibleAdministrar(){
    document.getElementById('adminCookies').style.visibility = 'visible';
}

function close_window() {
    if (confirm("Se cerrará la pestaña, ya que rehúsas a aceptar mis cookies")) {
      close();
    }
}

function aceptar(){
    document.getElementById('adminCookies').style.visibility = 'hidden';
}