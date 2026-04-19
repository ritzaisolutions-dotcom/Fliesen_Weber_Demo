function calculatePrice() {
    var anliegen = document.getElementById('anliegen').value;
    var flaeche = parseFloat(document.getElementById('flaeche').value) || 0;
    var fliesentyp = document.getElementById('fliesentyp').value;
    var altbelag = document.getElementById('altbelag').checked;
    var sockelleisten = document.getElementById('sockelleisten').checked;
    var abdichtung = document.getElementById('abdichtung').checked;
    var output = document.getElementById('priceOutput');

    if (flaeche < 5) {
        output.textContent = '€ –';
        return;
    }

    var prices = { standard: 40, premium: 70, naturstein: 90 };
    var projectMultipliers = {
        bad: 1.2,
        kueche: 1.08,
        balkon: 1.12,
        wohnzimmer: 1.0,
        boden: 0.95
    };

    var basePrice = flaeche * (prices[fliesentyp] || 40) * (projectMultipliers[anliegen] || 1);
    if (altbelag)   basePrice += flaeche * 15;
    if (sockelleisten) basePrice += flaeche * 8;
    if (abdichtung) basePrice += flaeche * 20;

    var minPrice = Math.round(basePrice * 0.93 / 10) * 10;
    var maxPrice = Math.round(basePrice * 1.12 / 10) * 10;

    function fmt(n) { return '€' + n.toLocaleString('de-DE'); }

    output.textContent = fmt(minPrice) + ' – ' + fmt(maxPrice);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('anliegen').addEventListener('change', calculatePrice);
    document.getElementById('flaeche').addEventListener('input', calculatePrice);
    document.getElementById('fliesentyp').addEventListener('change', calculatePrice);
    document.getElementById('altbelag').addEventListener('change', calculatePrice);
    document.getElementById('sockelleisten').addEventListener('change', calculatePrice);
    document.getElementById('abdichtung').addEventListener('change', calculatePrice);
});
