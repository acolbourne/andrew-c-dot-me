'use client';

import { MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import type { NavItems } from '@/types';
import { ModeSelect } from '../ModeSelect';

type NavigationProps = {
  items: NavItems;
};

const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center gap-6">
        <nav id="main-nav">
          {Object.values(items).map((item) => (
            <Link
              className="transition-colors hover:text-slate-900 dark:hover:text-white"
              href={item.url}
              key={item.url}
              target={item.target ?? '_self'}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button id="mobile-nav-toggle" onClick={() => setMobileMenu(!mobileMenu)} type="button">
          {mobileMenu === true ? <XIcon /> : <MenuIcon />}
        </button>

        <ModeSelect />
      </div>

      <div className={mobileMenu === true ? 'block' : 'hidden'} id="mobile-nav">
        {Object.values(items).map((item) => (
          <Link
            className="block font-semibold text-lg text-slate-700 transition-colors hover:text-accent-light dark:text-slate-200 dark:hover:text-accent-dark"
            href={item.url}
            key={item.url}
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
