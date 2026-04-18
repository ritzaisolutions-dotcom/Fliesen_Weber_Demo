function calculatePrice() {
    var flaeche = parseFloat(document.getElementById('flaeche').value) || 0;
    var fliesentyp = document.getElementById('fliesentyp').value;
    var altbelag = document.getElementById('altbelag').checked;
    var abdichtung = document.getElementById('abdichtung').checked;
    var output = document.getElementById('priceOutput');

    if (flaeche < 5) {
        output.textContent = '€ –';
        return;
    }

    var prices = { standard: 40, premium: 70, naturstein: 90 };

    var basePrice = flaeche * (prices[fliesentyp] || 40);
    if (altbelag)   basePrice += flaeche * 15;
    if (abdichtung) basePrice += flaeche * 20;

    var minPrice = Math.round(basePrice * 0.95);
    var maxPrice = Math.round(basePrice * 1.10);

    function fmt(n) { return '€' + n.toLocaleString('de-DE'); }

    output.textContent = fmt(minPrice) + ' – ' + fmt(maxPrice);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('flaeche').addEventListener('input', calculatePrice);
    document.getElementById('fliesentyp').addEventListener('change', calculatePrice);
    document.getElementById('altbelag').addEventListener('change', calculatePrice);
    document.getElementById('abdichtung').addEventListener('change', calculatePrice);
});
