// One small line icon per category, drawn as inline SVG paths (no image files, no icon font).

const P = {
  TVs: 'M3 5h18v11H3z M8 20h8 M12 16v4',
  Laptops: 'M5 5h14v10H5z M2 19h20l-2-4H4z',
  Tablets: 'M6 2h12v20H6z M11 18h2',
  Audio: 'M4 14a8 8 0 0 1 16 0 M4 14v4h3v-6H4 M20 14v4h-3v-6h3',
  Wearables: 'M8 2h8l1 5H7z M8 22h8l1-5H7z M6 7h12v10H6z',
  Phones: 'M7 2h10v20H7z M11 18h2',
  'Smart Home': 'M3 11l9-8 9 8 M5 9v12h14V9 M10 21v-6h4v6',
  Gaming: 'M6 9h12a4 4 0 0 1 0 8l-3-2H9l-3 2a4 4 0 0 1 0-8z M8 12v3 M6.5 13.5h3 M16 13h.01 M18 12h.01',
  Cameras: 'M3 7h4l2-3h6l2 3h4v12H3z M12 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
  Storage: 'M4 6h16v12H4z M7 14h.01 M10 14h7',
  Monitors: 'M2 4h20v12H2z M9 20h6 M12 16v4',
  Kitchen: 'M4 10h16v9H4z M6 10V6h12v4 M9 6V3 M15 6V3',
  Vacuums: 'M6 3v13 M6 16h8a3 3 0 0 1 0 6H6z M6 3h5',
  Home: 'M3 11l9-8 9 8 M5 9v12h14V9',
  Sleep: 'M3 18V8 M3 13h18v5 M21 18v-3 M7 13V9h6v4',
  Tools: 'M14 3l7 7-3 3-7-7z M11 6L3 14l7 7 8-8',
  Outdoors: 'M2 20h20 M12 4l8 16H4z M12 10v10',
  Toys: 'M5 8h14v12H5z M9 4h6v4H9z M9 13h.01 M15 13h.01',
  'Video Games': 'M6 9h12a4 4 0 0 1 0 8l-3-2H9l-3 2a4 4 0 0 1 0-8z',
  Beauty: 'M9 3h6v6H9z M7 9h10l-1 12H8z',
  Fashion: 'M8 3l4 3 4-3 5 4-3 4v10H6V11L3 7z',
  Fitness: 'M3 12h18 M6 8v8 M18 8v8 M3 10v4 M21 10v4',
  'E-readers': 'M5 2h14v20H5z M8 6h8 M8 10h8 M8 14h5',
  Travel: 'M5 7h14v12H5z M9 7V4h6v3 M8 19v2 M16 19v2',
};

export function categoryIcon(category, size = 22) {
  const d = P[category] ?? P.Home;
  return `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
}
