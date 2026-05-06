function calculatePrice() {
  var anliegen = document.getElementById('anliegen');
  var flaeche = document.getElementById('flaeche');
  var fliesentyp = document.getElementById('fliesentyp');
  var altbelag = document.getElementById('altbelag');
  var sockelleisten = document.getElementById('sockelleisten');
  var abdichtung = document.getElementById('abdichtung');
  var output = document.getElementById('priceOutput');

  if (!anliegen || !flaeche || !fliesentyp || !altbelag || !sockelleisten || !abdichtung || !output) {
    return;
  }

  var area = parseFloat(flaeche.value) || 0;
  if (area < 5) {
    output.textContent = '\u20ac \u2013';
    return;
  }

  var prices = { standard: 42, premium: 72, naturstein: 94 };
  var projectMultipliers = {
    bad: 1.22,
    kueche: 1.08,
    balkon: 1.14,
    wohnzimmer: 1.0,
    boden: 0.96
  };

  var basePrice = area * (prices[fliesentyp.value] || 42) * (projectMultipliers[anliegen.value] || 1);
  if (altbelag.checked) basePrice += area * 15;
  if (sockelleisten.checked) basePrice += area * 8;
  if (abdichtung.checked) basePrice += area * 20;

  var minPrice = Math.round(basePrice * 0.93 / 10) * 10;
  var maxPrice = Math.round(basePrice * 1.12 / 10) * 10;

  function fmt(n) {
    return '\u20ac' + n.toLocaleString('de-DE');
  }

  output.textContent = fmt(minPrice) + ' \u2013 ' + fmt(maxPrice);
}

document.addEventListener('DOMContentLoaded', function () {
  var ids = ['anliegen', 'flaeche', 'fliesentyp', 'altbelag', 'sockelleisten', 'abdichtung'];
  ids.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener(el.type === 'number' ? 'input' : 'change', calculatePrice);
  });
  calculatePrice();
});
