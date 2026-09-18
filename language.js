(() => {
  const query = new URLSearchParams(location.search).get('lang');
  let saved;
  try { saved = localStorage.getItem('portfolio-language'); } catch (_) {}
  function setLanguage(lang) {
    lang = lang === 'en' ? 'en' : 'zh';
    try {
      const current = new URL(location.href);
      current.searchParams.set('lang', lang);
      history.replaceState(null, '', current);
    } catch (_) {}
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hans';
    document.querySelectorAll('[data-zh][data-en]').forEach(el => { el.textContent = el.dataset[lang]; });
    document.querySelectorAll('[data-language]').forEach(el => { el.setAttribute('aria-pressed', String(el.dataset.language === lang)); });
    document.querySelectorAll('a[href]').forEach(el => {
      const raw = el.getAttribute('href');
      if (!raw || raw.startsWith('#')) return;
      const url = new URL(raw, location.href);
      if (url.origin === location.origin && url.pathname.endsWith('.html')) {
        url.searchParams.set('lang', lang);
        el.setAttribute('href', url.pathname.split('/').pop() + url.search + url.hash);
      }
    });
    try { localStorage.setItem('portfolio-language', lang); } catch (_) {}
  }
  document.querySelectorAll('[data-language]').forEach(el => el.addEventListener('click', () => setLanguage(el.dataset.language)));
  setLanguage(query === 'en' || query === 'zh' ? query : saved);
})();