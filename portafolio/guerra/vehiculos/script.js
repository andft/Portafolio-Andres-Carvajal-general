const campo = document.getElementById('containerVehiculos');
const vehiculos = document.querySelectorAll('.imagenVehiculo');
let imagenSeleccionada = null;
let zoomActivo = false;
let dataVehiculos = [];

// --- Cargar datos del JSON externo ---
fetch('./src/vehiculos.json')
  .then(res => res.json())
  .then(data => {
    dataVehiculos = data.vehiculosWW1;
  })
  .catch(err => console.error('Error cargando JSON:', err));

// Crear overlay desenfocado
const overlay = document.createElement('div');
overlay.id = 'overlayBlur';
document.body.appendChild(overlay);

// Crear contenedor de información lateral
const infoDiv = document.createElement('div');
infoDiv.id = 'infoVehiculo';
infoDiv.style.display = 'none';
infoDiv.style.position = 'absolute';
infoDiv.style.transition = 'all 0.6s ease';
campo.appendChild(infoDiv);

// --- Evento de click sobre cada imagen ---
vehiculos.forEach(v => {
  v.addEventListener('click', e => {
    if (zoomActivo) return;

    imagenSeleccionada = v;
    zoomActivo = true;

    campo.style.position = 'relative';
    v.style.transition = 'all 0.6s ease';
    v.style.zIndex = '20';
    v.style.position = 'absolute';

    // Mostrar overlay
    overlay.style.display = 'block';
    setTimeout(() => (overlay.style.opacity = '1'), 10);

    const img = v.querySelector('img');
    img.classList.add('activa');

    const rect = v.getBoundingClientRect();
    const campoRect = campo.getBoundingClientRect();
    const startX = rect.left - campoRect.left;
    const startY = rect.top - campoRect.top;

    v.style.left = `${startX}px`;
    v.style.top = `${startY}px`;
    v.style.transformOrigin = 'center center';

    void v.offsetWidth;

    // Movimiento y zoom hacia la izquierda
    v.style.left = '5%';
    v.style.top = '50%';
    v.style.transform = 'translateY(-50%) scale(2)';

    // --- Buscar datos del vehículo en el JSON ---
    const nombreVehiculo = img.alt.toLowerCase();
    const info = dataVehiculos.find(
      item => item.tipo.toLowerCase() === nombreVehiculo
    );

    // Si no encuentra coincidencia, usar valores por defecto
    const vehiculoInfo = info || {
      nombre: nombreVehiculo,
      descripcion: "Información no disponible.",
      velocidad: 0,
      vida: 0,
      ataque: 0,
      alcance: 0
    };

    // --- INFO DIV ---
    const scale = 2;
    const imgWidth = img.offsetWidth * scale;

    infoDiv.style.top = `50%`;
    infoDiv.style.left = `${5 + imgWidth / campo.offsetWidth * 100}%`;
    infoDiv.style.transform = 'translateY(-50%) scale(0)';
    infoDiv.style.display = 'block';

    // Contenido con datos del JSON
    infoDiv.innerHTML = `
      <h2>${vehiculoInfo.nombre}</h2>
      <p>${vehiculoInfo.descripcion}</p>
      <p><strong>Velocidad:</strong> ${vehiculoInfo.velocidad} km/h</p>
      <p><strong>Vida:</strong> ${vehiculoInfo.vida}</p>
      <p><strong>Ataque:</strong> ${vehiculoInfo.ataque}</p>
      <p><strong>Alcance:</strong> ${vehiculoInfo.alcance}</p>
    `;

    // Animación de aparición
    setTimeout(() => {
      infoDiv.style.transform = 'translateY(-50%) scale(1)';
    }, 50);
  });
});

// --- Evento de doble click para cerrar ---
campo.addEventListener('dblclick', () => {
  if (imagenSeleccionada) {
    const img = imagenSeleccionada.querySelector('img');

    img.classList.remove('activa');

    imagenSeleccionada.style.transition = 'all 0.6s ease';
    imagenSeleccionada.style.transform = 'scale(1)';
    imagenSeleccionada.style.left = '';
    imagenSeleccionada.style.top = '';
    imagenSeleccionada.style.position = '';
    imagenSeleccionada.style.zIndex = '';

    // Ocultar overlay
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 400);

    // Ocultar info con animación inversa
    infoDiv.style.transform = 'translateY(-50%) scale(0)';
    setTimeout(() => {
      infoDiv.style.display = 'none';
    }, 400);

    imagenSeleccionada = null;
    zoomActivo = false;
  }
});

const audio = document.getElementById('backgroundAudio');
const soundToggle = document.getElementById('soundToggle');

// Ajusta volumen de ambiente
audio.volume = 0.4;

soundToggle.addEventListener('click', () => {
  if (audio.paused) {
    // 🔊 Activar sonido ambiente
    audio.play();
    soundToggle.textContent = '🔊 Sound On';
    soundToggle.classList.remove('muted');
    soundToggle.classList.add('active');
  } else {
    // 🔇 Apagar sonido ambiente
    audio.pause();
    soundToggle.textContent = '🔇 Mute';
    soundToggle.classList.remove('active');
    soundToggle.classList.add('muted');
  }
});