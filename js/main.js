/* ============================================================
   MADFARM ADVISORS — main.js
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Header scroll state --- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Mobile menu --- */
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    const main = document.querySelector('main');
    const footer = document.querySelector('.site-footer');
    const setMenu = (open, { returnFocus = false } = {}) => {
      navLinks.classList.toggle('open', open);
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
      // Page behind the open menu is out of reach for keyboard and screen readers
      [main, footer].forEach(el => el && (el.inert = open));
      if (open) navLinks.querySelector('a')?.focus();
      else if (returnFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) setMenu(false, { returnFocus: true });
    });
    // Close if the window grows past the mobile breakpoint
    window.matchMedia('(min-width: 721px)').addEventListener('change', (e) => {
      if (e.matches && navLinks.classList.contains('open')) setMenu(false);
    });
  }

  /* --- FAQ accordion --- */
  document.querySelectorAll('.faq-question').forEach((btn, i) => {
    const panel = btn.closest('.faq-item').querySelector('.faq-answer');
    panel.id ||= `faq-answer-${i + 1}`;
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', panel.id);
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      // close siblings within same .faq
      item.closest('.faq')?.querySelectorAll('.faq-item.open').forEach(open => {
        if (open !== item) {
          open.classList.remove('open');
          open.querySelector('.faq-answer').style.maxHeight = '0';
          open.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      answer.style.maxHeight = isOpen ? '0' : answer.scrollHeight + 'px';
    });
  });

  /* --- Reveal on scroll --- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* --- Contact form --- */
  const form = document.getElementById('contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('[type="submit"]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      status.className = 'form-status';
      const data = Object.fromEntries(new FormData(form).entries());
      if (!data.name || !data.email || !data.message) {
        status.textContent = 'Please add your name, email, and a short message.';
        status.classList.add('error');
        return;
      }
      const original = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('bad response');
        form.reset();
        status.textContent = 'Thank you — your message is on its way. We’ll be in touch shortly.';
        status.classList.add('ok');
      } catch (err) {
        status.textContent = 'Something went wrong. Please email info@madfarm-advisors.com directly.';
        status.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = original;
      }
    });
  }

});
