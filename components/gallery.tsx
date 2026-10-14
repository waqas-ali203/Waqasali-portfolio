"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
export function Gallery({
  images,
  title,
}: {
  images: { src: string; caption: string }[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const move = (direction: number) =>
    setActive((a) => (a + direction + images.length) % images.length);
  useEffect(() => {
    if (!open) return;
    const d = dialog.current;
    if (!d) return;
    const previous = document.activeElement as HTMLElement;
    const old = document.body.style.overflow;
    d.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      d.close();
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, [open]);
  return (
    <div className="gallery">
      <div className="gallery-main">
        <button
          className="gallery-open"
          onClick={() => setOpen(true)}
          aria-label={`Inspect image ${active + 1} for ${title}`}
        >
          <Image
            src={images[active].src}
            alt={images[active].caption}
            width={1200}
            height={850}
            sizes="(max-width:800px) 100vw, 80vw"
          />
          <span className="arrow-circle">
            <Maximize2 size={18} />
          </span>
        </button>
      </div>
      <p className="gallery-caption">{images[active].caption}</p>
      <div className="gallery-thumbnails" aria-label="Choose image">
        {images.map((im, i) => (
          <button
            key={im.src}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-label={`Show image ${i + 1}: ${im.caption}`}
          >
            <Image src={im.src} alt="" width={160} height={110} />
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-labelledby="lightbox-title"
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
        }}
      >
        <div className="lightbox-top">
          <span id="lightbox-title" className="mono">
            {title} / Image {active + 1} of {images.length}
          </span>
          <button
            className="icon-button"
            aria-label="Close image viewer"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>
        <img
          className="lightbox-image"
          src={images[active].src}
          alt={images[active].caption}
          width="1200"
          height="850"
        />
        <div className="lightbox-bottom">
          <p role="status">{images[active].caption}</p>
          <div className="lightbox-buttons">
            <button
              className="icon-button"
              onClick={() => move(-1)}
              aria-label="Previous image"
            >
              <ArrowLeft />
            </button>
            <button
              className="icon-button"
              onClick={() => move(1)}
              aria-label="Next image"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
