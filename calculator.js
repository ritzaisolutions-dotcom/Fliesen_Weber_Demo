(function () {
    var state = { step: 1, projekt: null, flaeche: null, material: null, extras: [] };
    var PROJECTS = [
      { id: 'bad',        label: 'Bad fliesen',       icon: 'bathtub',    multi: 1.2  },
      { id: 'kueche',     label: 'Küche fliesen',     icon: 'countertops',multi: 1.08 },
      { id: 'balkon',     label: 'Balkon / Terrasse', icon: 'deck',       multi: 1.12 },
      { id: 'wohnzimmer', label: 'Wohnzimmer',        icon: 'weekend',    multi: 1.0  },
      { id: 'boden',      label: 'Boden verlegen',    icon: 'layers',     multi: 0.95 }
    ];
    var MATERIALS = [
      { id: 'standard',   label: 'Standard',   sub: 'ca. 40 €/m²', price: 40 },
      { id: 'premium',    label: 'Premium',    sub: 'ca. 70 €/m²', price: 70 },
      { id: 'naturstein', label: 'Naturstein', sub: 'ca. 90 €/m²', price: 90 }
    ];
    var EXTRAS = [
      { id: 'altbelag',     label: 'Altbelag entfernen',      price: 15 },
      { id: 'sockelleisten',label: 'Sockelleisten montieren', price: 8  },
      { id: 'abdichtung',   label: 'Abdichtung (Nassbereich)',price: 20 }
    ];

    // Build project cards
    var pg = document.getElementById('calcProjectCards');
    PROJECTS.forEach(function (p) {
      var btn = document.createElement('button');
      btn.type = 'button'; btn.dataset.id = p.id;
      btn.className = 'calc-option-card flex flex-col items-center gap-2 p-4 border-2 border-outline-variant/30 bg-surface-container-lowest hover:border-primary transition-all text-center';
      btn.innerHTML = '<span class="material-symbols-outlined text-2xl text-primary">' + p.icon + '</span><span class="text-xs font-bold text-on-surface leading-snug">' + p.label + '</span>';
      btn.addEventListener('click', function () {
        state.projekt = p.id;
        pg.querySelectorAll('.calc-option-card').forEach(function (c) { c.classList.remove('calc-selected'); });
        btn.classList.add('calc-selected');
        setTimeout(function () { goTo(2); }, 200);
      });
      pg.appendChild(btn);
    });

    // Build material cards
    var mg = document.getElementById('calcMaterialCards');
    MATERIALS.forEach(function (m) {
      var btn = document.createElement('button');
      btn.type = 'button'; btn.dataset.id = m.id;
      btn.className = 'calc-option-card flex flex-col items-start p-4 border-2 border-outline-variant/30 bg-surface-container-lowest hover:border-primary transition-all';
      btn.innerHTML = '<span class="font-black text-on-surface text-base mb-1">' + m.label + '</span><span class="text-xs text-on-surface-variant">' + m.sub + '</span>';
      btn.addEventListener('click', function () {
        state.material = m.id;
        mg.querySelectorAll('.calc-option-card').forEach(function (c) { c.classList.remove('calc-selected'); });
        btn.classList.add('calc-selected');
        document.getElementById('calcStep2Error').classList.add('hidden');
      });
      mg.appendChild(btn);
    });

    // Build extras
    var eg = document.getElementById('calcExtrasCards');
    EXTRAS.forEach(function (e) {
      var btn = document.createElement('button');
      btn.type = 'button'; btn.dataset.id = e.id;
      btn.className = 'calc-extra-card w-full p-4 border-2 border-outline-variant/30 bg-surface-container-lowest hover:border-primary transition-all text-left';
      btn.innerHTML = '<span class="font-semibold text-on-surface text-sm">' + e.label + '</span><span class="text-xs font-bold text-on-surface-variant">+ ' + e.price + ' €/m²</span>';
      btn.addEventListener('click', function () {
        var i = state.extras.indexOf(e.id);
        if (i === -1) { state.extras.push(e.id); btn.classList.add('calc-selected'); }
        else { state.extras.splice(i, 1); btn.classList.remove('calc-selected'); }
      });
      eg.appendChild(btn);
    });

    function goTo(n) {
      if (n === 3) {
        var fl = parseFloat(document.getElementById('wizFlaeche').value);
        if (!fl || fl < 1 || !state.material) {
          document.getElementById('calcStep2Error').classList.remove('hidden');
          return;
        }
        state.flaeche = fl;
      }
      if (n === 4) { computeResult(); }
      state.step = n;
      [1, 2, 3, 4].forEach(function (s) {
        document.getElementById('calcStep' + s).classList.toggle('hidden', s !== n);
      });
      refreshNav();
      refreshBar();
      document.getElementById('kostenrechner').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function computeResult() {
      var mat  = MATERIALS.find(function (m) { return m.id === state.material; });
      var proj = PROJECTS.find(function (p) { return p.id === state.projekt; });
      var base = state.flaeche * (mat ? mat.price : 40) * (proj ? proj.multi : 1);
      EXTRAS.forEach(function (e) { if (state.extras.indexOf(e.id) !== -1) base += state.flaeche * e.price; });
      var min = Math.round(base * 0.93 / 10) * 10;
      var max = Math.round(base * 1.12 / 10) * 10;
      document.getElementById('wizPriceOutput').textContent = '€ ' + min.toLocaleString('de-DE') + ' – € ' + max.toLocaleString('de-DE');
      document.getElementById('calcSummaryText').textContent =
        (proj ? proj.label : '') + ' · ' + state.flaeche + ' m² · ' + (mat ? mat.label : '') +
        (state.extras.length ? ' · inkl. Zusatzleistungen' : '');
    }

    function refreshNav() {
      var back = document.getElementById('calcBack');
      var next = document.getElementById('calcNext');
      var nav  = document.getElementById('calcNav');
      back.classList.toggle('hidden', state.step <= 1);
      next.classList.toggle('hidden', state.step === 1 || state.step === 4);
      nav.classList.toggle('hidden', state.step === 4);
    }

    function refreshBar() {
      document.querySelectorAll('.calc-dot').forEach(function (d) {
        var s = parseInt(d.dataset.step);
        var active = s <= state.step;
        d.classList.toggle('bg-primary', active);
        d.classList.toggle('border-primary', active);
        d.classList.toggle('text-white', active);
        d.classList.toggle('border-outline-variant/40', !active);
        d.classList.toggle('text-outline', !active);
        d.style.background = active ? '' : 'transparent';
      });
      document.querySelectorAll('.calc-track').forEach(function (t) {
        var s = parseInt(t.dataset.step);
        t.classList.toggle('bg-primary', s < state.step);
        t.classList.toggle('bg-outline-variant/30', s >= state.step);
      });
    }

    document.getElementById('calcBack').addEventListener('click', function () { goTo(state.step - 1); });
    document.getElementById('calcNext').addEventListener('click', function () { goTo(state.step + 1); });
    document.getElementById('calcReset').addEventListener('click', function () {
      state = { step: 1, projekt: null, flaeche: null, material: null, extras: [] };
      document.querySelectorAll('.calc-option-card, .calc-extra-card').forEach(function (c) { c.classList.remove('calc-selected'); });
      document.getElementById('wizFlaeche').value = '';
      document.getElementById('calcNav').classList.remove('hidden');
      goTo(1);
    });

    refreshNav();
    refreshBar();
  })();
