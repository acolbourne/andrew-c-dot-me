'use client';

import { Lightbulb, LightbulbOff } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ModeSelect: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-colors hover:text-slate-900 focus:outline-none dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white"
      id="theme-toggle"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      type="button"
    >
      {theme === 'light' ? <Lightbulb /> : <LightbulbOff />}
    </button>
  );
};
