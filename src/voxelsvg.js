// Render any voxel model as a static isometric SVG — pure data in, an <svg> string
// out. No three.js, no canvas, no mount step, so a DOM card (a ceremony, the dev
// gallery) can show the REAL creature model, not an emoji stand-in. Faces are culled
// against neighbours (like voxel.js) and painted back-to-front with top/right/front
// shading. Extracted from devtools so the line-draw ceremony (SUPER_PROMPT Phase 6:
// "a friend comes home") can reuse it in production.
const ISO = { tw: 14, th: 7, vh: 11 }; // tile width, depth-height, voxel up-height

export function shadeHex(hex, f) {
  const n = parseInt(String(hex).slice(1), 16);
  if (!Number.isFinite(n)) return hex;
  const c = (s) => Math.max(0, Math.min(255, Math.round(((n >> s) & 255) * f)));
  return `#${((1 << 24) + (c(16) << 16) + (c(8) << 8) + c(0)).toString(16).slice(1)}`;
}

export function voxelSvg(model, opts = {}) {
  const o = { ...ISO, ...opts };
  const pal = model?.palette || {};
  const vox = [];
  (model?.layers || []).forEach((layer, y) => {
    layer.forEach((row, z) => {
      for (let x = 0; x < row.length; x++) {
        const ch = row[x];
        if (ch === '.' || ch === ' ' || !pal[ch]) continue;
        vox.push({ x, y, z, hex: pal[ch] });
      }
    });
  });
  if (!vox.length) return '';
  const occ = new Set(vox.map((v) => `${v.x},${v.y},${v.z}`));
  const has = (x, y, z) => occ.has(`${x},${y},${z}`);
  // back-to-front: smaller (x+z) is farther; lower y first within a column
  vox.sort((a, b) => (a.x + a.z) - (b.x + b.z) || a.y - b.y || a.x - b.x);

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const pt = (x, y, z) => {
    const sx = (x - z) * (o.tw / 2);
    const sy = (x + z) * (o.th / 2) - y * o.vh;
    if (sx < minX) minX = sx; if (sx > maxX) maxX = sx;
    if (sy < minY) minY = sy; if (sy > maxY) maxY = sy;
    return `${sx.toFixed(1)},${sy.toFixed(1)}`;
  };
  const polys = [];
  for (const { x, y, z, hex } of vox) {
    if (!has(x, y + 1, z)) { // top (+y), brightest
      polys.push(`<polygon points="${pt(x, y + 1, z)} ${pt(x + 1, y + 1, z)} ${pt(x + 1, y + 1, z + 1)} ${pt(x, y + 1, z + 1)}" fill="${hex}"/>`);
    }
    if (!has(x + 1, y, z)) { // right (+x)
      polys.push(`<polygon points="${pt(x + 1, y, z)} ${pt(x + 1, y, z + 1)} ${pt(x + 1, y + 1, z + 1)} ${pt(x + 1, y + 1, z)}" fill="${shadeHex(hex, 0.8)}"/>`);
    }
    if (!has(x, y, z + 1)) { // front (+z), darkest
      polys.push(`<polygon points="${pt(x, y, z + 1)} ${pt(x + 1, y, z + 1)} ${pt(x + 1, y + 1, z + 1)} ${pt(x, y + 1, z + 1)}" fill="${shadeHex(hex, 0.62)}"/>`);
    }
  }
  const pad = 2;
  const w = (maxX - minX) + pad * 2;
  const h = (maxY - minY) + pad * 2;
  return `<svg class="mg-dev-voxel" viewBox="${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}" preserveAspectRatio="xMidYMid meet">${polys.join('')}</svg>`;
}
