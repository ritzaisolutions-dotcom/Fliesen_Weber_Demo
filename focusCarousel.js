(function () {
  var outer    = document.getElementById('focusCarouselOuter');
  var track    = document.getElementById('focusCarouselTrack');
  var dotsEl   = document.getElementById('focusDots');
  var capTitle = document.getElementById('focusCaptionTitle');
  var capDesc  = document.getElementById('focusCaptionDesc');

  var origSlides = Array.from(track ? track.querySelectorAll('.focus-slide') : []);
  if (!origSlides.length) return;

  var N = origSlides.length;

  // Prepend clones (reverse order so they land in correct sequence)
  origSlides.slice().reverse().forEach(function (s) {
    var c = s.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    track.insertBefore(c, track.firstChild);
  });

  // Append clones
  origSlides.forEach(function (s) {
    var c = s.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    track.appendChild(c);
  });

  // Full slide list: [N clones] [N real] [N clones] = 3N total
  var all = Array.from(track.querySelectorAll('.focus-slide'));

  var current       = N; // start at first real slide
  var transitioning = false;

  var captions = origSlides.map(function (s) {
    var ps = s.querySelectorAll('p');
    return { title: ps[0] ? ps[0].textContent.trim() : '', desc: ps[1] ? ps[1].textContent.trim() : '' };
  });

  var dotEls = origSlides.map(function (_, i) {
    var d = document.createElement('button');
    d.className = 'focus-dot';
    d.setAttribute('aria-label', 'Bild ' + (i + 1));
    d.addEventListener('click', function () { go(N + i); });
    dotsEl.appendChild(d);
    return d;
  });

  function ri() { return ((current - N) % N + N) % N; } // real index 0..N-1

  function updatePosition(animated) {
    var slideW = all[0].offsetWidth;
    var gap    = window.innerWidth * 0.02;
    var tx     = (window.innerWidth - slideW) / 2 - current * (slideW + gap);
    if (!animated) {
      track.style.transition = 'none';
      track.style.transform  = 'translateX(' + tx + 'px)';
      requestAnimationFrame(function () { track.style.transition = ''; });
    } else {
      track.style.transform = 'translateX(' + tx + 'px)';
    }
  }

  function updateState() {
    var r = ri();
    all.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
    dotEls.forEach(function (d, i) { d.classList.toggle('is-active', i === r); });
    capTitle.textContent = captions[r].title;
    capDesc.textContent  = captions[r].desc;
  }

  function go(i) {
    if (transitioning) return;
    transitioning = true;
    current = i;
    updatePosition(true);
    updateState();

    function onEnd() {
      track.removeEventListener('transitionend', onEnd);
      transitioning = false;
      if (current < N) {
        current += N;
        updatePosition(false);
        updateState();
      } else if (current >= 2 * N) {
        current -= N;
        updatePosition(false);
        updateState();
      }
    }
    track.addEventListener('transitionend', onEnd);
  }

  document.getElementById('focusPrev').addEventListener('click', function () { go(current - 1); });
  document.getElementById('focusNext').addEventListener('click', function () { go(current + 1); });

  all.forEach(function (slide, i) {
    slide.addEventListener('click', function () {
      if (i === current) {
        if (window.Lightbox) window.Lightbox.open(ri());
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
