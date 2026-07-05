import { useCallback, useEffect, useState } from 'react';
import BorderGlow from './components/BorderGlow';
import ClickSpark from './components/ClickSpark';
import GalleryLightbox from './components/GalleryLightbox';
import Lightfall from './components/Lightfall';
import PillNav from './components/PillNav';
import SplitText from './components/SplitText';
import {
  evidenceBlocks,
  portfolioData,
  resumeData,
  toolEvidenceBlocks,
} from './data/portfolio';

const LIGHTFALL_COLORS = ['#62c8e8', '#79e2c8', '#b7dfff'];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19 19 5M9 5h10v10" />
    </svg>
  );
}

function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <header className="section-heading reveal-item">
      <div className="section-heading__meta">
        <span>{index}</span>
        <p>{eyebrow}</p>
      </div>
      <div>
        <SplitText text={title} className="section-title" />
        {description && <p className="section-description">{description}</p>}
      </div>
    </header>
  );
}

function EvidenceBlock({ block, onOpen, tool = false }) {
  return (
    <BorderGlow
      className={`evidence-block reveal-item evidence-block--${block.id} ${
        tool ? 'evidence-block--tool' : ''
      }`}
    >
      <div className="evidence-block__copy">
        <span className="evidence-block__number">{block.number}</span>
        <div>
          <h3>{block.title}</h3>
          {block.text && <p>{block.text}</p>}
        </div>
      </div>

      {block.images.length > 0 && (
        <div className={`evidence-gallery evidence-gallery--${block.images.length}`}>
          {block.images.map((item, imageIndex) => (
          <button
            type="button"
            key={item.src}
            className="evidence-image"
            onClick={() => onOpen(block.images, imageIndex)}
            aria-label={`放大查看：${item.caption}`}
          >
            <img src={item.thumb} alt={item.alt} loading="lazy" />
            <span className="evidence-image__shade" />
            <span className="evidence-image__caption">
              {item.caption}
            </span>
            <span className="evidence-image__open" aria-hidden="true">
              ↗
            </span>
          </button>
          ))}
        </div>
      )}
    </BorderGlow>
  );
}

export default function App() {
  const [lightbox, setLightbox] = useState(null);
  const [copied, setCopied] = useState(false);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const changeLightbox = useCallback(
    (nextIndex) => setLightbox((current) => ({ ...current, index: nextIndex })),
    [],
  );

  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.reveal-item'));
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion) {
      items.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <PillNav />

      <main>
        <section id="home" className="hero">
          <div className="site-background" aria-hidden="true">
            <Lightfall
              colors={LIGHTFALL_COLORS}
              backgroundColor="#0a2440"
              speed={0.42}
              streakCount={2}
              streakWidth={1.55}
              streakLength={2.55}
              glow={0.74}
              density={0.28}
              twinkle={0.22}
              zoom={1.85}
              backgroundGlow={0.38}
              opacity={0.74}
              mouseInteraction
              mouseStrength={0.34}
              mouseRadius={0.72}
              dpr={1.25}
              paused={window.matchMedia('(prefers-reduced-motion: reduce)').matches}
            />
          </div>
          <div className="hero__content shell">
            <div className="hero__eyebrow reveal-item">
              <span className="status-dot" />
              {portfolioData.heroEyebrow}
            </div>
            <h1
              className="hero__title"
              aria-label={portfolioData.heroTitle.join(' ')}
            >
              {portfolioData.heroTitle.map((line, index) => (
                <SplitText
                  tag="span"
                  text={line}
                  className={`hero__title-line ${
                    index === portfolioData.heroTitle.length - 1
                      ? 'hero__title-line--accent'
                      : ''
                  }`}
                  splitType="words"
                  delay={0.09}
                  duration={1}
                  start="top 96%"
                  key={line}
                />
              ))}
            </h1>
            <div className="hero__footer reveal-item">
              <p>{portfolioData.heroDescription}</p>
              <ClickSpark>
                <a className="primary-link" href="#projects">
                  查看精选项目
                  <ArrowIcon />
                </a>
              </ClickSpark>
            </div>
          </div>

          <div className="hero__rail shell" aria-hidden="true">
            <span>CONTENT</span>
            <span>×</span>
            <span>AI WORKFLOW</span>
            <span>×</span>
            <span>CREATIVE OPERATIONS</span>
          </div>
        </section>

        <section id="about" className="section section--about">
          <div className="shell">
            <SectionHeading
              index="01"
              eyebrow="个人经历"
              title="既懂内容判断也能把AI真正接进工作"
              description="我关注的不只是“用什么工具”，而是怎么让内容更准、生产更快、表达更像IP本人。"
            />

            <div className="profile-layout">
              <figure className="portrait-card reveal-item">
                <img
                  src="/assets/images/portrait-professional.png"
                  alt="谢振宇的个人职业头像"
                />
                <figcaption>
                  <span>{portfolioData.name}</span>
                  <span>{portfolioData.role}</span>
                </figcaption>
              </figure>

              <div className="profile-main reveal-item">
                <div className="profile-intro">
                  <div className="profile-person-kicker">
                    {portfolioData.name} / XIE ZHENYU
                  </div>
                  <h2>{portfolioData.role}</h2>
                  <div className="profile-role-meta">
                    <span>{portfolioData.personalLine}</span>
                    <span>期望薪资：{portfolioData.expectedSalary}</span>
                  </div>
                  <div className="profile-paragraphs">
                    {portfolioData.profileParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="profile-meta-cards">
                    <BorderGlow className="profile-meta-card reveal-item" borderRadius={22}>
                      <span>现居</span>
                      <strong>{portfolioData.location}</strong>
                    </BorderGlow>
                    <BorderGlow className="profile-meta-card reveal-item" borderRadius={22}>
                      <span>年龄</span>
                      <strong>26岁</strong>
                    </BorderGlow>
                    <BorderGlow className="profile-meta-card reveal-item" borderRadius={22}>
                      <span>学历</span>
                      <strong>本科</strong>
                    </BorderGlow>
                  </div>

                </div>
              </div>
            </div>

            <div className="profile-stats profile-stats--wide">
              {portfolioData.stats.map((stat) => (
                <BorderGlow className="stat-card reveal-item" borderRadius={28} key={stat.label}>
                  <p>
                    {stat.value}
                    {stat.unit && <small>{stat.unit}</small>}
                  </p>
                  <span>{stat.label}</span>
                </BorderGlow>
              ))}
            </div>
          </div>
        </section>

        <section id="strengths" className="section section--strengths section--resume">
          <div className="shell">
            <SectionHeading
              index="02"
              eyebrow="FULL RESUME"
              title="教育与技能"
            />

            <div className="resume-grid">
              <article className="resume-panel reveal-item">
                <span className="resume-panel__label">教育背景</span>
                <h3>{resumeData.education.school}</h3>
                <time>{resumeData.education.period}</time>
              </article>

              <article className="resume-panel reveal-item">
                <span className="resume-panel__label">荣誉奖项</span>
                <ul>
                  {resumeData.awards.map((award) => (
                    <li key={award}>{award}</li>
                  ))}
                </ul>
              </article>

              <article className="resume-panel resume-panel--wide reveal-item">
                <span className="resume-panel__label">技能清单</span>
                <div className="skill-list">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.label}>
                      <strong>{skill.label}</strong>
                      <p>{skill.text}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="projects" className="section section--projects">
          <div className="shell">
            <SectionHeading
              index="03"
              eyebrow="WORK EXPERIENCE"
              title="工作经历与核心成果"
            />

            <article className="experience-overview reveal-item">
              <header>
                <div>
                  <span>{resumeData.mainExperience.period}</span>
                  <h3>{resumeData.mainExperience.company}</h3>
                </div>
                <strong>{resumeData.mainExperience.role}</strong>
              </header>
              <div className="experience-facts">
                {resumeData.mainExperience.facts.map((fact) => (
                  <div key={fact.label}>
                    <span>{fact.label}</span>
                    <p>{fact.text}</p>
                  </div>
                ))}
              </div>
              <p className="experience-overview__summary">
                {resumeData.mainExperience.overview}
              </p>
            </article>

            <article className="resume-panel resume-panel--wide experience-secondary-card reveal-item">
              <span className="resume-panel__label">实习经历</span>
              <header className="resume-panel__header">
                <div>
                  <h3>
                    {resumeData.secondaryExperience.company}｜
                    {resumeData.secondaryExperience.role}
                  </h3>
                  <time>{resumeData.secondaryExperience.period}</time>
                </div>
              </header>
              <p>{resumeData.secondaryExperience.project}</p>
              <ul>
                {resumeData.secondaryExperience.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>

            <div className="experience-overview__label experience-results-label reveal-item">
              核心成果
            </div>

            <div className="evidence-list">
              {evidenceBlocks.map((block) => (
                <EvidenceBlock
                  key={block.id}
                  block={block}
                  onOpen={(gallery, index) => setLightbox({ gallery, index })}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section section--strengths section--tools">
          <div className="shell">
            <div className="tools-heading reveal-item">
              <span>用Codex自研的软件与插件</span>
              <h2>用Codex做的提效插件和APP</h2>
            </div>

            <div className="evidence-list evidence-list--tools">
              {toolEvidenceBlocks.map((block) => (
                <EvidenceBlock
                  key={block.id}
                  block={block}
                  tool
                  onOpen={(gallery, index) => setLightbox({ gallery, index })}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-section__grid" aria-hidden="true" />
          <div className="shell contact-section__content">
            <p className="contact-section__eyebrow reveal-item">LET’S MAKE SOMETHING USEFUL</p>
            <div
              className="contact-section__title reveal-item"
              aria-label="如果你需要一个能把AI用进内容结果里的人 我们聊聊"
            >
              <SplitText
                tag="span"
                text="如果你需要一个能把AI用进内容结果里的人"
                className="contact-section__title-line"
                splitType="lines, words"
              />
              <SplitText
                tag="span"
                text="我们聊聊"
                className="contact-section__title-line"
                splitType="words"
              />
            </div>

            <div className="contact-actions reveal-item">
              <ClickSpark>
                <a className="contact-mail" href={`mailto:${portfolioData.email}`}>
                  <span>发送邮件</span>
                  {portfolioData.email}
                  <ArrowIcon />
                </a>
              </ClickSpark>
              <button className="copy-button" type="button" onClick={copyEmail}>
                {copied ? '邮箱已复制' : '复制邮箱'}
              </button>
              <a className="phone-link" href={`tel:${portfolioData.phone}`}>
                {portfolioData.phoneDisplay}
              </a>
            </div>

            <footer className="site-footer reveal-item">
              <span>© 2026 谢振宇</span>
              <span>AI内容运营编导 · 上海</span>
              <a href="#home">返回顶部 ↑</a>
            </footer>
          </div>
        </section>
      </main>

      {lightbox && (
        <GalleryLightbox
          gallery={lightbox.gallery}
          index={lightbox.index}
          onClose={closeLightbox}
          onChange={changeLightbox}
        />
      )}
    </>
  );
}
