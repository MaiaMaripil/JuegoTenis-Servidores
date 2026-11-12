/***
 * Código para reproducir musica de fondo y efectos de sonido 
*/

const musicabg = new Audio('/assets/sfx/background_music.ogg');
const sonidoClick = new Audio('/assets/sfx/ui-click.mp3');

musicabg.loop = true;
musicabg.volume = 0.3;
sonidoClick.volume = 0.8;
sonidoClick.preload = 'auto';

// Reproducir musica de fondo navegando por las paginas
const tiempoGuardado = Number.parseFloat(localStorage.getItem('tiempoMusica') || '');
if (Number.isFinite(tiempoGuardado) && tiempoGuardado >= 0) {
    musicabg.currentTime = tiempoGuardado;
}

function iniciarMusica() {
    if (musicabg.paused) {
        musicabg.play().catch(() => {
            console.log('El navegador bloqueo el autoplay');
        });
    }
}

musicabg.play().catch(() => {
    console.log('Esperando interacción para audio');
});

window.addEventListener('beforeunload', () => {
    localStorage.setItem('tiempoMusica', String(musicabg.currentTime));
});

document.addEventListener('pointerdown', (event) => {
    if (event.target instanceof Element) {
        const elementoInteractivo = event.target.closest('a, button, .boton');
        
        if (elementoInteractivo) {
            sonidoClick.currentTime = 0;
            
            sonidoClick.play().catch(() => {
                console.log('No se pudo reproducir el efecto de sonido');
            });
            
            iniciarMusica();
        }
    }
});
