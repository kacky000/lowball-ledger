// Lowball's page logic: load the checked deals, give each its verdict, then keep the list, the chips and the
// detail panel in step with the search box, the filters, the sort and the URL hash.

import { DEALS as FRIDAY, BOARD } from './deals-data.js';
import { SATURDAY } from './deals-saturday.js';
import { judgeDeal } from './verdict.js';
import { applyFilters, facetCounts, defaultState, stateToHash, hashToState } from './filters.js';
import { summaryHtml, topPicksHtml, chipsHtml, cardHtml, detailHtml } from './render.js';
import { slug } from './format.js';

const $ = (id) => document.getElementById(id);

/** Friday's board plus the deals found and read on Saturday 28 November. */
const DEALS = [...FRIDAY, ...SATURDAY];

/** Every deal with its verdict, score, discount, search text and same-product key. */
const all = DEALS.map((d, i) => {
  const j = judgeDeal(d);
  return {
    ...d,
    id: d.id ?? `${slug(d.store)}-${slug(d.product).slice(0, 40)}-${i}`,
    verdict: j.verdict,
    why: j.why,
    score: j.score,
    pct: j.pct,
    match: slug(d.match ?? d.product),
    haystack: `${d.product} ${d.brand} ${d.store} ${d.category}`.toLowerCase(),
  };
});

let state = hashToState(location.hash);

function draw() {
  const list = applyFilters(all, state);
  const counts = facetCounts(all, state);
  const c = chipsHtml(all, state, counts);
  $('cats').innerHTML = c.catChips;
  $('store').innerHTML = c.storeOpts;
  $('offs').innerHTML = c.offChips;
  $('verdicts').innerHTML = c.verdictChips;
  $('sort').innerHTML = c.sortOpts;
  if ($('q').value !== state.q) $('q').value = state.q;
  $('count').textContent = `${list.length} of ${all.length} deals`;
  $('grid').innerHTML = list.length
    ? list.map((d) => cardHtml(d, all)).join('')
    : `<div class="none"><b>No deal matches all of that.</b><button data-reset>Clear the filters</button></div>`;
  const open = all.find((d) => d.id === state.open);
  $('detail').hidden = !open;
  $('scrim').hidden = !open;
  if (open) $('detail').innerHTML = detailHtml(open, all);
  const hash = stateToHash(state);
  if (location.hash !== hash) history.replaceState(null, '', hash || location.pathname + location.search);
}

function set(patch) {
  state = { ...state, ...patch };
  draw();
}

function wire() {
  $('summary').innerHTML = summaryHtml(all, BOARD);
  $('picks').innerHTML = topPicksHtml(all);
  $('q').addEventListener('input', (e) => set({ q: e.target.value }));
  $('store').addEventListener('change', (e) => set({ store: e.target.value }));
  $('sort').addEventListener('change', (e) => set({ sort: e.target.value }));
  $('toggle-filters').addEventListener('click', () => document.body.classList.toggle('filters-open'));
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-group],[data-open],[data-close],[data-reset]');
    if (!t) return;
    if (t.dataset.group) set({ [t.dataset.group]: t.dataset.group === 'off' ? Number(t.dataset.value) : t.dataset.value });
    else if (t.dataset.open) { e.preventDefault(); set({ open: t.dataset.open }); }
    else if (t.hasAttribute('data-close')) set({ open: '' });
    else if (t.hasAttribute('data-reset')) set(defaultState());
  });
  $('scrim').addEventListener('click', () => set({ open: '' }));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && state.open) set({ open: '' }); });
  addEventListener('hashchange', () => { state = hashToState(location.hash); draw(); });
}

wire();
draw();
document.documentElement.dataset.ready = '1';
