// Tiny tween engine + easing. One global ticker driven by main loop's update(dt).

export const ease = {
  linear: (t) => t,
  inQuad: (t) => t * t,
  outQuad: (t) => t * (2 - t),
  inOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  outCubic: (t) => 1 + (--t) * t * t,
  outBack: (t) => { const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
  outElastic: (t) => t === 0 || t === 1 ? t :
    Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1,
  outBounce: (t) => {
    const n1 = 7.5625, d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
};

const active = new Set();

// tween({ from, to, ms, ease, onUpdate(v, t), onDone, delay })
export function tween(opts) {
  const tw = {
    t: -(opts.delay || 0),
    ms: opts.ms || 300,
    from: opts.from ?? 0,
    to: opts.to ?? 1,
    ease: opts.ease || ease.outQuad,
    onUpdate: opts.onUpdate,
    onDone: opts.onDone,
    cancelled: false,
    cancel() { this.cancelled = true; active.delete(this); },
  };
  active.add(tw);
  return tw;
}

export function updateTweens(dtMs) {
  for (const tw of [...active]) {
    if (tw.cancelled) continue;
    tw.t += dtMs;
    if (tw.t < 0) continue;
    const k = Math.min(1, tw.t / tw.ms);
    const v = tw.from + (tw.to - tw.from) * tw.ease(k);
    tw.onUpdate?.(v, k);
    if (k >= 1) {
      active.delete(tw);
      tw.onDone?.();
    }
  }
}

export function delay(ms, fn) {
  return tween({ ms, onUpdate: () => {}, onDone: fn });
}

export function cancelAllTweens() { active.clear(); }

// Squash & stretch helper for hop animations: returns {sy, sxz}
export function squash(k) {
  // k 0..1 over a hop: anticipate squash, stretch mid-air, land squash
  if (k < 0.15) { const s = 1 - 0.25 * (k / 0.15); return { sy: s, sxz: 1 + 0.18 * (1 - s) * 4 }; }
  if (k < 0.6) { const s = (k - 0.15) / 0.45; return { sy: 1 + 0.22 * Math.sin(s * Math.PI), sxz: 1 - 0.1 * Math.sin(s * Math.PI) }; }
  const s = (k - 0.6) / 0.4;
  const land = Math.sin(s * Math.PI);
  return { sy: 1 - 0.18 * land, sxz: 1 + 0.12 * land };
}
