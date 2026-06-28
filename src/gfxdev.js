// Dev-only graphics tuning panel + perf overlay. NEVER shipped: main.js imports
// this lazily behind `import.meta.env.DEV`, so Vite keeps it out of the production
// bundle entirely (like devtools.js). It mounts a small floating panel to the body
// with live sliders (sun/fill/hemi/bloom/water/ambient), action buttons (capture
// screenshot, freeze ambient, toggle perf overlay), and a perf readout
// (frame-time bucket, renderer.info, entity counts) so later phases are tunable
// without code edits and measurable without guesswork.
import { GFX, GFX_TUNING } from './gfx.js';

const fmt = (n) => (Number.isFinite(n) ? n.toLocaleString('en-US') : '–');

function slider(label, key, min, max, step, value) {
  return `<label class="gfxdev-row">
    <span>${label}</span>
    <input type="range" data-tune="${key}" min="${min}" max="${max}" step="${step}" value="${value}">
    <output data-out="${key}">${value}</output>
  </label>`;
}

const STYLE = `
#gfxdev{position:fixed;right:8px;top:8px;z-index:99999;width:236px;font:11px/1.4 monospace;
  background:rgba(20,24,30,.92);color:#e7f0ff;border:1px solid #4a5a70;border-radius:8px;padding:8px;
  box-shadow:0 4px 16px rgba(0,0,0,.4);user-select:none}
#gfxdev h5{margin:0 0 6px;font-size:12px;color:#ffd966}
#gfxdev .gfxdev-row{display:grid;grid-template-columns:64px 1fr 34px;gap:4px;align-items:center;margin:2px 0}
#gfxdev .gfxdev-row span{color:#9fb4cf}
#gfxdev input[type=range]{width:100%}
#gfxdev output{text-align:right;color:#cfe3ff}
#gfxdev .gfxdev-btns{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0}
#gfxdev button{flex:1 1 auto;background:#2c3a4e;color:#e7f0ff;border:1px solid #4a5a70;border-radius:5px;
  padding:4px 6px;font:11px monospace;cursor:pointer}
#gfxdev button.on{background:#3a6b3a;border-color:#5fa05f}
#gfxdev .gfxdev-flags{color:#8aa0bb;font-size:10px;margin:4px 0;word-break:break-word}
#gfxdev .gfxdev-perf{border-top:1px solid #4a5a70;margin-top:6px;padding-top:6px;display:none}
#gfxdev .gfxdev-perf.on{display:block}
#gfxdev .gfxdev-perf b{color:#ffd966}
#gfxdev .gfxdev-min{position:absolute;right:6px;top:6px;background:none;border:0;color:#9fb4cf;flex:0;padding:0 4px}`;

export function createGfxDev(game) {
  if (typeof document === 'undefined') return null;
  const root = document.createElement('div');
  root.id = 'gfxdev';
  const style = document.createElement('style');
  style.textContent = STYLE;
  document.head.appendChild(style);

  const flagSummary = Object.entries(GFX)
    .map(([k, v]) => `${k}:${v}`).join(' · ');

  root.innerHTML = `
    <button class="gfxdev-min" title="hide">✕</button>
    <h5>Graphics dev</h5>
    <div class="gfxdev-flags">tier <b>${GFX.tier}</b> — ${flagSummary}</div>
    ${slider('exposure', 'exposure', 0.3, 2.5, 0.02, GFX_TUNING.exposure)}
    ${slider('sun', 'sunIntensity', 0, 3, 0.05, GFX_TUNING.sunIntensity)}
    ${slider('fill', 'fillIntensity', 0, 2, 0.05, GFX_TUNING.fillIntensity)}
    ${slider('hemi', 'hemiIntensity', 0, 2, 0.05, GFX_TUNING.hemiIntensity)}
    ${slider('bloom', 'bloomIntensity', 0, 3, 0.05, GFX_TUNING.bloomIntensity)}
    ${slider('water', 'waterSpeed', 0, 3, 0.05, GFX_TUNING.waterSpeed)}
    ${slider('ambient', 'ambientScale', 0, 1, 0.05, GFX_TUNING.ambientScale)}
    <div class="gfxdev-btns">
      <button data-act="shot">📷 shot</button>
      <button data-act="freeze">❄ freeze</button>
      <button data-act="perf">📊 perf</button>
    </div>
    <div class="gfxdev-perf" id="gfxdev-perf">
      <div>frame <b data-perf="ft">–</b> · <span data-perf="bucket">–</span></div>
      <div>draws <b data-perf="calls">–</b> tris <b data-perf="tris">–</b></div>
      <div>geo <b data-perf="geo">–</b> tex <b data-perf="tex">–</b></div>
      <div>actors <b data-perf="actors">–</b></div>
    </div>`;
  document.body.appendChild(root);

  // --- live light tuning (the only flags wired in Phase 0; later phases read the
  //     rest of GFX_TUNING) -------------------------------------------------------
  const applyLights = () => {
    const w = game?.world;
    if (!w) return;
    if (w.sun) w.sun.intensity = GFX_TUNING.sunIntensity;
    if (w.fill) w.fill.intensity = GFX_TUNING.fillIntensity;
    if (w.hemi) w.hemi.intensity = GFX_TUNING.hemiIntensity;
    // exposure only does anything when tone mapping is on (medium/high tier)
    if (w.toneMap && w.renderer) w.renderer.toneMappingExposure = GFX_TUNING.exposure;
    // bloom slider drives the composer's MASTER amount (the additive-quad opacity), so
    // it scales the whole bloom 0→off across the slider range. 0.3 is the build-time
    // base in world.js (bloomIntensity = 1). High tier only; no-op until it has loaded.
    if (w.composer) w.composer.setBloom({ amount: 0.3 * (GFX_TUNING.bloomIntensity || 1) });
  };

  root.addEventListener('input', (e) => {
    const key = e.target?.dataset?.tune;
    if (!key) return;
    const v = Number(e.target.value);
    GFX_TUNING[key] = v;
    const out = root.querySelector(`[data-out="${key}"]`);
    if (out) out.textContent = String(v);
    applyLights();
  });

  let frozen = false;
  let perfOn = false;
  root.addEventListener('click', (e) => {
    const act = e.target?.dataset?.act;
    if (act === 'shot') {
      try {
        const w = game?.world;
        w?.renderer?.render(w.scene, w.camera); // ensure the framebuffer is fresh
        const data = w?.renderer?.domElement?.toDataURL('image/png');
        if (data) {
          const a = document.createElement('a');
          a.href = data; a.download = `mg-shot-${GFX.tier}.png`; a.click();
        }
      } catch { /* preserveDrawingBuffer may be off; ignore */ }
    } else if (act === 'freeze') {
      frozen = !frozen;
      e.target.classList.toggle('on', frozen);
      if (game) game.devFreezeAmbient = frozen;
    } else if (act === 'perf') {
      perfOn = !perfOn;
      e.target.classList.toggle('on', perfOn);
      root.querySelector('#gfxdev-perf')?.classList.toggle('on', perfOn);
    }
  });
  root.querySelector('.gfxdev-min')?.addEventListener('click', () => root.remove());

  applyLights();

  // --- perf sampling (called from the main loop) --------------------------------
  let acc = 0, frames = 0, lastShown = 0;
  const set = (k, v) => { const el = root.querySelector(`[data-perf="${k}"]`); if (el) el.textContent = v; };

  function tick(dtMs) {
    if (!perfOn) return;
    acc += dtMs; frames += 1;
    if (acc - lastShown < 250) return; // refresh ~4×/s to stay readable
    const ft = acc / frames;
    lastShown = 0; acc = 0; frames = 0;
    const bucket = ft < 16 ? '<16ms ✓' : ft < 33 ? '<33ms' : '>33ms ✗';
    set('ft', ft.toFixed(1) + 'ms');
    set('bucket', bucket);
    const info = game?.world?.renderer?.info;
    if (info) {
      set('calls', fmt(info.render?.calls));
      set('tris', fmt(info.render?.triangles));
      set('geo', fmt(info.memory?.geometries));
      set('tex', fmt(info.memory?.textures));
    }
    const actors = (game?.place?.ambient?.actors?.length)
      ?? (game?.ambient?.actors?.length) ?? 0;
    set('actors', fmt(actors));
  }

  return { el: root, tick, dispose: () => { root.remove(); style.remove(); } };
}
