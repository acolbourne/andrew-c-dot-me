'use client';

import { gsap } from 'gsap';
import { Lightbulb, LightbulbOff } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { tv } from 'tailwind-variants';

const modeSelectVariants = tv({
  slots: {
    base: 'mode-toggle',
    icon: 'flex items-center justify-center'
  }
});

const { base, icon } = modeSelectVariants();

export const ModeSelect: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!iconRef.current) {
      return;
    }

    const isLight: boolean = theme === 'light';

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          iconRef.current,
          {
            scale: 0.85,
            rotate: -20,
            opacity: isLight ? 0.6 : 0.8
          },
          {
            scale: 1.15,
            rotate: 10,
            opacity: 1,
            duration: 0.18,
            ease: 'power2.out'
          }
        )
        .to(iconRef.current, {
          scale: 1,
          rotate: 0,
          duration: 0.16,
          ease: 'back.out(3)'
        })
        .to(iconRef.current, {
          opacity: isLight ? 0.5 : 0.3,
          repeat: 1,
          yoyo: true,
          duration: 0.06,
          ease: 'power1.inOut'
        });
    }, iconRef);

    return () => ctx.revert();
  }, [theme]);

  return (
    <button
      className={base()}
      id="theme-toggle"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      type="button"
    >
      <span className={icon()} ref={iconRef}>
        {!mounted || theme === 'light' ? <Lightbulb /> : <LightbulbOff />}
      </span>
    </button>
  );
};
