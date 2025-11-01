const audio = document.getElementById('audioFondo');
const botonSonido = document.getElementById('botonSonido');

// Ajusta volumen de ambiente
audio.volume = 0.4;

botonSonido.addEventListener('click', () => {
  if (audio.paused) {
    // 🔊 Activar sonido ambiente
    audio.play();
    botonSonido.textContent = '🔊 Sonido Activado';
    botonSonido.classList.remove('silenciado');
    botonSonido.classList.add('activo');
  } else {
    // 🔇 Apagar sonido ambiente
    audio.pause();
    botonSonido.textContent = '🔇 Silenciado';
    botonSonido.classList.remove('activo');
    botonSonido.classList.add('silenciado');
  }
});