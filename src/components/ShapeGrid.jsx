import { useEffect, useRef } from 'react';

export default function ShapeGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationId;
    const pointer = { x: -999, y: -999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const cell = width > 1000 ? 64 : 48;
      const offset = reduceMotion ? 0 : (frame * 0.08) % cell;

      for (let x = -cell; x < width + cell; x += cell) {
        for (let y = -cell; y < height + cell; y += cell) {
          const px = x + offset;
          const py = y + offset * 0.35;
          const distance = Math.hypot(pointer.x - px, pointer.y - py);
          const glow = Math.max(0, 1 - distance / 240);
          context.strokeStyle = `rgba(158, 194, 238, ${0.055 + glow * 0.2})`;
          context.lineWidth = glow > 0.35 ? 1.2 : 0.7;
          context.strokeRect(px, py, cell, cell);
          if (glow > 0.05) {
            context.fillStyle = `rgba(118, 169, 235, ${glow * 0.055})`;
            context.fillRect(px, py, cell, cell);
          }
        }
      }

      frame += 1;
      if (!reduceMotion) animationId = requestAnimationFrame(draw);
    };

    const handlePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      if (reduceMotion) draw();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('pointermove', handlePointer, { passive: true });
    resize();
    draw();

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointer);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas className="shape-grid" ref={canvasRef} aria-hidden="true" />;
}
