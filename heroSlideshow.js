document.addEventListener('DOMContentLoaded', function () {
    var slides = [
        {
            src: 'visuals_ref/work2_ref.jpg',
            alt: 'Team bei der Verlegung großformatiger Marmor-Wandfliesen',
            position: 'center center'
        },
        {
            src: 'visuals_ref/work7_ref.jpg',
            alt: 'Fliesenleger beim professionellen Verlegen von Bodenfliesen',
            position: 'center 35%'
        },
        {
            src: 'visuals_ref/work1_ref.jpg',
            alt: 'Großformatige Marmorfliesen mit Nivelliersystem auf dem Boden',
            position: 'center 40%'
        },
        {
            src: 'visuals_ref/work6_ref.jpg',
            alt: 'Präzises Verlegen von Fliesen in Kleberbett',
            position: 'center 45%'
        }
    ];

    var container = document.createElement('div');
    container.className = 'hero-slideshow';

    slides.forEach(function (slide, index) {
        var img = document.createElement('img');
        img.src = slide.src;
        img.alt = slide.alt;
        img.style.objectPosition = slide.position;
        if (index === 0) img.classList.add('active');
        container.appendChild(img);
    });

    var hero = document.querySelector('header');
    var gradient = hero.querySelector('.hero-gradient');
    hero.insertBefore(container, gradient);

    var imgEls = container.querySelectorAll('img');
    var current = 0;

    setInterval(function () {
        imgEls[current].classList.remove('active');
        current = (current + 1) % imgEls.length;
        imgEls[current].classList.add('active');
    }, 6000);
});
