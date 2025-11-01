const armas = {
    granada: {
        nombre: "Granada MK2",
        tipo: "Explosivo",
        daño: 95,
        alcance: "Corto",
        descripcion: "Granada de fragmentación estándar utilizada en la Primera Guerra Mundial. Eficaz en áreas cerradas y trincheras.",
        imagen: "./src/png/granadapng.png"
    },
    pistola: {
        nombre: "Pistola Colt 1911",
        tipo: "Arma corta",
        daño: 35,
        alcance: "Corto",
        descripcion: "Pistola semiautomática confiable, fácil de manejar y con buena cadencia de disparo. Ideal para combate cercano.",
        imagen: "./src/png/pistolapng.png"
    },
    fusil: {
        nombre: "Fusil Lee-Enfield",
        tipo: "Rifle de cerrojo",
        daño: 80,
        alcance: "Largo",
        descripcion: "Rifle británico de precisión, famoso por su fiabilidad y alcance. Usado ampliamente por los aliados.",
        imagen: "./src/png/fusilpng.png"
    },
    mp18: {
        nombre: "Subfusil MP18",
        tipo: "Subfusil",
        daño: 45,
        alcance: "Medio",
        descripcion: "Una de las primeras ametralladoras portátiles. Alta cadencia de fuego, ideal para combate en movimiento.",
        imagen: "./src/png/mp18png.png"
    },
    lewis: {
        nombre: "Ametralladora Lewis",
        tipo: "Ametralladora ligera",
        daño: 60,
        alcance: "Medio-Largo",
        descripcion: "Ametralladora utilizada por las fuerzas aliadas. Capaz de mantener fuego sostenido en posiciones defensivas.",
        imagen: "./src/png/lewispng.png"
    }
};

// Selección de elementos
const botones = document.querySelectorAll(".arma-btn");
const imagenArma = document.getElementById("imagen-arma");
const nombreArma = document.getElementById("nombre-arma");
const descripcionArma = document.getElementById("descripcion-arma");
const tipoArma = document.getElementById("tipo-arma");
const dañoArma = document.getElementById("daño-arma");
const alcanceArma = document.getElementById("alcance-arma");


// Función para actualizar el arma
function mostrarArma(clave) {
    const arma = armas[clave];
    if (!arma) return console.error(`No se encontró información para: ${clave}`);

    // Suave transición con animación
    imagenArma.classList.add("fade-out");
    nombreArma.classList.add("fade-out");
    descripcionArma.classList.add("fade-out");


    setTimeout(() => {
        imagenArma.src = arma.imagen;
        imagenArma.alt = arma.nombre;
        nombreArma.textContent = arma.nombre;
        descripcionArma.textContent = arma.descripcion;
        tipoArma.textContent = arma.tipo;
dañoArma.textContent = arma.daño;
alcanceArma.textContent = arma.alcance;

        imagenArma.classList.remove("fade-out");
        nombreArma.classList.remove("fade-out");
        descripcionArma.classList.remove("fade-out");
    }, 300);
}

// Evento de clic en cada botón
botones.forEach(btn => {
    btn.addEventListener("click", () => {
        botones.forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");
        mostrarArma(btn.dataset.arma);
    });
});

// Mostrar primera arma por defecto
if (botones.length > 0) {
    botones[0].classList.add("activo");
    mostrarArma(botones[0].dataset.arma);
}

// 🔊 Control de sonido de ambiente
const audio = document.getElementById('backgroundAudio');
const soundToggle = document.getElementById('soundToggle');

// volumen moderado
audio.volume = 0.4;

soundToggle.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    soundToggle.textContent = '🔊 Sound On';
    soundToggle.classList.remove('muted');
    soundToggle.classList.add('active');
  } else {
    audio.pause();
    soundToggle.textContent = '🔇 Mute';
    soundToggle.classList.remove('active');
    soundToggle.classList.add('muted');
  }
});
