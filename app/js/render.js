// Turning deals into HTML: the summary strip, the top picks, the filter chips with live counts, the deal cards
// (price, usual price, discount, verdict with its evidence, store link, check time and source) and the detail panel.

import { money, checkedLabel, esc, slug, host } from './format.js';
import { categoryIcon } from './icons.js';
import { VERDICTS } from './verdict.js';
import { SORTS, MIN_OFF } from './filters.js';

export function summaryHtml(all, meta) {
  const stores = new Set(all.map((d) => d.store)).size;
  const lows = all.filter((d) => d.verdict.key === 'low').length;
  const best = Math.max(...all.map((d) => d.pct));
  const times = all.map((d) => d.checkedAt).sort();
  return `
    <div class="stat"><b>${all.length}</b><span>deals checked</span></div>
    <div class="stat"><b>${stores}</b><span>stores</span></div>
    <div class="stat good"><b>${lows}</b><span>new lows</span></div>
    <div class="stat"><b>${best}%</b><span>deepest cut</span></div>
    <div class="stat wide"><b>${checkedLabel(times[0]).replace(' UTC', '')}–${checkedLabel(times[times.length - 1]).split(', ')[1]}</b><span>prices read on ${esc(meta.day)}</span></div>`;
}

export function topPicksHtml(all) {
  const picks = [...all].sort((a, b) => b.score - a.score).slice(0, 3);
  return picks.map((d, i) => `
    <a class="pick" href="#open=${d.id}" data-open="${d.id}">
      <span class="rank">#${i + 1}</span>
      <span class="pick-name">${esc(d.product)}</span>
      <span class="pick-price">${money(d.price)} <s>${money(d.was)}</s></span>
      <span class="badge ${d.verdict.tone}">${d.verdict.label}</span>
      <span class="pick-store">${esc(d.store)} · −${d.pct}%</span>
    </a>`).join('');
}

export function chipsHtml(all, state, counts) {
  const cats = [...new Set(all.map((d) => d.category))].sort();
  const stores = [...new Set(all.map((d) => d.store))].sort();
  const chip = (group, value, label, n, on) => `<button class="chip${on ? ' on' : ''}" data-group="${group}" data-value="${value}" aria-pressed="${on}">${label}${n === undefined ? '' : `<i>${n}</i>`}</button>`;
  const catChips = [chip('cat', 'all', 'All', undefined, state.cat === 'all')]
    .concat(cats.map((c) => chip('cat', slug(c), `${categoryIcon(c, 15)} ${esc(c)}`, counts.cats.get(slug(c)) ?? 0, state.cat === slug(c)))).join('');
  const storeOpts = ['<option value="all">All stores</option>']
    .concat(stores.map((s) => `<option value="${slug(s)}"${state.store === slug(s) ? ' selected' : ''}>${esc(s)} (${counts.stores.get(slug(s)) ?? 0})</option>`)).join('');
  const offChips = MIN_OFF.map((o) => chip('off', o, o ? `${o}%+ off` : 'Any discount', undefined, state.off === o)).join('');
  const verdictChips = [chip('verdict', 'all', 'Any verdict', undefined, state.verdict === 'all')]
    .concat(Object.values(VERDICTS).map((v) => chip('verdict', v.key, `<span class="dot ${v.tone}"></span>${v.label}`, undefined, state.verdict === v.key))).join('');
  const sortOpts = Object.entries(SORTS).map(([k, s]) => `<option value="${k}"${state.sort === k ? ' selected' : ''}>${s.label}</option>`).join('');
  return { catChips, storeOpts, offChips, verdictChips, sortOpts };
}

/** Other stores' prices for the same product, when the board holds them. */
function alsoAt(d, all) {
  const same = all.filter((o) => o !== d && o.match === d.match);
  if (!same.length) return '';
  return `<p class="also">Also at ${same.map((o) => `${esc(o.store)} ${money(o.price)}`).join(', ')}</p>`;
}

export function cardHtml(d, all) {
  return `
  <article class="card" id="deal-${d.id}">
    <header class="card-top">
      <span class="cat">${categoryIcon(d.category)}<span>${esc(d.category)}</span></span>
      <span class="off">−${d.pct}%</span>
    </header>
    <h3><button class="title" data-open="${d.id}">${esc(d.product)}</button></h3>
    <p class="store"><span class="store-chip">${esc(d.store)}</span>${d.condition ? `<span class="cond">${esc(d.condition)}</span>` : ''}</p>
    <div class="prices">
      <span class="now">${money(d.price)}</span>
      <span class="was">usual <s>${money(d.was)}</s></span>
      <span class="save">save ${money(Math.round((d.was - d.price) * 100) / 100)}</span>
    </div>
    <div class="verdict ${d.verdict.tone}">
      <span class="badge ${d.verdict.tone}">${d.verdict.label}</span>
      <span class="meter" title="Deal score ${d.score} of 100"><i style="width:${d.score}%"></i></span><b>${d.score}</b>
      <p>${esc(d.why)}</p>
    </div>
    ${alsoAt(d, all)}
    <footer class="card-foot">
      <span class="checked" title="Price read at ${esc(host(d.source))}">✓ ${checkedLabel(d.checkedAt)} · via <a href="${esc(d.source)}" rel="noopener" target="_blank">${esc(d.sourceName)}</a></span>
      <a class="go" href="${esc(d.url)}" rel="noopener nofollow" target="_blank">View at ${esc(d.store)} →</a>
    </footer>
  </article>`;
}

export function detailHtml(d, all) {
  const rows = [
    ['Store', esc(d.store)],
    ['Sale price', money(d.price)],
    ['Usual price', `${money(d.was)} (as stated by ${esc(d.sourceName)})`],
    ['Discount', `${d.pct}% · ${money(Math.round((d.was - d.price) * 100) / 100)} off`],
    ['Verdict', `<span class="badge ${d.verdict.tone}">${d.verdict.label}</span> ${esc(d.verdict.blurb)}`],
    ['Evidence', esc(d.why)],
    ['Condition', d.condition ? esc(d.condition) : 'None stated'],
    ['Price read', `${checkedLabel(d.checkedAt)} at <a href="${esc(d.source)}" target="_blank" rel="noopener">${esc(host(d.source))}</a>`],
  ];
  const others = all.filter((o) => o !== d && o.category === d.category).sort((a, b) => b.score - a.score).slice(0, 3);
  return `
    <button class="close" data-close aria-label="Close">×</button>
    <p class="cat">${categoryIcon(d.category)} ${esc(d.category)} · ${esc(d.brand)}</p>
    <h2>${esc(d.product)}</h2>
    <p class="big"><span class="now">${money(d.price)}</span> <s>${money(d.was)}</s> <span class="off">−${d.pct}%</span></p>
    <table>${rows.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</table>
    ${alsoAt(d, all)}
    <a class="go wide" href="${esc(d.url)}" target="_blank" rel="noopener nofollow">Open this deal at ${esc(d.store)} →</a>
    ${others.length ? `<h4>More ${esc(d.category)} deals</h4><ul class="more">${others.map((o) => `<li><button data-open="${o.id}">${esc(o.product)}</button> <b>${money(o.price)}</b> at ${esc(o.store)}</li>`).join('')}</ul>` : ''}`;
}
