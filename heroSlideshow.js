document.addEventListener('DOMContentLoaded', function () {
    var images = [
        'images/hero/hero-1.jpg',
        'images/hero/hero-2.jpg',
        'images/hero/hero-3.jpg',
        'images/hero/hero-4.jpg',
        'images/hero/hero-5.jpg',
        'images/hero/hero-6.jpg',
        'images/hero/hero-7.jpg',
        'images/hero/hero-8.jpg',
        'images/hero/hero-9.jpg',
        'images/hero/hero-10.jpg',
        'images/hero/hero-11.jpg'
    ];

    var container = document.createElement('div');
    container.className = 'hero-slideshow';

    images.forEach(function (src, index) {
        var img = document.createElement('img');
        img.src = src;
        img.alt = 'Projekt ' + (index + 1);
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
