document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    if (!form) {
        console.error('Contact form not found');
        return;
    }

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
        submitButton.textContent = 'Wird gesendet...';
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
                    '  <span class="material-symbols-outlined text-6xl text-primary mb-4 block" style="font-size:64px;font-variation-settings:\'FILL\' 1">check_circle</span>',
                    '  <h3 class="text-2xl font-bold mb-2">Vielen Dank für Ihre Nachricht!</h3>',
                    '  <p class="text-on-surface-variant">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>',
                    '</div>'
                ].join('');
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            alert('Fehler beim Senden. Bitte rufen Sie uns direkt an: +49 261 1234567');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
});
