import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import LanguageTranslator from '../LanguageTranslator';
import Container from '../container/Container';
import { cn } from '../../lib/cn';
import { navItems, type SectionId } from '../../lib/sections';

type NavbarProps = {
  activeSection: SectionId;
  isDarkMode: boolean;
  isMenuOpen: boolean;
  isScrolled: boolean;
  onScrollToSection: (sectionId: SectionId) => void;
  onToggleMenu: () => void;
  onToggleTheme: () => void;
};

export default function Navbar({
  activeSection,
  isDarkMode,
  isMenuOpen,
  isScrolled,
  onScrollToSection,
  onToggleMenu,
  onToggleTheme,
}: NavbarProps) {
  const logoSrc = isDarkMode ? '/Logo-white.png' : '/Logo-dark.png';

  return (
    <motion.nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled ? 'py-3' : 'py-5'
      )}
    >
      <Container size="xl">
        <div
          className={cn(
            'flex items-center justify-between rounded-full px-2.5 py-2 transition-all duration-300 sm:px-4',
            isScrolled
              ? isDarkMode
                ? 'border border-white/10 bg-slate-950/75 shadow-2xl shadow-slate-950/30 backdrop-blur-xl'
                : 'border border-slate-200/80 bg-white/85 shadow-xl shadow-indigo-200/40 backdrop-blur-xl'
              : isDarkMode
                ? 'bg-slate-950/10 text-white'
                : 'bg-white/25 text-slate-950 backdrop-blur-sm'
          )}
        >
          <button
            type="button"
            className="group flex items-center gap-3"
            onClick={() => onScrollToSection('home')}
          >
            <motion.div
              className={cn(
                'relative h-10 w-10 overflow-hidden rounded-xl shadow-lg shadow-indigo-500/30',
                isDarkMode
                  ? 'bg-slate-900/80 ring-1 ring-white/10'
                  : 'bg-white/90 ring-1 ring-slate-900/10',
              )}
              whileHover={{ y: -2, rotate: -3 }}
            >
              <Image
                src={logoSrc}
                alt="Nasir Malik logo"
                fill
                className="object-contain p-2"
              />
            </motion.div>
            <span className={cn('hidden text-lg font-extrabold tracking-normal sm:inline', isDarkMode ? 'text-white' : 'text-slate-950')}>
              Nasir Malik
            </span>
          </button>

          <ul className="hidden items-center gap-3 lg:flex xl:gap-5">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={cn(
                    'relative px-1 py-2 text-sm font-semibold transition-colors',
                    activeSection === item.id
                      ? isDarkMode
                        ? 'text-orange-300'
                        : 'text-indigo-700'
                      : isDarkMode
                        ? 'text-slate-100 hover:text-orange-300'
                        : 'text-slate-900 hover:text-indigo-700'
                  )}
                  onClick={() => onScrollToSection(item.id)}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-orange-400"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LanguageTranslator />

            <button
              type="button"
              className="hidden rounded-full p-1 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:block"
              onClick={onToggleTheme}
              aria-label="Toggle dark mode"
            >
              <span
                className={cn(
                  'relative block h-7 w-14 rounded-full transition-colors',
                  isDarkMode ? 'bg-white/15' : 'bg-slate-300'
                )}
              >
                <motion.span
                  className="absolute top-1 grid h-5 w-5 place-items-center rounded-full bg-indigo-600 text-[11px] shadow-md"
                  animate={{ x: isDarkMode ? 30 : 4 }}
                  transition={{ type: 'spring', stiffness: 520, damping: 32 }}
                >
                  {isDarkMode ? (
                    <FaSun className="h-3 w-3 text-white" aria-hidden="true" />
                  ) : (
                    <FaMoon className="h-3 w-3 text-white" aria-hidden="true" />
                  )}
                </motion.span>
              </span>
            </button>

            <button
              type="button"
              className={cn(
                'grid h-10 w-10 place-items-center rounded-full border shadow-sm transition lg:hidden',
                isDarkMode
                  ? 'border-white/15 bg-white/5 text-white'
                  : 'border-slate-300/80 bg-white/70 text-slate-900'
              )}
              onClick={onToggleMenu}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <FaTimes className="h-4 w-4" aria-hidden="true" />
              ) : (
                <FaBars className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={cn(
                'mt-3 grid gap-2 rounded-3xl border p-4 shadow-2xl backdrop-blur-xl lg:hidden',
                isDarkMode
                  ? 'border-white/10 bg-slate-950/90 shadow-slate-950/40'
                  : 'border-slate-200 bg-white/95 shadow-indigo-200/40'
              )}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={cn(
                    'rounded-2xl px-4 py-3 text-center text-base font-bold transition',
                    activeSection === item.id
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                      : isDarkMode
                        ? 'text-slate-100 hover:bg-white/10'
                        : 'text-slate-900 hover:bg-indigo-50'
                  )}
                  onClick={() => onScrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.nav>
  );
}
