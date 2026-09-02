'use client';

import { useRef, useState } from 'react';
import HoverText from '@/components/HoverText/HoverText';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Reels.module.css';

/* ─── Reel data ──────────────────────────────────────────────────── */
const REELS = [
  {
    id: 1,
    src: 'https://res.cloudinary.com/aerhzjuo/video/upload/v1788034702/Main_oceoh0.mp4',
    title: 'Reel 1',
  },
  // {
  //   id: 2,
  //   src: 'https://res.cloudinary.com/aerhzjuo/video/upload/v1788034702/Main_oceoh0.mp4',
  //   title: 'Reel 2',
  // },
  // {
  //   id: 3,
  //   src: 'https://res.cloudinary.com/aerhzjuo/video/upload/v1788034702/Main_oceoh0.mp4',
  //   title: 'Reel 3',
  // },
];

/* ─── Play / Pause icon ──────────────────────────────────────────── */
function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

/* ─── Single Reel Card ───────────────────────────────────────────── */
function ReelCard({ reel }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={styles.reelCard}>
      <div className={styles.videoWrapper} onClick={togglePlay}>
        <video
          ref={videoRef}
          className={styles.video}
          src={reel.src}
          loop
          playsInline
          preload="metadata"
          onEnded={() => setIsPlaying(false)}
        />

        {/* Play / Pause overlay */}
        <div className={`${styles.playOverlay} ${isPlaying ? styles.playing : ''}`}>
          <div className={styles.playButton}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </div>
        </div>

        {/* Bottom gradient */}
        <div className={styles.bottomGradient} aria-hidden="true" />
      </div>
    </div>
  );
}

/* ─── Reels Section ──────────────────────────────────────────────── */
export default function Reels() {
  const sectionRef = useScrollReveal({ threshold: 0.08 });
  const headingRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      className={`${styles.section} reveal`}
      ref={sectionRef}
      aria-label="Reels"
    >
      <div className={`container ${styles.container}`}>
        {/* Header */}
        {/* <div className={`${styles.headerRow} reveal`} ref={headingRef}>
          <h2 className={styles.sectionHeading}>
            <HoverText as="span" type="words">Reels</HoverText>
          </h2>
          <p className={styles.sectionSubheading}>
            Mirá lo que estamos haciendo
          </p>
        </div> */}

        {/* Reels container */}
        <div className={styles.grid}>
          {REELS.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>
      </div>
    </section>
  );
}
