import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';

const MAX_COLORS = 8;

const hexToRGB = (hex) => {
  const color = hex.replace('#', '').padEnd(6, '0');
  return [
    parseInt(color.slice(0, 2), 16) / 255,
    parseInt(color.slice(2, 4), 16) / 255,
    parseInt(color.slice(4, 6), 16) / 255,
  ];
};

const prepareColors = (input) => {
  const base = (input?.length ? input : ['#6ccff6', '#7fe5cf', '#d8efff']).slice(
    0,
    MAX_COLORS,
  );
  const colors = [];
  for (let index = 0; index < MAX_COLORS; index += 1) {
    colors.push(hexToRGB(base[Math.min(index, base.length - 1)]));
  }
  const average = [0, 0, 0];
  for (let index = 0; index < base.length; index += 1) {
    average[0] += colors[index][0];
    average[1] += colors[index][1];
    average[2] += colors[index][2];
  }
  average[0] /= base.length;
  average[1] /= base.length;
  average[2] /= base.length;
  return { colors, count: base.length, average };
};

const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;

uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform vec3 uColor6;
uniform vec3 uColor7;
uniform int uColorCount;
uniform vec3 uBgColor;
uniform vec3 uMouseColor;
uniform float uSpeed;
uniform int uStreakCount;
uniform float uStreakWidth;
uniform float uStreakLength;
uniform float uGlow;
uniform float uDensity;
uniform float uTwinkle;
uniform float uZoom;
uniform float uBgGlow;
uniform float uOpacity;
uniform float uMouseEnabled;
uniform float uMouseStrength;
uniform float uMouseRadius;

varying vec2 vUv;

vec3 palette(float h) {
  int count = uColorCount;
  if (count < 1) count = 1;
  int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));
  if (idx <= 0) return uColor0;
  if (idx == 1) return uColor1;
  if (idx == 2) return uColor2;
  if (idx == 3) return uColor3;
  if (idx == 4) return uColor4;
  if (idx == 5) return uColor5;
  if (idx == 6) return uColor6;
  return uColor7;
}

vec3 tanhv(vec3 x) {
  vec3 e = exp(-2.0 * x);
  return (1.0 - e) / (1.0 + e);
}

vec2 sceneC(vec2 frag, vec2 resolution) {
  vec2 point = (frag + frag - resolution) / resolution.x;
  float z = 0.0;
  float distanceToField = 1e3;
  vec4 origin = vec4(0.0);
  for (int index = 0; index < 39; index++) {
    if (distanceToField <= 1e-4) break;
    origin = z * normalize(vec4(point, uZoom, 0.0)) - vec4(0.0, 4.0, 1.0, 0.0) / 4.5;
    distanceToField = 1.0 - sqrt(length(origin * origin));
    z += distanceToField;
  }
  return vec2(origin.x, atan(origin.z, origin.y));
}

void mainImage(out vec4 outputColor, vec2 coordinate) {
  vec2 resolution = iResolution.xy;
  vec2 baseUv = (coordinate + coordinate - resolution) / resolution.x;
  float time = 0.1 * iTime * uSpeed + 9.0;
  float angularRings = max(1.0, floor(6.28318530718 * max(uDensity, 0.05) + 0.5));
  vec2 cell = vec2(5e-3, 6.28318530718 / angularRings);

  vec2 scene = sceneC(coordinate, resolution);
  vec2 sceneDx = sceneC(coordinate + vec2(1.0, 0.0), resolution);
  vec2 sceneDy = sceneC(coordinate + vec2(0.0, 1.0), resolution);
  vec2 derivativeX = sceneDx - scene;
  vec2 derivativeY = sceneDy - scene;
  derivativeX.y -= 6.28318530718 * floor(derivativeX.y / 6.28318530718 + 0.5);
  derivativeY.y -= 6.28318530718 * floor(derivativeY.y / 6.28318530718 + 0.5);
  vec2 fieldWidth = abs(derivativeX) + abs(derivativeY);
  coordinate = scene;

  vec2 fieldPoint = vec2(2.0, 1.0) * baseUv - (resolution / resolution.x) * vec2(0.0, 1.0);
  vec4 outputField = vec4(
    uBgColor * 90.0 * uBgGlow / (1e3 * dot(fieldPoint, fieldPoint) + 6.0),
    0.0
  );

  float mouseGlow = 0.0;
  if (uMouseEnabled > 0.5) {
    vec2 normalizedMouse = (iMouse + iMouse - resolution) / resolution.x;
    float mouseDistance = length(baseUv - normalizedMouse);
    mouseGlow = exp(
      -mouseDistance * mouseDistance / max(uMouseRadius * uMouseRadius, 1e-4)
    ) * uMouseStrength;
    outputField.rgb += uMouseColor * mouseGlow * 0.25;
  }

  float streakRadius = 5e-4 * uStreakWidth;
  vec2 smoothing = vec2(max(length(fieldWidth), 1e-5));
  float tail = 19.0 / max(uStreakLength, 0.05);

  for (int layer = 0; layer < 16; layer++) {
    if (layer >= uStreakCount) break;
    float layerIndex = float(layer) + 1.0;
    float randomCell = fract(
      sin(dot(vec2(layerIndex, floor(coordinate.x / cell.x + 0.5)), vec2(7.0, 11.0))) * 73.0
    );
    vec2 streakPoint = coordinate - (time + time * randomCell) * vec2(0.0, 1.0);
    streakPoint -= floor(streakPoint / cell + 0.5) * cell;
    float hue = fract(8663.0 * randomCell);
    vec3 streakColor = palette(hue);
    float weight = mix(1.5, 1.0 + sin(time + 7.0 * hue + 4.0), uTwinkle);
    weight *= 1.0 + mouseGlow * 2.0;
    vec2 inner = vec2(
      length(max(streakPoint, vec2(-1.0, 0.0))),
      length(streakPoint) - streakRadius
    ) - streakRadius;
    vec2 smoothMask = vec2(1.0) - smoothstep(-smoothing, smoothing, inner);
    outputField.rgb += dot(smoothMask, vec2(exp(tail * streakPoint.y), 3.0))
      * streakColor
      * weight;
    coordinate.x += cell.x / 8.0;
  }

  vec3 color = sqrt(
    tanhv(max(outputField.rgb * uGlow - vec3(0.04, 0.08, 0.02), 0.0))
  );
  outputColor = vec4(color, uOpacity);
}

void main() {
  vec4 color;
  mainImage(color, vUv * iResolution.xy);
  gl_FragColor = color;
}
`;

export default function Lightfall({
  className = '',
  colors = ['#6ccff6', '#7fe5cf', '#d8efff'],
  backgroundColor = '#0a2440',
  speed = 0.42,
  streakCount = 6,
  streakWidth = 0.8,
  streakLength = 1.7,
  glow = 0.72,
  density = 1.15,
  twinkle = 0.4,
  zoom = 2.4,
  backgroundGlow = 0.42,
  opacity = 0.72,
  mouseInteraction = true,
  mouseStrength = 0.34,
  mouseRadius = 0.72,
  mouseDampening = 0.2,
  paused = false,
  dpr = 1.25,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let renderer;
    let animationFrame;
    let resizeObserver;
    let canvas;
    let lastTime = 0;
    let pageHidden = document.hidden;
    const targetMouse = [0, 0];

    try {
      renderer = new Renderer({ dpr, alpha: true, antialias: true });
    } catch {
      container.classList.add('lightfall-container--fallback');
      return undefined;
    }

    const gl = renderer.gl;
    canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const prepared = prepareColors(colors);
    const uniforms = {
      iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
      iMouse: { value: [0, 0] },
      iTime: { value: 0 },
      uColor0: { value: prepared.colors[0] },
      uColor1: { value: prepared.colors[1] },
      uColor2: { value: prepared.colors[2] },
      uColor3: { value: prepared.colors[3] },
      uColor4: { value: prepared.colors[4] },
      uColor5: { value: prepared.colors[5] },
      uColor6: { value: prepared.colors[6] },
      uColor7: { value: prepared.colors[7] },
      uColorCount: { value: prepared.count },
      uBgColor: { value: hexToRGB(backgroundColor) },
      uMouseColor: { value: prepared.average },
      uSpeed: { value: speed },
      uStreakCount: { value: Math.max(1, Math.min(16, Math.round(streakCount))) },
      uStreakWidth: { value: streakWidth },
      uStreakLength: { value: streakLength },
      uGlow: { value: glow },
      uDensity: { value: density },
      uTwinkle: { value: twinkle },
      uZoom: { value: zoom },
      uBgGlow: { value: backgroundGlow },
      uOpacity: { value: opacity },
      uMouseEnabled: { value: mouseInteraction ? 1 : 0 },
      uMouseStrength: { value: mouseStrength },
      uMouseRadius: { value: mouseRadius },
    };

    const program = new Program(gl, { vertex, fragment, uniforms });
    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
    };

    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      const scale = renderer.dpr || 1;
      targetMouse[0] = (event.clientX - rect.left) * scale;
      targetMouse[1] = (rect.height - (event.clientY - rect.top)) * scale;
    };

    const handleVisibility = () => {
      pageHidden = document.hidden;
    };

    const render = (time) => {
      animationFrame = requestAnimationFrame(render);
      if (paused || pageHidden) return;
      uniforms.iTime.value = time * 0.001;

      if (mouseDampening > 0) {
        if (!lastTime) lastTime = time;
        const delta = (time - lastTime) / 1000;
        const factor = Math.min(1, 1 - Math.exp(-delta / Math.max(0.0001, mouseDampening)));
        uniforms.iMouse.value[0] +=
          (targetMouse[0] - uniforms.iMouse.value[0]) * factor;
        uniforms.iMouse.value[1] +=
          (targetMouse[1] - uniforms.iMouse.value[1]) * factor;
      } else {
        uniforms.iMouse.value = [...targetMouse];
      }
      lastTime = time;
      renderer.render({ scene: mesh });
    };

    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      canvas.remove();
      program.remove?.();
      geometry.remove?.();
      mesh.remove?.();
      renderer.destroy?.();
    };
  }, [
    backgroundColor,
    colors,
    density,
    dpr,
    glow,
    mouseDampening,
    mouseInteraction,
    mouseRadius,
    mouseStrength,
    opacity,
    paused,
    speed,
    streakCount,
    streakLength,
    streakWidth,
    twinkle,
    zoom,
  ]);

  return <div ref={containerRef} className={`lightfall-container ${className}`} />;
}
