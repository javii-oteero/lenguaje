var counterFoto = 1;
var autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(function(){
        document.getElementById('radio' + counterFoto).checked=true;
        counterFoto++;
        if(counterFoto > 5){
            counterFoto = 1;
        }
    }, 4000); 
}

function updateCounter(clickedCounter) {
    clearInterval(autoSlideInterval);
    counterFoto = clickedCounter;
    startAutoSlide();
}

startAutoSlide();