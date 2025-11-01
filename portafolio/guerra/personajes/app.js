    // step 1: get DOM
    let nextDom = document.getElementById('next');
    let prevDom = document.getElementById('prev');

    let carouselDom = document.querySelector('.carousel');
    let SliderDom = carouselDom.querySelector('.carousel .list');
    let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
    let timeDom = document.querySelector('.carousel .time');

    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

    // Solo cambiará con clic
    nextDom.onclick = function () {
        showSlider('next');
    }

    prevDom.onclick = function () {
        showSlider('prev');
    }

    function showSlider(type) {
        let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
        let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

        if (type === 'next') {
            SliderDom.appendChild(SliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            carouselDom.classList.add('next');
        } else {
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            carouselDom.classList.add('prev');
        }

        // Tiempo para quitar animación visual (ajústalo si tienes animaciones CSS)
        setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, 1000); // 1 segundo
    }

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