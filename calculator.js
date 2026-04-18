(function () {
  const TILE_PRICES = { standard: 40, premium: 70, naturstein: 90 };
  const EXTRA_PRICES = { altbelag: 15, abdichtung: 20 };

  const selAnliegen = document.getElementById('calc-anliegen');
  const inputFlaeche = document.getElementById('calc-flaeche');
  const selTyp = document.getElementById('calc-typ');
  const cbAltbelag = document.getElementById('calc-altbelag');
  const cbAbdichtung = document.getElementById('calc-abdichtung');
  const result = document.getElementById('calc-result');
  const resultPrice = document.getElementById('calc-result-price');

  function fmt(n) {
    return n.toLocaleString('de-DE');
  }

  function calculate() {
    const flaeche = parseFloat(inputFlaeche.value);
    if (!flaeche || flaeche < 5) {
      result.classList.remove('visible');
      return;
    }

    const basePerQm = TILE_PRICES[selTyp.value] || 40;
    let extrasPerQm = 0;
    if (cbAltbelag.checked) extrasPerQm += EXTRA_PRICES.altbelag;
    if (cbAbdichtung.checked) extrasPerQm += EXTRA_PRICES.abdichtung;

    const totalPerQm = basePerQm + extrasPerQm;
    const totalMin = Math.round(flaeche * totalPerQm * 0.9);
    const totalMax = Math.round(flaeche * totalPerQm * 1.15);

    resultPrice.textContent = `€\u202f${fmt(totalMin)} – €\u202f${fmt(totalMax)}`;
    result.classList.add('visible');
  }

  [selAnliegen, inputFlaeche, selTyp, cbAltbelag, cbAbdichtung].forEach(function (el) {
    if (el) el.addEventListener('input', calculate);
  });

  // Mobile nav toggle
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
})();
