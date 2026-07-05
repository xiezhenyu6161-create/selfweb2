import { useEffect, useRef } from 'react';

export default function ClickSpark({ children, className = '' }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const sparks = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return undefined;
    const context = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time) => {
      const rect = wrapper.getBoundingClientRect();
      context.clearRect(0, 0, rect.width, rect.height);
      sparks.current = sparks.current.filter((spark) => time - spark.start < 460);

      sparks.current.forEach((spark) => {
        const progress = Math.min((time - spark.start) / 460, 1);
        const eased = 1 - (1 - progress) ** 3;
        const distance = eased * 24;
        const length = 9 * (1 - eased);
        context.strokeStyle = `rgba(215, 231, 255, ${1 - progress})`;
        context.lineWidth = 1.4;
        context.beginPath();
        context.moveTo(
          spark.x + Math.cos(spark.angle) * distance,
          spark.y + Math.sin(spark.angle) * distance,
        );
        context.lineTo(
          spark.x + Math.cos(spark.angle) * (distance + length),
          spark.y + Math.sin(spark.angle) * (distance + length),
        );
        context.stroke();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrapper);
    resize();
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleClick = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const start = performance.now();
    sparks.current.push(
      ...Array.from({ length: 8 }, (_, index) => ({
        x,
        y,
        start,
        angle: (Math.PI * 2 * index) / 8,
      })),
    );
  };

  return (
    <span
      ref={wrapperRef}
      className={`click-spark ${className}`}
      onClick={handleClick}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      {children}
    </span>
  );
}
