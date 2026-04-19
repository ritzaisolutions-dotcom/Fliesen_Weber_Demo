document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var statusBox = document.getElementById('contactStatus');
    var submitButton = form.querySelector('button[type="submit"]');

    function setStatus(message, isError) {
        if (!statusBox) return;
        statusBox.innerHTML = message;
        statusBox.classList.remove(
            'hidden',
            'border-primary/20', 'bg-primary/5', 'text-on-surface',
            'border-error/20', 'bg-error/5', 'text-error'
        );
        if (isError) {
            statusBox.classList.add('border-error/20', 'bg-error/5', 'text-error');
        } else {
            statusBox.classList.add('border-primary/20', 'bg-primary/5', 'text-on-surface');
        }
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var phone = document.getElementById('phone').value.trim();
        var message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            setStatus('Bitte füllen Sie Name, E-Mail und Nachricht aus.', true);
            return;
        }

        if (submitButton) {
            submitButton.textContent = 'Wird gesendet…';
            submitButton.disabled = true;
        }

        var payload = {
            access_key: 'd2ed1dac-2a1c-4afe-a43d-2744e56c3fdd',
            name: name,
            email: email,
            phone: phone || 'nicht angegeben',
            message: message,
            subject: 'Demo-Anfrage von ' + name + ' – Fliesen Weber Demo'
        };

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) {
                setStatus(
                    'Vielen Dank! Ihre Nachricht wurde gesendet. Wir melden uns so schnell wie möglich.',
                    false
                );
                form.reset();
            } else {
                throw new Error(data.message || 'Unbekannter Fehler');
            }
        })
        .catch(function () {
            setStatus(
                'Fehler beim Senden. Bitte schreiben Sie direkt an '
                + '<a class="font-semibold underline" href="mailto:fliesen.weber.koblenz@gmail.com">fliesen.weber.koblenz@gmail.com</a>.',
                true
            );
        })
        .finally(function () {
            if (submitButton) {
                submitButton.textContent = 'Anfrage senden';
                submitButton.disabled = false;
            }
        });
    });
});
