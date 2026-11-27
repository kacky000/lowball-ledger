// Search, filters and sorting over the deal list. The state is a plain object; the URL hash mirrors it so a view
// can be shared or bookmarked (and so a screenshot can open on a filtered view).

import { slug } from './format.js';

export const SORTS = {
  score: { label: 'Best deal first', cmp: (a, b) => b.score - a.score || b.pct - a.pct },
  pct: { label: 'Biggest % off', cmp: (a, b) => b.pct - a.pct || b.score - a.score },
  saved: { label: 'Most $ saved', cmp: (a, b) => (b.was - b.price) - (a.was - a.price) },
  low: { label: 'Lowest price', cmp: (a, b) => a.price - b.price },
  fresh: { label: 'Checked most recently', cmp: (a, b) => (b.checkedAt > a.checkedAt ? 1 : b.checkedAt < a.checkedAt ? -1 : 0) },
};

export const MIN_OFF = [0, 20, 30, 40, 50];

export function defaultState() {
  return { q: '', cat: 'all', store: 'all', off: 0, verdict: 'all', sort: 'score', open: '' };
}

/** The deals that pass the state's search and filters, sorted. */
export function applyFilters(deals, s) {
  const words = s.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const out = deals.filter((d) => {
    if (s.cat !== 'all' && slug(d.category) !== s.cat) return false;
    if (s.store !== 'all' && slug(d.store) !== s.store) return false;
    if (d.pct < s.off) return false;
    if (s.verdict !== 'all' && d.verdict.key !== s.verdict) return false;
    if (words.length) {
      const hay = d.haystack;
      if (!words.every((w) => hay.includes(w))) return false;
    }
    return true;
  });
  return out.sort((SORTS[s.sort] ?? SORTS.score).cmp);
}

/** Counts per category and per store under the other filters, for the chips' numbers. */
export function facetCounts(deals, s) {
  const cats = new Map();
  const stores = new Map();
  for (const d of applyFilters(deals, { ...s, cat: 'all' })) cats.set(slug(d.category), (cats.get(slug(d.category)) ?? 0) + 1);
  for (const d of applyFilters(deals, { ...s, store: 'all' })) stores.set(slug(d.store), (stores.get(slug(d.store)) ?? 0) + 1);
  return { cats, stores };
}

export function stateToHash(s) {
  const d = defaultState();
  const parts = Object.entries(s).filter(([k, v]) => v !== d[k] && v !== '').map(([k, v]) => `${k}=${encodeURIComponent(v)}`);
  return parts.length ? '#' + parts.join('&') : '';
}

export function hashToState(hash) {
  const s = defaultState();
  for (const part of hash.replace(/^#/, '').split('&')) {
    const [k, v] = part.split('=');
    if (!(k in s) || v === undefined) continue;
    s[k] = k === 'off' ? Number(v) || 0 : decodeURIComponent(v);
  }
  return s;
}
