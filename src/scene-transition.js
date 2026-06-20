const DEFAULT_IN_MS = 360;
const DEFAULT_OUT_MS = 300;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
const el = () => document.getElementById('scene-transition');

export function showSceneTransition(kind = 'portal') {
  const node = el();
  if (!node) return null;
  node.classList.remove('hidden', 'leaving', 'portal', 'soft');
  node.classList.add(kind, 'entering');
  node.setAttribute('aria-hidden', 'true');
  return node;
}

export function hideSceneTransition(ms = DEFAULT_OUT_MS) {
  const node = el();
  if (!node) return Promise.resolve(null);
  node.classList.remove('entering');
  node.classList.add('leaving');
  const finish = () => {
    node.classList.add('hidden');
    node.classList.remove('leaving', 'portal', 'soft');
    return node;
  };
  if (ms <= 0) return Promise.resolve(finish());
  return wait(ms).then(finish);
}

export async function runSceneTransition(swap, opts = {}) {
  const inMs = opts.inMs ?? DEFAULT_IN_MS;
  const outMs = opts.outMs ?? DEFAULT_OUT_MS;
  showSceneTransition(opts.kind || 'portal');
  await wait(inMs);
  await swap?.();
  await wait(outMs);
  await hideSceneTransition(0);
}
