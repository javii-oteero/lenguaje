let caras = {
    c1: "../../img/dados/dadosJavi/d1.png",
    c2: "../../img/dados/dadosJavi/d2.png",
    c3: "../../img/dados/dadosJavi/d3.png",
    c4: "../../img/dados/dadosJavi/d4.png",
    c5: "../../img/dados/dadosJavi/d5.png",
    c6: "../../img/dados/dadosJavi/d6.png"
};
let numDadosP1 = 12;
let numDadosP2 = 12;
let puntosP1 = 0;
let puntosP2 = 0;
let numTirada = 0;

function lanzar(){
    if (numTirada < 3){
        numTirada++;
        let numDadosGastados = document.getElementById('dados_player1').value;
        let numDadosGastados2 = document.getElementById('dados_player2').value;
        let cont1 = document.getElementById('container_dados1');
        let cont2 = document.getElementById('container_dados2');
        let total1 = 0, total2 = 0;
        reiniciarContenedorDados(cont1, cont2);
        for (let i = 0; i < numDadosGastados; i++){
            let dado = crearDadoRandom();
            cont1.appendChild(dado);
            total1 = sumar(total1, dado.getAttribute('src'));
        }
        for (let i = 0; i < numDadosGastados2; i++){
            let dado = crearDadoRandom();
            cont2.appendChild(dado);
            total2 = sumar(total2, dado.getAttribute('src'));
        }
        actualizarContador(total1, total2);
        restarOpciones(numDadosGastados, numDadosGastados2);
        if (numTirada == 3 && puntosP1 != puntosP2) alert(puntosP1 > puntosP2 ? 'GANA EL JUGADOR 1' : 'GANA EL JUGADOR 2');
        else if (numTirada == 3) alert('EMPATE!!!')
    } else {
        alert('Juego terminado, recarga para jugar otra vez')
    }
    
}

function crearDadoRandom(){
    let dado = document.createElement('img');
        dado.setAttribute('src', randomDado());
        dado.setAttribute('class', 'dado');
    return dado;
}

function restarOpciones(numDadosGastados, numDadosGastados2){
    let select1 = document.getElementById("dados_player1");
    let select2 = document.getElementById("dados_player2");
    for (let i = 0; i < numDadosGastados; i++) {
        select1.removeChild(select1.options[select1.length - 1]);
    }
    for (let i = 0; i < numDadosGastados2; i++) {
        select2.removeChild(select2.options[select2.length - 1]);
    }
    numDadosP1 = Math.max(numDadosP1 - numDadosGastados, 0);
    numDadosP2 = Math.max(numDadosP2 - numDadosGastados2, 0);
}

function reiniciarContenedorDados(cont1, cont2){
    cont1.innerHTML = "";
    cont2.innerHTML = "";
}

function actualizarContador(num1, num2){
    if (num1 > num2){
        puntosP1++;
    } else if (num2 > num1){
        puntosP2++;
    }
    document.getElementById('result1').textContent = "PUNTOS DE TIRADA: " + num1;
    document.getElementById('result2').textContent = "PUNTOS DE TIRADA: " + num2;
    document.getElementById('marcador').innerHTML = puntosP1 + " : " + puntosP2;
}

function sumar(total, atributo){
    if (atributo == caras.c1) total += 1;
    else if (atributo == caras.c2) total += 2;
    else if (atributo == caras.c3) total += 3;
    else if (atributo == caras.c4) total += 4;
    else if (atributo == caras.c5) total += 5;
    else if (atributo == caras.c6) total += 6;
    return total;
}

function randomDado(){
    let dado = "c" + Math.floor(Math.random() * (7 - 1) + 1);
    return caras[dado];
}