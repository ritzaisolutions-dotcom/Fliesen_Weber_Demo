(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  // ── Hero v2: video + staged reveal ──
  var hero = document.querySelector('[data-hero]') || document.querySelector('.hero-v2');
  var heroVideo = hero && hero.querySelector('.hero-video');

  function setHeroNoVideo() {
    if (hero) hero.classList.add('hero--no-video');
  }

  function markHeroReady() {
    if (!hero) return;
    hero.classList.add('hero-v2--ready');
  }

  if (heroVideo && hero) {
    if (reducedMotion) {
      setHeroNoVideo();
      markHeroReady();
    } else {
      heroVideo.addEventListener('error', function () {
        setHeroNoVideo();
        markHeroReady();
      });
      heroVideo.addEventListener('playing', function () {
        hero.classList.add('hero-v2--playing');
      });
      heroVideo.addEventListener('canplay', markHeroReady, { once: true });
      var playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {
          setHeroNoVideo();
          markHeroReady();
        });
      }
      setTimeout(function () {
        if (!hero.classList.contains('hero-v2--ready')) markHeroReady();
      }, 1200);
    }
  } else if (hero) {
    setHeroNoVideo();
    markHeroReady();
  }

  // ── Startseite: Hero-Exit + Nav nach Scroll ──
  if (document.body.classList.contains('page-home')) {
    var headerRevealOffset = 72;
    var heroExitTarget = 0;
    var heroExitDisplay = 0;
    var heroExitRaf = 0;

    function heroExitDistance() {
      return window.innerHeight * 1.15;
    }

    function easeOutCubic(value) {
      return 1 - Math.pow(1 - value, 3);
    }

    function applyHeroExitState(progress) {
      if (!hero || reducedMotion) return;

      var eased = easeOutCubic(progress);
      hero.style.setProperty('--hero-exit', eased.toFixed(4));
      document.body.classList.toggle('has-left-hero', progress >= 0.97);
    }

    function tickHeroExit() {
      heroExitRaf = 0;
      var delta = heroExitTarget - heroExitDisplay;

      if (Math.abs(delta) > 0.001) {
        heroExitDisplay += delta * 0.16;
        applyHeroExitState(heroExitDisplay);
        heroExitRaf = window.requestAnimationFrame(tickHeroExit);
        return;
      }

      heroExitDisplay = heroExitTarget;
      applyHeroExitState(heroExitDisplay);
      updateHomeChrome(heroExitDisplay);
    }

    function queueHeroExitTick() {
      if (!heroExitRaf) heroExitRaf = window.requestAnimationFrame(tickHeroExit);
    }

    function updateHomeChrome(progress) {
      var atHero = progress < 0.05 && window.scrollY < headerRevealOffset;
      document.body.classList.toggle('is-hero-at-top', atHero);
      document.body.classList.toggle('header-revealed', progress >= 0.12 || window.scrollY >= headerRevealOffset);

      if (atHero) {
        var toggle = document.getElementById('nav-toggle');
        var menu = document.getElementById('mobile-menu');
        if (toggle && menu && toggle.getAttribute('aria-expanded') === 'true') {
          toggle.setAttribute('aria-expanded', 'false');
          menu.classList.remove('is-open');
          document.body.classList.remove('nav-open');
        }
      }
    }

    function updateHeroScroll() {
      if (!hero) return;

      var distance = heroExitDistance();
      heroExitTarget = Math.min(1, Math.max(0, window.scrollY / distance));

      if (reducedMotion) {
        heroExitDisplay = heroExitTarget;
        applyHeroExitState(heroExitDisplay);
        updateHomeChrome(heroExitDisplay);
        return;
      }

      queueHeroExitTick();
      updateHomeChrome(heroExitTarget);
    }

    window.addEventListener('scroll', updateHeroScroll, { passive: true });
    window.addEventListener('resize', updateHeroScroll, { passive: true });
    updateHeroScroll();
  }

  // ── Scroll cue → Sektion 2 ──
  var scrollIndicator = document.getElementById('scroll-indicator');
  if (scrollIndicator) {
    var scrollHidden = false;
    function hideScrollIndicator() {
      if (scrollHidden) return;
      scrollHidden = true;
      scrollIndicator.classList.add('is-hidden');
    }
    window.addEventListener('scroll', function () {
      if (window.scrollY > 48) hideScrollIndicator();
    }, { passive: true });
    scrollIndicator.addEventListener('click', function (event) {
      var target = document.getElementById('vorher-nachher');
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  }

  // ── Sektion 2: Einblend-Animation ──
  document.querySelectorAll('[data-reveal-section]').forEach(function (section) {
    if (reducedMotion) {
      section.classList.add('is-revealed');
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    observer.observe(section);
  });

  // ── Cursor follower (desktop) ──
  var cursorDot = document.getElementById('cursor-dot');
  if (cursorDot && finePointer && !reducedMotion) {
    var cursorX = window.innerWidth / 2;
    var cursorY = window.innerHeight / 2;
    var renderX = cursorX;
    var renderY = cursorY;

    document.body.classList.add('cursor-custom');
    cursorDot.classList.add('is-active');

    document.addEventListener('mousemove', function (event) {
      cursorX = event.clientX;
      cursorY = event.clientY;
    });

    document.addEventListener('mouseover', function (event) {
      var target = event.target;
      if (!(target instanceof Element)) return;
      var interactive = target.closest('a, button, .button, .compare-handle, .compare-tab, .nav-toggle, .faq-trigger');
      cursorDot.classList.toggle('is-hover', Boolean(interactive));
    });

    function tickCursor() {
      renderX += (cursorX - renderX) * 0.15;
      renderY += (cursorY - renderY) * 0.15;
      cursorDot.style.left = renderX + 'px';
      cursorDot.style.top = renderY + 'px';
      requestAnimationFrame(tickCursor);
    }
    tickCursor();
  }

  // ── Compare slider v2 ──
  var compareStage = document.querySelector('[data-compare-stage]');
  if (compareStage) {
    var DEFAULT_AFTER_PERCENT = 35;

    function setComparePosition(pane, afterPercent) {
      var beforeWrap = pane.querySelector('[data-compare-before]');
      var handle = pane.querySelector('[data-compare-handle]');
      var divider = pane.querySelector('[data-compare-divider]');
      var clipRight = 100 - afterPercent;

      if (beforeWrap) {
        beforeWrap.style.clipPath = 'inset(0 ' + clipRight + '% 0 0)';
      }
      if (handle) {
        handle.style.left = afterPercent + '%';
        handle.setAttribute('aria-valuenow', String(Math.round(afterPercent)));
      }
      if (divider) {
        divider.style.left = afterPercent + '%';
      }
    }

    function bindComparePane(pane) {
      var handle = pane.querySelector('[data-compare-handle]');
      if (!handle) return;

      var dragging = false;
      var rafId = 0;
      var pendingX = null;

      function applyPosition(clientX) {
        var rect = pane.getBoundingClientRect();
        var percent = ((clientX - rect.left) / rect.width) * 100;
        percent = Math.max(5, Math.min(95, percent));
        setComparePosition(pane, percent);
      }

      function scheduleUpdate(clientX) {
        pendingX = clientX;
        if (rafId) return;
        rafId = requestAnimationFrame(function () {
          rafId = 0;
          if (pendingX !== null) applyPosition(pendingX);
        });
      }

      function onPointerDown(event) {
        if (event.button !== undefined && event.button !== 0) return;
        dragging = true;
        pane.classList.add('is-dragging');
        handle.setPointerCapture(event.pointerId);
        scheduleUpdate(event.clientX);
        event.preventDefault();
      }

      function onPointerMove(event) {
        if (!dragging) return;
        scheduleUpdate(event.clientX);
      }

      function onPointerUp(event) {
        dragging = false;
        pane.classList.remove('is-dragging');
        if (handle.hasPointerCapture(event.pointerId)) {
          handle.releasePointerCapture(event.pointerId);
        }
      }

      handle.addEventListener('pointerdown', onPointerDown);
      pane.addEventListener('pointerdown', function (event) {
        if (event.target === handle || handle.contains(event.target)) return;
        onPointerDown(event);
      });
      pane.addEventListener('pointermove', onPointerMove);
      pane.addEventListener('pointerup', onPointerUp);
      pane.addEventListener('pointercancel', onPointerUp);

      handle.addEventListener('keydown', function (event) {
        var current = Number(handle.getAttribute('aria-valuenow') || DEFAULT_AFTER_PERCENT);
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          setComparePosition(pane, Math.max(5, current - 5));
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          setComparePosition(pane, Math.min(95, current + 5));
        }
      });
    }

    compareStage.querySelectorAll('.compare-pane').forEach(function (pane) {
      setComparePosition(pane, DEFAULT_AFTER_PERCENT);
      bindComparePane(pane);
    });

    var compareHint = document.querySelector('[data-compare-hint]');
    function dismissCompareHint() {
      if (compareHint) compareHint.classList.add('is-hidden');
      compareStage.querySelectorAll('.compare-handle').forEach(function (handle) {
        handle.classList.remove('is-pulse');
      });
    }

    compareStage.addEventListener('pointerdown', dismissCompareHint, { once: true });
    compareStage.addEventListener('keydown', dismissCompareHint, { once: true });

    if (!reducedMotion) {
      var activeHandle = compareStage.querySelector('.compare-pane.is-active .compare-handle');
      if (activeHandle) activeHandle.classList.add('is-pulse');
    } else if (compareHint) {
      compareHint.classList.add('is-hidden');
    }

    var tabs = document.querySelectorAll('[data-compare-tab]');
    var panes = compareStage.querySelectorAll('.compare-pane');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-compare-tab');
        tabs.forEach(function (other) {
          var active = other === tab;
          other.classList.toggle('is-active', active);
          other.setAttribute('aria-selected', active ? 'true' : 'false');
          other.tabIndex = active ? 0 : -1;
        });
        panes.forEach(function (pane) {
          var active = pane.getAttribute('data-pane') === id;
          pane.classList.toggle('is-active', active);
          pane.hidden = !active;
          if (active) setComparePosition(pane, DEFAULT_AFTER_PERCENT);
        });
      });
    });
  }

  // Reviews carousel
  var outer = document.getElementById('reviewsCarouselOuter');
  var track = document.getElementById('reviewsCarouselTrack');
  var set = document.getElementById('reviewsScrollSet');
  if (outer && track && set) {
    var clone = set.cloneNode(true);
    clone.removeAttribute('id');
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
    outer.addEventListener('mouseenter', function () {
      track.style.animationPlayState = 'paused';
    });
    outer.addEventListener('mouseleave', function () {
      track.style.animationPlayState = 'running';
    });
  }

  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('mobile-menu');

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenu(false);
    });
  }

  var refFilter = document.querySelector('[data-ref-filter]');
  if (refFilter) {
    refFilter.addEventListener('click', function (event) {
      var btn = event.target.closest('[data-ref-filter-btn]');
      if (!btn) return;
      var filter = btn.getAttribute('data-ref-filter-btn');
      refFilter.querySelectorAll('.ref-filter-btn').forEach(function (other) {
        var active = other === btn;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      document.querySelectorAll('[data-ref-item]').forEach(function (item) {
        var cat = item.getAttribute('data-ref-item');
        item.classList.toggle('is-hidden', filter !== 'all' && cat !== filter);
      });
    });
  }

  document.querySelectorAll('[data-faq-trigger]').forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.closest('.faq-item');
      if (!item) return;
      var open = !item.classList.contains('is-open');
      item.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // ── Scroll-Spy Navigation ──
  var navSectionLinks = document.querySelectorAll('[data-nav-section]');
  if (navSectionLinks.length) {
    var spySections = [];
    navSectionLinks.forEach(function (link) {
      var id = link.getAttribute('data-nav-section');
      var section = document.getElementById(id);
      if (section) spySections.push({ link: link, section: section });
    });

    function updateNavSpy() {
      var offset = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'), 10) || 88) + 48;
      var position = window.scrollY + offset;
      var active = spySections[0];

      spySections.forEach(function (entry) {
        if (entry.section.offsetTop <= position) active = entry;
      });

      navSectionLinks.forEach(function (link) {
        var isActive = link === active.link;
        link.classList.toggle('is-active', isActive);
        if (isActive) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }

    window.addEventListener('scroll', updateNavSpy, { passive: true });
    updateNavSpy();
  }

  // ── Sticky Mobile CTA + Zurück nach oben ──
  var stickyActions = document.getElementById('sticky-actions');
  var backToTop = document.getElementById('back-to-top');

  function updateFloatingUi() {
    var showMobileBar = window.scrollY > 280 && document.body.classList.contains('header-revealed');

    if (stickyActions) {
      if (showMobileBar) {
        stickyActions.removeAttribute('hidden');
        stickyActions.classList.add('is-visible');
      } else {
        stickyActions.classList.remove('is-visible');
        stickyActions.setAttribute('hidden', '');
      }
    }

    if (backToTop) {
      var showTop = window.scrollY > 520;
      backToTop.classList.toggle('is-visible', showTop);
      backToTop.hidden = !showTop;
    }
  }

  window.addEventListener('scroll', updateFloatingUi, { passive: true });
  updateFloatingUi();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }
}());
