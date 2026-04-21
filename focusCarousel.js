(function () {
  var outer    = document.getElementById('focusCarouselOuter');
  var track    = document.getElementById('focusCarouselTrack');
  var dotsEl   = document.getElementById('focusDots');
  var capTitle = document.getElementById('focusCaptionTitle');
  var capDesc  = document.getElementById('focusCaptionDesc');
  var slides   = Array.from(track ? track.querySelectorAll('.focus-slide') : []);
  if (!slides.length) return;

  var current = 0;
  var GAP = 20; // matches CSS gap: 20px

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

  function updatePosition(animated) {
    var slideH     = slides[0].offsetHeight;
    var containerH = outer.offsetHeight;
    var step = slideH + GAP;
    var ty   = containerH / 2 - slideH / 2 - current * step;
    if (!animated) {
      track.style.transition = 'none';
      track.style.transform  = 'translateY(' + ty + 'px)';
      requestAnimationFrame(function () { track.style.transition = ''; });
    } else {
      track.style.transform = 'translateY(' + ty + 'px)';
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
    if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  go(current - 1);
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') go(current + 1);
  });

  var touchY = 0;
  outer.addEventListener('touchstart', function (e) { touchY = e.touches[0].clientY; }, { passive: true });
  outer.addEventListener('touchend',   function (e) {
    var dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dy) > 50) go(current + (dy < 0 ? 1 : -1));
  });

  window.addEventListener('resize', function () { updatePosition(false); });

  updatePosition(false);
  updateState();
}());
