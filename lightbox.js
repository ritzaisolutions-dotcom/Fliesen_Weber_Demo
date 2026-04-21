(function () {
  var slides = Array.from(document.querySelectorAll('.reference-slide'));
  if (!slides.length) return;

  var gallery = slides.map(function (slide) {
    var img = slide.querySelector('img');
    var ps  = slide.querySelectorAll('p');
    return {
      src:   img ? img.getAttribute('src') : '',
      alt:   img ? img.alt : '',
      title: ps[0] ? ps[0].textContent.trim() : '',
      desc:  ps[1] ? ps[1].textContent.trim() : '',
    };
  });

  var current = 0;

  var overlay = document.createElement('div');
  overlay.id = 'lb';
  overlay.innerHTML =
    '<button id="lb-close" aria-label="Schließen"><span class="material-symbols-outlined">close</span></button>' +
    '<button id="lb-prev"  aria-label="Zurück"><span class="material-symbols-outlined">west</span></button>'  +
    '<div id="lb-stage"><img id="lb-img" src="" alt="" /></div>'                                               +
    '<button id="lb-next"  aria-label="Weiter"><span class="material-symbols-outlined">east</span></button>'  +
    '<div id="lb-cap"><p id="lb-title"></p><p id="lb-desc"></p></div>';
  document.body.appendChild(overlay);

  var lbImg   = document.getElementById('lb-img');
  var lbTitle = document.getElementById('lb-title');
  var lbDesc  = document.getElementById('lb-desc');

  function show(i) {
    current = (i + gallery.length) % gallery.length;
    var item = gallery[current];
    lbImg.src           = item.src;
    lbImg.alt           = item.alt;
    lbTitle.textContent = item.title;
    lbDesc.textContent  = item.desc;
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
  }

  function hide() {
    overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
  }

  document.getElementById('lb-close').addEventListener('click', hide);
  document.getElementById('lb-prev').addEventListener('click', function () { show(current - 1); });
  document.getElementById('lb-next').addEventListener('click', function () { show(current + 1); });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === document.getElementById('lb-stage')) hide();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('lb-open')) return;
    if (e.key === 'Escape')     hide();
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  slides.forEach(function (slide, i) {
    slide.style.cursor = 'zoom-in';
    slide.addEventListener('click', function () { show(i); });
  });
}());
