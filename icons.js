(() => {
  const iconMap = new Map([
    ['→','arrow-right'],['↗','arrow-up-right'],['↓','arrow-down'],['↑','arrow-up'],
    ['＋','plus'],['×','close'],['⌕','search'],['⌁','video'],['◉','lab'],
    ['✦','scan'],['⚡','bolt'],['✚','medical'],['♡','heart'],['▤','document'],
    ['▶','play'],['✓','check'],['●','circle'],['⌂','home'],['☰','menu'],
    ['♢','diamond'],['◇','diamond'],['🔒','lock'],['ⓘ','info'],['✉','mail'],
    ['◷','clock'],['↻','refresh'],['🌡','thermometer'],['☾','moon'],['◌','ring'],
    ['★','star'],['▣','grid'],['⌑','print'],['✧','sparkle']
  ]);
  const glyphPattern = new RegExp(`[${[...iconMap.keys()].join('')}]`, 'g');
  const excluded = new Set(['SCRIPT','STYLE','TEXTAREA','OPTION','CODE','PRE']);

  function makeIcon(name, label) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.classList.add('ui-icon', `ui-icon-${name}`);
    svg.setAttribute('viewBox','0 0 24 24');
    svg.setAttribute('aria-hidden','true');
    svg.setAttribute('focusable','false');
    svg.dataset.glyph = label;
    const use = document.createElementNS('http://www.w3.org/2000/svg','use');
    use.setAttribute('href',`icons.svg#ui-${name}`);
    svg.append(use);
    return svg;
  }

  function replaceTextNode(node) {
    if (!node.nodeValue || !glyphPattern.test(node.nodeValue)) return;
    glyphPattern.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    for (const match of node.nodeValue.matchAll(glyphPattern)) {
      if (match.index > cursor) fragment.append(node.nodeValue.slice(cursor, match.index));
      fragment.append(makeIcon(iconMap.get(match[0]), match[0]));
      cursor = match.index + match[0].length;
    }
    if (cursor < node.nodeValue.length) fragment.append(node.nodeValue.slice(cursor));
    node.replaceWith(fragment);
  }

  function normalize(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      if (!excluded.has(root.parentElement?.tagName)) replaceTextNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE && (excluded.has(root.tagName) || root.classList.contains('ui-icon'))) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: node => excluded.has(node.parentElement?.tagName) || node.parentElement?.closest('.ui-icon')
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(replaceTextNode);
  }

  function start() {
    normalize(document.body);
    new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(normalize)))
      .observe(document.body, {childList:true, subtree:true});
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start, {once:true}) : start();
})();
