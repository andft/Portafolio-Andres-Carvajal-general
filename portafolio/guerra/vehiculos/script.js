const vehiculosWW1 = [
  {
    tipo: "avion",
    nombre: "Biplano de combate rojo",
    descripcion: "Avión ligero de combate usado para reconocimiento y ataques aéreos. Maniobrable pero frágil.",
    velocidad: 180,
    vida: 100,
    ataque: 50,
    alcance: 300
  },
  {
    tipo: "tractor",
    nombre: "Tractor de suministros",
    descripcion: "Vehículo lento, usado para transporte de artillería y suministros en terrenos difíciles como nieve.",
    velocidad: 20,
    vida: 250,
    ataque: 10,
    alcance: 0
  },
  {
    tipo: "tanque",
    nombre: "Tanque de asalto",
    descripcion: "Blindado pesado diseñado para romper líneas enemigas y resistir fuego de artillería ligera.",
    velocidad: 8,
    vida: 400,
    ataque: 80,
    alcance: 50
  },
  {
    tipo: "carro",
    nombre: "Carro blindado urbano",
    descripcion: "Vehículo ligero blindado para transporte de tropas y patrullaje en ciudades en ruinas.",
    velocidad: 35,
    vida: 150,
    ataque: 30,
    alcance: 30
  },
  {
    tipo: "carruaje",
    nombre: "Carruaje de tropas",
    descripcion: "Transporte tradicional tirado por caballos, lento pero útil para movilizar soldados y suministros.",
    velocidad: 15,
    vida: 100,
    ataque: 0,
    alcance: 0
  },
  {
    tipo: "barco",
    nombre: "Buque de guerra",
    descripcion: "Barco blindado para transporte y bombardeo naval. Gran resistencia y poder de ataque a distancia.",
    velocidad: 25,
    vida: 500,
    ataque: 100,
    alcance: 200
  }
];

const campo = document.getElementById('containerVehiculos');
const vehiculos = document.querySelectorAll('.imagenVehiculo');
let imagenSeleccionada = null;
let zoomActivo = false;
let dataVehiculos = vehiculosWW1;

const overlay = document.createElement('div');
overlay.id = 'overlayBlur';
document.body.appendChild(overlay);

const infoDiv = document.createElement('div');
infoDiv.id = 'infoVehiculo';
infoDiv.style.display = 'none';
infoDiv.style.position = 'absolute';
infoDiv.style.transition = 'all 0.6s ease';
campo.appendChild(infoDiv);

vehiculos.forEach(v => {
  v.addEventListener('click', e => {
    if (zoomActivo) return;

    imagenSeleccionada = v;
    zoomActivo = true;

    campo.style.position = 'relative';
    v.style.transition = 'all 0.6s ease';
    v.style.zIndex = '20';
    v.style.position = 'absolute';

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
    v.style.left = '5%';
    v.style.top = '50%';
    v.style.transform = 'translateY(-50%) scale(2)';

    const nombreVehiculo = img.alt.toLowerCase().trim();
    const info = dataVehiculos.find(
      item => item.tipo.toLowerCase() === nombreVehiculo
    );

    const vehiculoInfo = info || {
      nombre: nombreVehiculo,
      descripcion: "Información no disponible.",
      velocidad: 0,
      vida: 0,
      ataque: 0,
      alcance: 0
    };

    const scale = 2;
    const imgWidth = img.offsetWidth * scale;

    infoDiv.style.top = `50%`;
    infoDiv.style.left = `${5 + (imgWidth / campo.offsetWidth) * 100}%`;
    infoDiv.style.transform = 'translateY(-50%) scale(0)';
    infoDiv.style.display = 'block';

    infoDiv.innerHTML = `
      <h2>${vehiculoInfo.nombre}</h2>
      <p>${vehiculoInfo.descripcion}</p>
      <p><strong>Velocidad:</strong> ${vehiculoInfo.velocidad} km/h</p>
      <p><strong>Vida:</strong> ${vehiculoInfo.vida}</p>
      <p><strong>Ataque:</strong> ${vehiculoInfo.ataque}</p>
      <p><strong>Alcance:</strong> ${vehiculoInfo.alcance}</p>
    `;

    setTimeout(() => {
      infoDiv.style.transform = 'translateY(-50%) scale(1)';
    }, 50);
  });
});

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

    overlay.style.opacity = '0';
    setTimeout(() => (overlay.style.display = 'none'), 400);

    infoDiv.style.transform = 'translateY(-50%) scale(0)';
    setTimeout(() => (infoDiv.style.display = 'none'), 400);

    imagenSeleccionada = null;
    zoomActivo = false;
  }
});

const audio = document.getElementById('backgroundAudio');
const soundToggle = document.getElementById('soundToggle');

audio.volume = 0.4;

soundToggle.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    soundToggle.textContent = '🔊 Sonido Activado';
    soundToggle.classList.remove('muted');
    soundToggle.classList.add('active');
  } else {
    audio.pause();
    soundToggle.textContent = '🔇 Silenciado';
    soundToggle.classList.remove('active');
    soundToggle.classList.add('muted');
  }
});
