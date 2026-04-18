document.addEventListener('DOMContentLoaded', function () {
    // Only bathrooms and work-in-progress shots — floor-only pics excluded
    var images = [
        'images/hero/hero-1.jpg',   // bath1
        'images/hero/hero-2.jpg',   // bath2
        'images/hero/hero-3.jpg',   // bath3
        'images/hero/hero-8.jpg',   // work1
        'images/hero/hero-9.jpg',   // work2
        'images/hero/hero-10.jpg',  // work3
        'images/hero/hero-11.jpg'   // work4
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
