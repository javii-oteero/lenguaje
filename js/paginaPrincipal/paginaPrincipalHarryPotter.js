document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slider.children.length;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`; // Movemos el slider
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slider.children.length) % slider.children.length;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`; // Movemos el slider
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Cambia automáticamente de slide cada 3 segundos
    setInterval(nextSlide, 3000);

});

//------------------------Video----------------------------
document.addEventListener('DOMContentLoaded', function() {
    var playBtn = document.querySelector('.watch-video-btn');
    var videoContainer = document.getElementById('video-player');
    var video = document.querySelector('#video-player iframe');
    videoContainer.style.display = 'none';

    playBtn.addEventListener('click', function() {
        videoContainer.style.display = 'block';
        var videoUrl = video.src;
        if (videoUrl.indexOf('?') !== -1) {
            video.src += '&autoplay=1';
        } else {
            video.src += '?autoplay=1';
        }
        document.body.style.overflow = 'hidden';
    });

    var closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', function() {
        var videoUrl = video.src;
        video.src = videoUrl.replace('&autoplay=1', '').replace('?autoplay=1', '');
        videoContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});





//Calendario 
//Le añadiré lo de los eventos 

let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

let FechaActual = new Date();
let DiaActual = FechaActual.getDate();
let MesActual = FechaActual.getMonth();
let AnyoActual = FechaActual.getFullYear();

let MesDetectado = FechaActual.getMonth();
let DiaDetect = FechaActual.getDate();
let AnyoDetec = FechaActual.getFullYear();


let Fechas = document.getElementById('fechas');
let Mes = document.getElementById('mes_actual');
let Anyo = document.getElementById('anyo_actual');

let MesPrev = document.getElementById('mes-prev');
let MesSig = document.getElementById('mes-sig');

Mes.textContent = meses[MesActual];

Anyo.textContent = AnyoActual.toString();

let TextoEvento = document.getElementById("textoEvent");

MesPrev.addEventListener('click', () => UltMes());
MesSig.addEventListener('click', () => SigMes());

let Eventos = [
    { date: new Date(2022, 6, 7), text: ''},
    { date: new Date(2022, 7, 24), text: ''},
    { date: new Date(2023, 4, 23), text: ''},
    { date: new Date(2023, 11, 1), text: ''},
];

const EscribirMes = (Mes) => {

    for (let i = EmpezarDia(); i > 0; i--) {
        Fechas.innerHTML += ` <div class="calendar_dia calendar_item calendar_ultimosdias">
          ${TotalDias(MesActual - 1) - (i - 1)}
      </div>`;
    }

    let HayEvento = false;
    let eventosCercanosEncontrados = false;

    const fechaLimiteNext = new Date();
    fechaLimiteNext.setDate(fechaLimiteNext.getDate() + 7);

    const fechaLimitePrev = new Date();
    fechaLimitePrev.setDate(fechaLimitePrev.getDate() - 7);

    for (let i = 1; i <= TotalDias(Mes); i++) {
        HayEvento = false;
        eventosCercanosEncontrados = false;

        for (let j = 0; j < Eventos.length; j++) {
            const eventoFecha = Eventos[j].date;

            if (eventoFecha.getFullYear() == AnyoActual && eventoFecha.getMonth() == MesActual && eventoFecha.getDate() == i) {
                HayEvento = true;

                const fechaActual = new Date();

                const diasDiferencia = Math.ceil((eventoFecha.getTime() - fechaActual.getTime()) / (1000 * 3600 * 24));
                if ((diasDiferencia >= 0 && diasDiferencia <= 7) || (diasDiferencia < 0 && Math.abs(diasDiferencia) <= 7)) {
                    eventosCercanosEncontrados = true;
                    Fechas.innerHTML += ` <div class="calendar_dia calendar_item calendar_evento_cercano" onclick="verTexto(${j})">${i}</div>`;
                } else {
                    Fechas.innerHTML += ` <div class="calendar_dia calendar_item calendar_evento_lejano" onclick="verTexto(${j})">${i}</div>`;
                }
            }
        }
        if (HayEvento == false) {
            if (AnyoDetec === AnyoActual && i === DiaDetect && MesDetectado === Mes) {
                Fechas.innerHTML += ` <div class="calendar_dia calendar_item calendar_hoy">${i}</div>`;
            } else {
                Fechas.innerHTML += ` <div class="calendar_dia calendar_item">${i}</div>`;
            }
        }
    }
}

function verTexto(eleccionEvento){ 
        TextoEvento.textContent = Eventos[eleccionEvento].text;
}

const TotalDias = Mes => {
    if (Mes === -1) Mes = 11;

    if (Mes == 0 || Mes == 2 || Mes == 4 || Mes == 6 || Mes == 7 || Mes == 9 || Mes == 11) {
        return 31;

    } else if (Mes == 3 || Mes == 5 || Mes == 8 || Mes == 10) {
        return 30;

    } else {

        return EsBisiesto() ? 29 : 28;
    }
}

const EsBisiesto = () => {
    return ((AnyoActual % 100 !== 0) && (AnyoActual % 4 === 0) || (AnyoActual % 400 === 0));
}


const EmpezarDia = () => {
    let Comenzar = new Date(AnyoActual, MesActual, 1);
    return ((Comenzar.getDay() - 1) === -1) ? 6 : Comenzar.getDay() - 1;
}

const AnyoMinimo = 2020; 
const AnyoMaximo = 2123; 

const UltMes = () => {
    MesSig.style.display = "block";
    if (MesActual !== 0) {
        MesActual--;
    } else if (AnyoActual == AnyoMinimo) {
        MesPrev.style.display = "none";
    } else {
        MesActual = 11;
        AnyoActual--;
    }
    NuevaFecha();
}

const SigMes = () => {
    MesPrev.style.display = "block";
    if (MesActual !== 11) {
        MesActual++;
    } else if (AnyoActual == AnyoMaximo) {
        MesSig.style.display = "none";
    } else {
        MesActual = 0;
        AnyoActual++;
    }
    NuevaFecha();

}

const NuevaFecha = () => {
    FechaActual.setFullYear(AnyoActual, MesActual, DiaActual);
    Mes.textContent = meses[MesActual];
    Anyo.textContent = AnyoActual.toString();
    Fechas.textContent = '';
    EscribirMes(MesActual);
}

EscribirMes(MesActual);

//Script Cookies
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
    alert("!ALOHOMORA")
    close();
    
}

function aceptar(){
    document.getElementById('adminCookies').style.visibility = 'hidden';
}




