'use client';

import { gsap } from 'gsap';
import { MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { NavItems } from '@/types';
import { ModeSelect } from '../ModeSelect';

interface NavigationProps {
  items: NavItems;
}

const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!buttonRef.current) {
      return;
    }

    const icon = buttonRef.current.querySelector('svg');
    if (!icon) {
      return;
    }

    if (mobileMenu) {
      gsap.to(icon, {
        rotation: 180,
        scale: 1.1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    } else {
      gsap.to(icon, {
        rotation: -180,
        scale: 0.9,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          gsap.to(icon, {
            rotation: 0,
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
          });
        }
      });
    }
  }, [mobileMenu]);

  useEffect(() => {
    if (!menuRef.current) {
      return;
    }

    const menuItems = menuItemsRef.current.filter(Boolean);

    if (mobileMenu) {
      gsap.set(menuRef.current, { display: 'block' });
      gsap.fromTo(
        menuRef.current,
        {
          opacity: 0,
          y: -20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        menuItems,
        {
          opacity: 0,
          x: 30
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.1
        }
      );
    } else {
      gsap.to(menuItems, {
        opacity: 0,
        x: 30,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power3.in'
      });

      gsap.to(menuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          if (menuRef.current) {
            gsap.set(menuRef.current, { display: 'none' });
          }
        }
      });
    }
  }, [mobileMenu]);

  const handleToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleMouseEnter = () => {
    if (!buttonRef.current) {
      return;
    }

    const icon = buttonRef.current.querySelector('svg');
    if (!icon) {
      return;
    }

    gsap.to(icon, {
      scale: 1.15,
      rotation: mobileMenu ? 180 : 0,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) {
      return;
    }

    const icon = buttonRef.current.querySelector('svg');
    if (!icon) {
      return;
    }

    gsap.to(icon, {
      scale: mobileMenu ? 1.1 : 1,
      rotation: mobileMenu ? 180 : 0,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  return (
    <>
      <div className="flex items-center gap-6">
        <nav id="main-nav">
          {Object.values(items).map((item) => (
            <Link
              className="transition-colors hover:border-slate-900 hover:underline hover:decoration-2 hover:underline-offset-8"
              href={item.url}
              key={item.url}
              target={item.target ?? '_self'}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          id="mobile-nav-toggle"
          onClick={handleToggle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={buttonRef}
          type="button"
        >
          {mobileMenu === true ? <XIcon /> : <MenuIcon />}
        </button>

        <ModeSelect />
      </div>

      <div className="hidden" id="mobile-nav" ref={menuRef}>
        {Object.values(items).map((item, index) => (
          <Link
            className="block font-semibold text-lg text-slate-700 transition-colors hover:text-accent-light dark:text-slate-200 dark:hover:text-accent-dark"
            href={item.url}
            key={item.url}
            ref={(el) => {
              if (el) {
                menuItemsRef.current[index] = el;
              }
            }}
            target={item.target ?? '_self'}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navigation;
