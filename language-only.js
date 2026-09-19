(() => {
  const nodes = Array.from(document.querySelectorAll('[data-zh]'));
  const english = new Map(nodes.map(node => [node, node.textContent]));
  const controls = document.querySelectorAll('[data-language]');
  function apply(language) {
    const zh = language === 'zh';
    document.documentElement.lang = zh ? 'zh-Hans' : 'en';
    nodes.forEach(node => { node.textContent = zh ? node.dataset.zh : english.get(node); });
    controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    try { localStorage.setItem('portfolio-language', language); } catch (_) {}
  }
  controls.forEach(button => button.addEventListener('click', () => apply(button.dataset.language)));
  let saved;
  try { saved = localStorage.getItem('portfolio-language'); } catch (_) {}
  const requested = new URLSearchParams(location.search).get('lang');
  apply(['zh','en'].includes(requested) ? requested : (['zh','en'].includes(saved) ? saved : 'zh'));
})();
