// Is it really a deal? Each deal gets a verdict from what its source said about the price's history and from how
// far below the usual price it sits, with the evidence spelled out, and a 0-100 score used to sort the best first.

const NEW_LOW = /(lowest|all[- ]time low|record low|never (been|seen) (it )?(this )?(lower|cheaper)|best price (ever|yet|we've seen)|new low|below the \$?[\d,]+ low|first discount|even lower than)/i;
const MATCH_LOW = /(matches|matching|ties|same as) (its |the )?(previous |prior |prime day |october |all[- ]time )?(lowest|low|best)|\d+-day low|beats the/i;
const ROUTINE = /(same (price )?as (prime day|last year|october)|frequent|often|regularly|routine|common)/i;
const INFLATED = /(inflated|comparison value|comp\. value|compare[- ]at)/i;

export const VERDICTS = {
  low: { key: 'low', label: 'New low', tone: 'good', blurb: 'The source says this is the lowest price it has tracked.' },
  strong: { key: 'strong', label: 'Strong price', tone: 'good2', blurb: 'A deep cut, or a match or beat of a recent low.' },
  fair: { key: 'fair', label: 'Fair sale', tone: 'mid', blurb: 'A real discount, but nothing says it is a record.' },
  routine: { key: 'routine', label: 'Routine or inflated', tone: 'meh', blurb: 'A small cut, a price that recurs, or a usual price that looks padded.' },
};

export function discountPct(d) {
  return d.was > 0 ? Math.round((1 - d.price / d.was) * 100) : 0;
}

export function saved(d) {
  return Math.max(0, d.was - d.price);
}

/** The verdict, the reason in a sentence, and the score. */
export function judgeDeal(d) {
  const pct = discountPct(d);
  const ev = d.evidence ?? '';
  let v;
  let why;
  if (INFLATED.test(ev)) {
    v = VERDICTS.routine;
    why = `${pct}% off a padded usual price: ${ev}`;
  } else if (NEW_LOW.test(ev) && !MATCH_LOW.test(ev)) {
    v = VERDICTS.low;
    why = `${d.sourceName}: “${ev}”`;
  } else if (MATCH_LOW.test(ev) || pct >= 40) {
    v = VERDICTS.strong;
    why = ev ? `${d.sourceName}: “${ev}”` : `${pct}% under the usual $${fmt(d.was)}`;
  } else if (ROUTINE.test(ev) || pct < 15) {
    v = VERDICTS.routine;
    why = ev ? `${d.sourceName}: “${ev}”` : `Only ${pct}% off; expect this price again`;
  } else {
    v = VERDICTS.fair;
    why = ev ? `${d.sourceName}: “${ev}”` : `${pct}% off; no price-history claim from the source`;
  }
  const evidenceBonus = { low: 30, strong: 18, fair: 6, routine: 0 }[v.key];
  const score = Math.max(1, Math.min(99, Math.round(pct * 0.9 + evidenceBonus + Math.min(12, Math.log10(1 + saved(d)) * 4))));
  return { verdict: v, why, score, pct };
}

function fmt(n) {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}
