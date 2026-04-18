(function () {
  var TILE_PRICES = { standard: 40, premium: 70, naturstein: 90 };
  var EXTRA_PRICES = { altbelag: 15, abdichtung: 20 };

  var selAnliegen  = document.getElementById('calc-anliegen');
  var inputFlaeche = document.getElementById('calc-flaeche');
  var selTyp       = document.getElementById('calc-typ');
  var cbAltbelag   = document.getElementById('calc-altbelag');
  var cbAbdichtung = document.getElementById('calc-abdichtung');
  var resultPrice  = document.getElementById('calc-result-price');

  function fmt(n) {
    return n.toLocaleString('de-DE');
  }

  function calculate() {
    var flaeche = parseFloat(inputFlaeche.value);

    if (!flaeche || flaeche < 5) {
      resultPrice.textContent = '€ \u2013';
      return;
    }

    var basePerQm  = TILE_PRICES[selTyp.value] || 40;
    var extrasPerQm = 0;
    if (cbAltbelag.checked)   extrasPerQm += EXTRA_PRICES.altbelag;
    if (cbAbdichtung.checked) extrasPerQm += EXTRA_PRICES.abdichtung;

    var totalPerQm = basePerQm + extrasPerQm;
    var minPrice   = Math.round(flaeche * totalPerQm);
    var maxPrice   = Math.round(minPrice * 1.15);

    resultPrice.textContent = '\u20AC\u202f' + fmt(minPrice) + ' \u2013 \u20AC\u202f' + fmt(maxPrice);
  }

  [selAnliegen, inputFlaeche, selTyp, cbAltbelag, cbAbdichtung].forEach(function (el) {
    if (el) el.addEventListener('input', calculate);
  });

  // Run once on load in case fields have pre-filled values
  calculate();
})();
