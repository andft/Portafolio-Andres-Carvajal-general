const audio = document.getElementById('audioFondo');
const botonSonido = document.getElementById('botonSonido');

audio.volume = 0.4;

botonSonido.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    botonSonido.textContent = '🔊 Sonido Activado';
    botonSonido.classList.remove('silenciado');
    botonSonido.classList.add('activo');
  } else {
    audio.pause();
    botonSonido.textContent = '🔇 Silenciado';
    botonSonido.classList.remove('activo');
    botonSonido.classList.add('silenciado');
  }
});