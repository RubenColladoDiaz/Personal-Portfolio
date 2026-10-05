import { useEffect, useRef } from "react";

const readRGB = (name) =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
    .split(/\s+/)
    .join(",");

// Un campo de pequeños trazos, como limaduras de hierro, que se orientan
// hacia el cursor. Con un clic se lanza una onda. Si no hay ratón, un
// punto invisible pasea solo por la pantalla.
export default function FieldCanvas({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, gap = 30;
    let points = [];
    let fg = readRGB("--fg");
    let accent = readRGB("--accent");
    let running = true, visible = true, frame;
    const ripples = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, last: -Infinity };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = w < 640 ? 20 : 26;
      points = [];
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          points.push({ x, y, a: Math.random() * Math.PI * 2, l: 0 });
        }
      }
      if (pointer.last === -Infinity) {
        pointer.x = pointer.tx = w * 0.7;
        pointer.y = pointer.ty = h * 0.35;
      }
    };

    const local = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return { x, y, inside: x >= 0 && y >= 0 && x <= rect.width && y <= rect.height };
    };
    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      const p = local(e);
      pointer.tx = p.x;
      pointer.ty = p.y;
      pointer.last = performance.now();
    };
    const onDown = (e) => {
      const p = local(e);
      if (!p.inside || e.target.closest("a, button")) return;
      ripples.push({ x: p.x, y: p.y, t0: performance.now() });
      if (ripples.length > 4) ripples.shift();
    };
    const onTheme = () => {
      fg = readRGB("--fg");
      accent = readRGB("--accent");
      if (reduced) draw(performance.now());
    };

    const draw = (t) => {
      // Sin ratón reciente: el atractor pasea en una curva de Lissajous.
      if (t - pointer.last > 2600) {
        pointer.tx = w * (0.55 + 0.33 * Math.sin(t * 0.00021));
        pointer.ty = h * (0.45 + 0.3 * Math.sin(t * 0.00029 + 1.4));
      }
      pointer.x += (pointer.tx - pointer.x) * 0.075;
      pointer.y += (pointer.ty - pointer.y) * 0.075;

      for (let i = ripples.length - 1; i >= 0; i--) {
        if (t - ripples[i].t0 > 1800) ripples.splice(i, 1);
      }

      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      const reach = Math.max(w, h) * 0.26;

      const hot = [];
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgb(${fg})`;

      for (const p of points) {
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const d = Math.hypot(dx, dy);
        const near = Math.max(0, 1 - d / reach);
        let angle = Math.atan2(dy, dx) + (1 - near) * Math.sin(p.x * 0.008 + p.y * 0.006 + t * 0.0006) * 0.9;

        let wave = 0;
        for (const r of ripples) {
          const age = t - r.t0;
          const radius = age * 0.75;
          const rd = Math.hypot(p.x - r.x, p.y - r.y);
          const k = (1 - Math.abs(rd - radius) / 80) * (1 - age / 1800);
          if (k > wave) {
            wave = k;
            if (k > 0.08) angle = Math.atan2(p.y - r.y, p.x - r.x);
          }
        }
        wave = Math.max(0, wave);

        let da = angle - p.a;
        da = Math.atan2(Math.sin(da), Math.cos(da));
        p.a += da * (wave > 0.08 ? 0.35 : 0.1);

        const target = near * near * 15 + wave * 12;
        p.l += (target - p.l) * 0.15;

        const hx = Math.cos(p.a) * p.l * 0.5;
        const hy = Math.sin(p.a) * p.l * 0.5;
        const alpha = Math.min(1, 0.16 + near * near * 0.6 + wave * 0.6);

        if (p.l < 1.2) {
          ctx.globalAlpha = alpha;
          ctx.fillStyle = `rgb(${fg})`;
          ctx.fillRect(p.x - 0.6, p.y - 0.6, 1.2, 1.2);
          continue;
        }
        if (near > 0.85 || wave > 0.35) {
          hot.push(p.x - hx, p.y - hy, p.x + hx, p.y + hy, alpha);
          continue;
        }
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(p.x - hx, p.y - hy);
        ctx.lineTo(p.x + hx, p.y + hy);
        ctx.stroke();
      }

      ctx.strokeStyle = `rgb(${accent})`;
      ctx.lineWidth = 1.4;
      for (let i = 0; i < hot.length; i += 5) {
        ctx.globalAlpha = hot[i + 4];
        ctx.beginPath();
        ctx.moveTo(hot[i], hot[i + 1]);
        ctx.lineTo(hot[i + 2], hot[i + 3]);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t) => {
      if (running && visible) draw(t);
      frame = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) {
      draw(0);
    } else {
      frame = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([entry]) => (running = entry.isIntersecting));
    io.observe(canvas);
    const onVisibility = () => (visible = !document.hidden);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("themechange", onTheme);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("themechange", onTheme);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />;
}
