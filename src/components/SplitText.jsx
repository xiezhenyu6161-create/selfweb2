import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

export default function SplitText({
  text,
  tag: Tag = 'h2',
  className = '',
  splitType = 'lines, words',
  delay = 0.06,
  duration = 0.85,
  start = 'top 88%',
}) {
  const ref = useRef(null);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !fontsReady) return undefined;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

      const split = GSAPSplitText.create(ref.current, {
        type: splitType,
        autoSplit: splitType.includes('lines'),
        linesClass: 'split-line',
        wordsClass: 'split-word',
        aria: 'auto',
        onSplit(self) {
          const targets = splitType.includes('words') ? self.words : self.lines;
          return gsap.fromTo(
            targets,
            { yPercent: 115, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration,
              stagger: delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ref.current,
                start,
                once: true,
              },
            },
          );
        },
      });

      return () => split.revert();
    },
    { dependencies: [text, fontsReady, splitType, delay, duration, start], scope: ref },
  );

  return (
    <Tag ref={ref} className={`split-text ${className}`}>
      {text}
    </Tag>
  );
}
