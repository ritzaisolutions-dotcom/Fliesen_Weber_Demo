(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    var formData = {
      name:    document.getElementById('name').value.trim(),
      email:   document.getElementById('email').value.trim(),
      phone:   document.getElementById('phone').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    var submitButton = form.querySelector('button[type="submit"]');
    var originalText = submitButton.textContent;
    submitButton.textContent = 'Wird gesendet…';
    submitButton.disabled = true;

    try {
      var response = await fetch('https://n8n.ritz-ai.solutions/webhook/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        form.innerHTML = [
          '<div class="text-center py-12">',
          '  <span class="material-symbols-outlined text-6xl text-primary mb-4 block" style="font-variation-settings:\'FILL\' 1">check_circle</span>',
          '  <h3 class="text-2xl font-black text-on-surface mb-3">Vielen Dank!</h3>',
          '  <p class="text-on-surface-variant leading-relaxed">Wir melden uns innerhalb von 24 Stunden bei Ihnen.<br/>',
          '  Für dringende Anfragen: <a href="tel:+492611234567" class="text-primary font-bold">+49 261 1234567</a></p>',
          '</div>'
        ].join('');
      } else {
        throw new Error('Server returned ' + response.status);
      }
    } catch (error) {
      alert('Fehler beim Senden. Bitte rufen Sie uns direkt an: +49 261 1234567');
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
})();
