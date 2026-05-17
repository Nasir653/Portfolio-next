'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'motion/react';
import { FaBell, FaBriefcase, FaComments, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import CtaButton from './componants/cta-button/CtaButton';
import HeroSection from './componants/hero/HeroSection';
import Navbar from './componants/navbar/Navbar';
import { cn } from './lib/cn';
import { navItems, type SectionId } from './lib/sections';

const Skills = dynamic(() => import('./componants/skills/skills'));
const Experience = dynamic(() => import('./componants/experience/Experience'));
const Certificates = dynamic(() => import('./componants/certificates/Certificates'));
const Education = dynamic(() => import('./componants/education/Educations'));
const Contact = dynamic(() => import('./componants/contact/ContactMe'));
const Footer = dynamic(() => import('./componants/footer/Footer'));
const SimpleChatbot = dynamic(() => import('./componants/chatbot/SimpleChatbot'), {
  ssr: false,
});

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const notificationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notificationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chatbotRef = useRef<HTMLDivElement | null>(null);

  const playNotificationSound = useCallback(() => {
    try {
      const AudioContextConstructor =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

      if (!AudioContextConstructor) {
        return;
      }

      const audioContext = new AudioContextConstructor();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.type = 'sine';
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.08;
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.45);
      oscillator.stop(audioContext.currentTime + 0.45);
    } catch {
      console.log('Web Audio API not supported');
    }
  }, []);

  const clearNotificationTimers = useCallback(() => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
      notificationTimerRef.current = null;
    }

    if (notificationIntervalRef.current) {
      clearInterval(notificationIntervalRef.current);
      notificationIntervalRef.current = null;
    }
  }, []);

  const showChatbotNotification = useCallback(() => {
    setShowNotification(true);
    playNotificationSound();

    window.setTimeout(() => {
      setShowNotification(false);
    }, 8000);
  }, [playNotificationSound]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearNotificationTimers();
    };
  }, [clearNotificationTimers]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
    // REMOVED the body background color - let HeroSection handle it
    document.body.className = cn(
      'min-h-screen overflow-x-hidden font-sans antialiased',
      isDarkMode ? 'bg-transparent' : 'bg-transparent'
    );
  }, [isDarkMode]);

  useEffect(() => {
    if (showChatbot) {
      clearNotificationTimers();
      setShowNotification(false);
      return undefined;
    }

    clearNotificationTimers();
    notificationTimerRef.current = setTimeout(() => {
      showChatbotNotification();
      notificationIntervalRef.current = setInterval(showChatbotNotification, 200000);
    }, 30000);

    return clearNotificationTimers;
  }, [clearNotificationTimers, showChatbot, showChatbotNotification]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;

      if (
        showChatbot &&
        chatbotRef.current &&
        target &&
        !chatbotRef.current.contains(target) &&
        !(target instanceof Element && target.closest('.chatbot-trigger'))
      ) {
        setShowChatbot(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showChatbot]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowChatbot(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const updateActiveSection = () => {
      animationFrameId = null;
      const anchorY = window.innerHeight * 0.35;
      let currentSection: SectionId = 'home';

      for (const item of navItems) {
        const section = document.getElementById(item.id);

        if (!section) {
          continue;
        }

        const rect = section.getBoundingClientRect();

        if (rect.top <= anchorY) {
          currentSection = item.id;
        }

        if (rect.top <= anchorY && rect.bottom > anchorY) {
          currentSection = item.id;
          break;
        }
      }

      setActiveSection(currentSection);
    };

    const scheduleActiveSectionUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleActiveSectionUpdate();
    window.addEventListener('scroll', scheduleActiveSectionUpdate, { passive: true });
    window.addEventListener('resize', scheduleActiveSectionUpdate);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener('scroll', scheduleActiveSectionUpdate);
      window.removeEventListener('resize', scheduleActiveSectionUpdate);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((current) => !current);
  };

  const scrollToSection = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    // REMOVED the solid background color from this div
    <div
      className={cn(
        'relative min-h-screen overflow-hidden transition-colors duration-300 [&_[role=button]]:cursor-pointer [&_a[href]]:cursor-pointer [&_button:not(:disabled)]:cursor-pointer [&_select]:cursor-pointer'
      )}
      style={{ background: 'transparent' }}
    >
      <AnimatePresence>
        {showChatbot && (
          <motion.button
            type="button"
            aria-label="Close chatbot overlay"
            className="fixed inset-0 z-40 cursor-pointer bg-slate-950/55 backdrop-blur-sm"
            onClick={() => setShowChatbot(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="fixed bottom-5 right-5 z-[60] flex max-w-[320px] items-center gap-3 rounded-2xl border border-white/20 bg-gradient-to-br from-indigo-500 to-violet-600 px-4 py-3 text-left text-white shadow-2xl shadow-indigo-500/30 backdrop-blur md:bottom-7 md:right-7"
            initial={{ opacity: 0, x: 80, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.92 }}
          >
            <button
              type="button"
              className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
              onClick={() => {
                setShowChatbot(true);
                setShowNotification(false);
              }}
            >
              <motion.span
                className="text-xl"
                animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.2 }}
                aria-hidden="true"
              >
                <FaBell className="h-5 w-5" />
              </motion.span>
              <span className="grid gap-0.5">
                <span className="text-sm font-bold">Need help?</span>
                <span className="text-xs leading-relaxed text-white/85">
                  Chat with me to learn more about my skills and experience.
                </span>
              </span>
            </button>
            <button
              type="button"
              className="grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-full bg-white/20 text-base leading-none"
              onClick={(event) => {
                event.stopPropagation();
                setShowNotification(false);
              }}
              aria-label="Dismiss chatbot notification"
            >
              <FaTimes className="h-3 w-3" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={chatbotRef}>
        <SimpleChatbot isVisible={showChatbot} onClose={() => setShowChatbot(false)} />
      </div>

      <AnimatePresence>
        {!showChatbot && (
          <motion.button
            type="button"
            className="chatbot-trigger fixed bottom-5 right-5 z-50 flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-gradient-to-br from-indigo-500 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/30 backdrop-blur md:bottom-7 md:right-7"
            onClick={() => setShowChatbot(true)}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative grid h-6 w-6 place-items-center" aria-hidden="true">
              <FaComments className="h-5 w-5" />
              <motion.span
                className="absolute inset-[-7px] rounded-full border border-white/60"
                animate={{ scale: [0.75, 1.55], opacity: [0.85, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
            </span>
            <span className="hidden sm:inline">Chat with me</span>
          </motion.button>
        )}
      </AnimatePresence>

      <Navbar
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        isMenuOpen={isMenuOpen}
        isScrolled={isScrolled}
        onScrollToSection={scrollToSection}
        onToggleMenu={() => setIsMenuOpen((current) => !current)}
        onToggleTheme={toggleTheme}
      />

      <HeroSection isDarkMode={isDarkMode} onScrollToSection={scrollToSection} />
      <Skills isDarkMode={isDarkMode} />
      <Experience isDarkMode={isDarkMode} />
      <Certificates isDarkMode={isDarkMode} />
      <Education isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />

      <div className="fixed bottom-24 right-5 z-40 grid gap-3 md:bottom-28 md:right-7">
        <div className="hidden sm:block">
          <CtaButton
            icon={<FaBriefcase className="h-4 w-4" />}
            onClick={() => scrollToSection('contact')}
            size="md"
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Hire Me
          </CtaButton>
        </div>

        <motion.button
          type="button"
          className={cn(
            'grid h-12 w-12 cursor-pointer place-items-center rounded-full border text-lg shadow-lg backdrop-blur transition md:hidden',
            isDarkMode
              ? 'border-white/20 bg-slate-900/80 text-white'
              : 'border-slate-300 bg-white/85 text-slate-900'
          )}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          whileHover={{ rotate: 90, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDarkMode ? (
            <FaSun className="h-5 w-5" aria-hidden="true" />
          ) : (
            <FaMoon className="h-5 w-5" aria-hidden="true" />
          )}
        </motion.button>
      </div>
    </div>
  );
}

export default App;
