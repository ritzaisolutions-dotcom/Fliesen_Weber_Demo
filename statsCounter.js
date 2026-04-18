document.addEventListener('DOMContentLoaded', function () {
    var stats = [
        { el: document.querySelector('[data-stat="projects"]'), target: 350, suffix: '+', decimals: 0, duration: 2000 },
        { el: document.querySelector('[data-stat="years"]'),    target: 15,  suffix: '',  decimals: 0, duration: 1500 },
        { el: document.querySelector('[data-stat="rating"]'),   target: 4.9, suffix: '',  decimals: 1, duration: 2000, star: true }
    ];

    var hasAnimated = false;

    function animateStat(stat) {
        var startTime = null;

        function step(ts) {
            if (!startTime) startTime = ts;
            var elapsed = ts - startTime;
            var progress = Math.min(elapsed / stat.duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = stat.target * eased;
            var text = current.toFixed(stat.decimals) + stat.suffix;
            if (stat.star) {
                text += ' <span class="material-symbols-outlined text-amber-400" style="font-variation-settings:\'FILL\' 1">star</span>';
                stat.el.innerHTML = text;
            } else {
                stat.el.textContent = text;
            }
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    var section = document.querySelector('[data-stats-section]');
    if (!section) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                stats.forEach(function (s) { if (s.el) animateStat(s); });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(section);
});
