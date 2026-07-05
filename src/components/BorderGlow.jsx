import { useCallback, useRef } from 'react';

const GRADIENT_POSITIONS = [
  '80% 55%',
  '69% 34%',
  '8% 6%',
  '41% 38%',
  '86% 85%',
  '82% 18%',
  '51% 4%',
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function parseHSL(value) {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 184, s: 75, l: 70 };
  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  };
}

function glowVariables(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  return Object.fromEntries(
    opacities.map((opacity, index) => [
      `--glow-color${keys[index]}`,
      `hsl(${base} / ${Math.min(opacity * intensity, 100)}%)`,
    ]),
  );
}

function gradientVariables(inputColors) {
  const colors = inputColors.length
    ? inputColors
    : ['#69c7e8', '#78e1ca', '#b9ddff'];
  const variables = {};
  GRADIENT_POSITIONS.forEach((position, index) => {
    const color = colors[Math.min(COLOR_MAP[index], colors.length - 1)];
    variables[`--gradient-${index + 1}`] =
      `radial-gradient(at ${position}, ${color} 0px, transparent 52%)`;
  });
  variables['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return variables;
}

export default function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 34,
  glowColor = '184 75 70',
  backgroundColor = 'rgba(10, 16, 23, 0.88)',
  borderRadius = 28,
  glowRadius = 34,
  glowIntensity = 0.58,
  coneSpread = 22,
  colors = ['#62c8e8', '#77e2c8', '#b7dfff'],
  fillOpacity = 0.16,
}) {
  const cardRef = useRef(null);

  const handlePointerMove = useCallback((event) => {
    const card = cardRef.current;
    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const scaleX = dx === 0 ? Infinity : centerX / Math.abs(dx);
    const scaleY = dy === 0 ? Infinity : centerY / Math.abs(dy);
    const proximity = Math.min(Math.max(1 / Math.min(scaleX, scaleY), 0), 1);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    card.style.setProperty('--edge-proximity', `${(proximity * 100).toFixed(3)}`);
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
  }, []);

  const handlePointerLeave = useCallback(() => {
    cardRef.current?.style.setProperty('--edge-proximity', '0');
  }, []);

  return (
    <article
      ref={cardRef}
      className={`border-glow-card ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--color-sensitivity': edgeSensitivity + 18,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...glowVariables(glowColor, glowIntensity),
        ...gradientVariables(colors),
      }}
    >
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </article>
  );
}
