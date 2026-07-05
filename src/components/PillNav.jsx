import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const items = [
  { label: '首页', href: '#home' },
  { label: '关于我', href: '#about' },
  { label: '能力', href: '#strengths' },
  { label: '项目', href: '#projects' },
];

export default function PillNav() {
  const navRef = useRef(null);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    if (!navRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, delay: 0.15, ease: 'power3.out' },
    );
  }, []);

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <nav ref={navRef} className="pill-nav shell" aria-label="主要导航">
        <a className="brand-mark" href="#home" aria-label="返回首页">
          <span>ZY</span>
        </a>
        <div className="pill-nav__items">
          {items.map((item) => (
            <a
              key={item.href}
              className={active === item.href ? 'is-active' : ''}
              href={item.href}
              onClick={() => setActive(item.href)}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        <a className="nav-contact" href="#contact">
          联系我
          <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
