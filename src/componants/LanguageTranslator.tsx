'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { FaCheck, FaGlobe, FaTimes } from 'react-icons/fa';
import { cn } from '../lib/cn';

type GoogleTranslateElementConstructor = new (
  options: Record<string, unknown>,
  elementId: string
) => void;

type GoogleTranslateElement = GoogleTranslateElementConstructor & {
  InlineLayout?: {
    SIMPLE: string;
  };
};

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: GoogleTranslateElement;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'Hindi', short: 'HI' },
  { code: 'ur', label: 'Urdu', short: 'UR' },
  { code: 'ar', label: 'Arabic', short: 'AR' },
  { code: 'bn', label: 'Bengali', short: 'BN' },
  { code: 'pa', label: 'Punjabi', short: 'PA' },
  { code: 'gu', label: 'Gujarati', short: 'GU' },
  { code: 'ta', label: 'Tamil', short: 'TA' },
  { code: 'te', label: 'Telugu', short: 'TE' },
  { code: 'mr', label: 'Marathi', short: 'MR' },
  { code: 'ne', label: 'Nepali', short: 'NE' },
  { code: 'es', label: 'Spanish', short: 'ES' },
  { code: 'fr', label: 'French', short: 'FR' },
  { code: 'de', label: 'German', short: 'DE' },
  { code: 'it', label: 'Italian', short: 'IT' },
  { code: 'pt', label: 'Portuguese', short: 'PT' },
  { code: 'ru', label: 'Russian', short: 'RU' },
  { code: 'zh-CN', label: 'Chinese', short: 'ZH' },
  { code: 'ja', label: 'Japanese', short: 'JA' },
  { code: 'ko', label: 'Korean', short: 'KO' },
  { code: 'tr', label: 'Turkish', short: 'TR' },
];

const includedLanguages = languages.map((language) => language.code).join(',');
const supportedLanguageCodes = languages.map((item) => item.code);

const getLanguageFromCookie = () => {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([^;]+)/);
  const savedLanguage = match?.[1];

  return savedLanguage && supportedLanguageCodes.includes(savedLanguage) ? savedLanguage : 'en';
};

export default function LanguageTranslator() {
  const [language, setLanguage] = useState('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [shouldLoadTranslate, setShouldLoadTranslate] = useState(false);
  const pendingLanguageRef = useRef('en');

  const setTranslateCookie = useCallback((code: string) => {
    const value = `/en/${code}`;
    document.cookie = `googtrans=${value};path=/`;
    document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname}`;
  }, []);

  const clearTranslateCookie = useCallback(() => {
    document.cookie = 'googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = `googtrans=;path=/;domain=${window.location.hostname};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }, []);

  const applyToGoogleSelect = useCallback((code: string) => {
    const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');

    if (!combo) {
      return false;
    }

    if (code === 'en') {
      return true;
    }

    combo.value = code;
    combo.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }, []);

  const initializeTranslate = useCallback(() => {
    const container = document.getElementById('google_translate_element');
    const TranslateElement = window.google?.translate?.TranslateElement;

    if (!container || !TranslateElement) {
      return;
    }

    if (!container.hasChildNodes()) {
      new TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages,
          autoDisplay: false,
          layout: TranslateElement.InlineLayout?.SIMPLE,
        },
        'google_translate_element'
      );
    }

    if (pendingLanguageRef.current !== 'en') {
      setTimeout(() => applyToGoogleSelect(pendingLanguageRef.current), 300);
    }
  }, [applyToGoogleSelect]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const savedLanguage = getLanguageFromCookie();
    setLanguage(savedLanguage);
    pendingLanguageRef.current = savedLanguage;
    setShouldLoadTranslate(savedLanguage !== 'en');

    window.googleTranslateElementInit = initializeTranslate;

    if (window.google?.translate?.TranslateElement) {
      initializeTranslate();
    }
  }, [initializeTranslate]);

  useEffect(() => {
    const hideGoogleChrome = () => {
      document.body.style.top = '0px';
      document
        .querySelectorAll<HTMLElement>('.goog-te-banner-frame, .goog-te-menu-frame, .skiptranslate > iframe')
        .forEach((element) => {
          element.style.display = 'none';
        });
    };

    hideGoogleChrome();
    const timer = window.setInterval(hideGoogleChrome, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  const applyLanguage = useCallback(
    (code: string) => {
      setLanguage(code);
      pendingLanguageRef.current = code;
      setShouldLoadTranslate(true);

      if (code === 'en') {
        clearTranslateCookie();
        window.location.reload();
        return;
      }

      setTranslateCookie(code);

      if (!applyToGoogleSelect(code)) {
        initializeTranslate();
        setTimeout(() => applyToGoogleSelect(code), 700);
        setTimeout(() => {
          if (!document.querySelector<HTMLSelectElement>('.goog-te-combo')) {
            window.location.reload();
          }
        }, 1200);
      }

      setIsModalOpen(false);
    },
    [applyToGoogleSelect, clearTranslateCookie, initializeTranslate, setTranslateCookie]
  );

  const currentLanguage = languages.find((item) => item.code === language);
  const modal = (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex min-h-dvh cursor-pointer items-center justify-center bg-slate-950/65 p-4 backdrop-blur-xl"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsModalOpen(false);
            }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="max-h-[86dvh] w-[min(92vw,620px)] cursor-auto overflow-hidden rounded-3xl border border-white/15 bg-slate-950/95 text-white shadow-2xl shadow-slate-950/50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="language-modal-title"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
          >
            <div className="flex items-start justify-between gap-4 p-5 pb-4">
              <div>
                <p className="mb-1 text-xs font-black uppercase tracking-widest text-orange-300">
                  Translate portfolio
                </p>
                <h2 id="language-modal-title" className="text-2xl font-extrabold">
                  Choose Language
                </h2>
              </div>
              <button
                type="button"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/10 text-2xl leading-none transition hover:rotate-90 hover:bg-white/15"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close language selector"
              >
                <FaTimes className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div
              className="grid max-h-[min(62dvh,430px)] grid-cols-1 gap-3 overflow-auto px-5 pb-5 sm:grid-cols-2"
              role="listbox"
              aria-label="Available languages"
            >
              {languages.map((item) => {
                const isActive = language === item.code;

                return (
                  <button
                    key={item.code}
                    type="button"
                    className={cn(
                      'grid min-h-14 cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border px-3 py-2 text-left transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-300',
                      isActive
                        ? 'border-orange-300/80 bg-gradient-to-br from-indigo-500/45 to-orange-400/30'
                        : 'border-white/10 bg-white/10 hover:border-indigo-300/60 hover:bg-indigo-500/20'
                    )}
                    onClick={() => applyLanguage(item.code)}
                    role="option"
                    aria-selected={isActive}
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-xs font-black tracking-wider">
                      {item.short}
                    </span>
                    <span className="font-bold">{item.label}</span>
                    {isActive && (
                      <span className="font-black text-orange-300" aria-hidden="true">
                        <FaCheck className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative notranslate">
      {shouldLoadTranslate && (
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="lazyOnload"
          onLoad={initializeTranslate}
          onReady={initializeTranslate}
        />
      )}
      <button
        type="button"
        className="group relative flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-indigo-300/30 bg-gradient-to-br from-indigo-500 to-orange-400 px-2 py-1 text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-white/20 sm:px-3"
        onClick={() => {
          setShouldLoadTranslate(true);
          setIsModalOpen(true);
        }}
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
      >
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 text-base shadow-inner"
          aria-hidden="true"
        >
          <FaGlobe className="h-4 w-4" />
        </span>
        <span className="hidden min-w-24 text-left md:grid">
          <span className="text-[0.58rem] font-extrabold uppercase tracking-wider text-white/75">
            Language
          </span>
          <span className="text-sm font-extrabold leading-tight">{currentLanguage?.label}</span>
        </span>
        <span
          className="grid h-7 min-w-8 place-items-center rounded-full bg-slate-950/20 px-2 text-[0.68rem] font-black uppercase tracking-wider"
          aria-hidden="true"
        >
          {currentLanguage?.short}
        </span>
      </button>

      {isMounted ? createPortal(modal, document.body) : null}

      <div
        id="google_translate_element"
        className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
      />
    </div>
  );
}
