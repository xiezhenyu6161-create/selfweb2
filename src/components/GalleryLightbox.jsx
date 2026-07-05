import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function GalleryLightbox({ gallery, index, onClose, onChange }) {
  const closeRef = useRef(null);
  const image = gallery?.[index];

  useEffect(() => {
    if (!image) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') {
        onChange((index - 1 + gallery.length) % gallery.length);
      }
      if (event.key === 'ArrowRight') {
        onChange((index + 1) % gallery.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gallery, image, index, onChange, onClose]);

  if (!image) return null;

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="项目图片预览"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="lightbox__top">
        <span>
          {String(index + 1).padStart(2, '0')} /{' '}
          {String(gallery.length).padStart(2, '0')}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="关闭图片预览">
          关闭 <span aria-hidden="true">×</span>
        </button>
      </div>
      <figure className="lightbox__figure">
        <img src={image.src} alt={image.alt} />
        <figcaption>{image.caption}</figcaption>
      </figure>
      {gallery.length > 1 && (
        <>
          <button
            className="lightbox__arrow lightbox__arrow--prev"
            type="button"
            aria-label="上一张"
            onClick={() => onChange((index - 1 + gallery.length) % gallery.length)}
          >
            ←
          </button>
          <button
            className="lightbox__arrow lightbox__arrow--next"
            type="button"
            aria-label="下一张"
            onClick={() => onChange((index + 1) % gallery.length)}
          >
            →
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}
