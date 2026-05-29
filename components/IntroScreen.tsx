import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const name = 'SAIMANGALAM';

  useEffect(() => {
    if (sessionStorage.getItem('intro_shown') === 'true') {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('intro_shown', 'true');
        gsap.to(containerRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            if (containerRef.current) containerRef.current.style.display = 'none';
            onComplete();
          },
        });
      },
    });

    // Thin accent line animates in
    tl.fromTo(
      lineRef.current,
      { width: 0 },
      { width: 120, duration: 0.6, ease: 'power2.inOut' }
    );

    // Letters stagger in
    tl.fromTo(
      lettersRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    );

    // Subtitle line
    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.1'
    );

    // Tagline
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '+=0.1'
    );

    // Progress fill
    tl.fromTo(
      progressFillRef.current,
      { width: 0 },
      { width: 80, duration: 3, ease: 'none' },
      0
    );

    // Hold for a beat before exit (total ~3.2s)
    tl.to({}, { duration: 0.2 });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#f5f2ed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Accent line */}
      <div
        ref={lineRef}
        style={{
          height: 1,
          backgroundColor: '#1a1814',
          marginBottom: 24,
          width: 0,
        }}
      />

      {/* Company name */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(32px, 6vw, 72px)',
            fontWeight: 400,
            letterSpacing: '0.25em',
            color: '#1a1814',
            lineHeight: 1,
            display: 'flex',
          }}
        >
          {name.split('').map((char, i) => (
            <span
              key={i}
              ref={el => { if (el) lettersRef.current[i] = el; }}
              style={{ display: 'inline-block', opacity: 0 }}
            >
              {char}
            </span>
          ))}
        </div>

        <p
          ref={subRef}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(10px, 1.4vw, 18px)',
            fontWeight: 400,
            letterSpacing: '0.5em',
            color: '#8a8070',
            marginTop: 10,
            opacity: 0,
          }}
        >
          ELECTRICAL &amp; ENGINEERINGS
        </p>
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic',
          fontSize: 14,
          color: '#8a8070',
          letterSpacing: '0.15em',
          marginTop: 28,
          opacity: 0,
        }}
      >
        Powering India Since 1985
      </p>

      {/* Progress bar */}
      <div
        ref={progressTrackRef}
        style={{
          position: 'absolute',
          bottom: 48,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 80,
          height: 1,
          backgroundColor: 'rgba(26,24,20,0.15)',
          overflow: 'hidden',
        }}
      >
        <div
          ref={progressFillRef}
          style={{
            height: '100%',
            backgroundColor: '#1a1814',
            opacity: 0.4,
            width: 0,
          }}
        />
      </div>
    </div>
  );
};

export default IntroScreen;
