(function () {
  var outer    = document.getElementById('focusCarouselOuter');
  var track    = document.getElementById('focusCarouselTrack');
  var dotsEl   = document.getElementById('focusDots');
  var capTitle = document.getElementById('focusCaptionTitle');
  var capDesc  = document.getElementById('focusCaptionDesc');
  var slides   = Array.from(track ? track.querySelectorAll('.focus-slide') : []);
  if (!slides.length) return;

  var current = 0;

  var captions = slides.map(function (slide) {
    var ps = slide.querySelectorAll('p');
    return {
      title: ps[0] ? ps[0].textContent.trim() : '',
      desc:  ps[1] ? ps[1].textContent.trim() : '',
    };
  });

  var dotEls = slides.map(function (_, i) {
    var d = document.createElement('button');
    d.className = 'focus-dot';
    d.setAttribute('aria-label', 'Bild ' + (i + 1));
    d.addEventListener('click', function () { go(i); });
    dotsEl.appendChild(d);
    return d;
  });

  function layout() {
    var mobile  = window.innerWidth < 768;
    var slideW  = mobile ? 0.84 : 0.68;
    var gap     = 0.02;
    var offset  = (1 - slideW) / 2;
    return { step: (slideW + gap) * window.innerWidth, offset: offset * window.innerWidth };
  }

  function updatePosition(animated) {
    var l  = layout();
    var tx = l.offset - current * l.step;
    if (!animated) {
      track.style.transition = 'none';
      track.style.transform  = 'translateX(' + tx + 'px)';
      requestAnimationFrame(function () { track.style.transition = ''; });
    } else {
      track.style.transform = 'translateX(' + tx + 'px)';
    }
  }

  function updateState() {
    slides.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
    dotEls.forEach(function (d, i)  { d.classList.toggle('is-active', i === current); });
    capTitle.textContent = captions[current].title;
    capDesc.textContent  = captions[current].desc;
  }

  function go(i) {
    current = (i + slides.length) % slides.length;
    updatePosition(true);
    updateState();
  }

  document.getElementById('focusPrev').addEventListener('click', function () { go(current - 1); });
  document.getElementById('focusNext').addEventListener('click', function () { go(current + 1); });

  slides.forEach(function (slide, i) {
    slide.addEventListener('click', function () {
      if (i === current) {
        if (window.Lightbox) window.Lightbox.open(current);
      } else {
        go(i);
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  go(current - 1);
    if (e.key === 'ArrowRight') go(current + 1);
  });

  var touchX = 0;
  outer.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  outer.addEventListener('touchend',   function (e) {
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
  });

  window.addEventListener('resize', function () { updatePosition(false); });

  updatePosition(false);
  updateState();
}());
