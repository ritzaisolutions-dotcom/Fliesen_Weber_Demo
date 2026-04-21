(function () {
  var outer = document.getElementById('reviewsCarouselOuter');
  var track = document.getElementById('reviewsCarouselTrack');
  var set   = document.getElementById('reviewsScrollSet');
  if (!outer || !track || !set) return;

  var clone = set.cloneNode(true);
  clone.removeAttribute('id');
  clone.setAttribute('aria-hidden', 'true');
  track.appendChild(clone);

  track.style.animationPlayState = 'running';

  outer.addEventListener('mouseenter', function () {
    track.style.animationPlayState = 'paused';
  });
  outer.addEventListener('mouseleave', function () {
    track.style.animationPlayState = 'running';
  });
}());
