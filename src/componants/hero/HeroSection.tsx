import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FaBriefcase, FaFileAlt, FaRegHandPaper } from "react-icons/fa";
import Container from "../container/Container";
import CtaButton from "../cta-button/CtaButton";
import { cn } from "../../lib/cn";
import type { SectionId } from "../../lib/sections";

type HeroSectionProps = {
  isDarkMode: boolean;
  onScrollToSection: (sectionId: SectionId) => void;
};

const CV = "/Nasir.cv.pdf";

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "MERN Specialist",
  "Problem Solver",
];

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "10+", label: "Projects" },
  { value: "8+", label: "Happy Clients" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroSection({
  isDarkMode,
  onScrollToSection,
}: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  // Particle network animation
  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
      });
    }

    let animationId: number;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Brighter in light mode, more subtle in dark mode
        ctx.fillStyle = isDarkMode
          ? `rgba(129, 140, 248, ${0.4 + Math.sin(Date.now() * 0.001 + i) * 0.1})`
          : `rgba(99, 102, 241, ${0.5 + Math.sin(Date.now() * 0.001 + i) * 0.15})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - distance / 100) * (isDarkMode ? 0.2 : 0.3);
            ctx.strokeStyle = isDarkMode
              ? `rgba(139, 92, 246, ${opacity})`
              : `rgba(99, 102, 241, ${opacity + 0.1})`;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, [isDarkMode, reduceMotion]);

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = CV;
    link.download = "Nasir.cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      className={cn(
        "relative flex min-h-[100svh] items-center overflow-hidden py-24 sm:py-28 lg:min-h-screen lg:py-0",
        isDarkMode ? "text-slate-100" : "text-slate-950",
      )}
      id="home"
    >
      {/* Canvas for particle network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-20 h-full w-full"
      />

      {/* Static gradient background - Light mode now properly visible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30"
        style={{
          background: isDarkMode
            ? "linear-gradient(135deg, #0f172a 0%, #0f172a 50%, #1e1b4b 100%)"
            : "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #fce7f3 100%)",
        }}
      />

      {/* Animated glowing orbs - More visible in light mode */}
      <motion.div
        aria-hidden="true"
        className="absolute top-20 left-10 h-96 w-96 rounded-full blur-3xl"
        style={{
          background: isDarkMode
            ? "radial-gradient(circle, rgba(99,102,241,0.3), transparent)"
            : "radial-gradient(circle, rgba(99,102,241,0.25), transparent)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute bottom-20 right-10 h-80 w-80 rounded-full blur-3xl"
        style={{
          background: isDarkMode
            ? "radial-gradient(circle, rgba(249,115,22,0.25), transparent)"
            : "radial-gradient(circle, rgba(249,115,22,0.2), transparent)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: isDarkMode
            ? "radial-gradient(circle, rgba(139,92,246,0.2), transparent)"
            : "radial-gradient(circle, rgba(139,92,246,0.15), transparent)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute right-5 top-1/4 hidden rounded-2xl border p-4 backdrop-blur-xl lg:block"
        style={{
          background: isDarkMode
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.7)",
          borderColor: isDarkMode
            ? "rgba(255,255,255,0.1)"
            : "rgba(249,115,22,0.2)",
          boxShadow: isDarkMode
            ? "0 8px 32px rgba(0,0,0,0.2)"
            : "0 8px 32px rgba(0,0,0,0.08)",
          rotate: "5deg",
        }}
        animate={{
          y: [0, 15, 0],
          rotate: [5, 7, 5],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500" />
          <div>
            <div
              className={cn(
                "h-2 w-24 rounded",
                isDarkMode ? "bg-slate-400" : "bg-slate-600",
              )}
              style={{ opacity: 0.3 }}
            />
            <div
              className={cn(
                "mt-2 h-2 w-28 rounded",
                isDarkMode ? "bg-slate-400" : "bg-slate-600",
              )}
              style={{ opacity: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Animated rings - More visible in light mode */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className={cn(
            "h-[500px] w-[500px] rounded-full border",
            isDarkMode ? "border-indigo-500/30" : "border-indigo-400/40",
          )}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className={cn(
            "h-[650px] w-[650px] rounded-full border",
            isDarkMode ? "border-purple-500/25" : "border-purple-400/35",
          )}
        />
      </motion.div>

      {/* Animated beam lines - More vibrant in light mode */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0,
        }}
        style={{ opacity: isDarkMode ? 0.6 : 0.8 }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-[2px] origin-top bg-gradient-to-b from-transparent via-orange-500 to-transparent"
        animate={{
          scaleY: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{ opacity: isDarkMode ? 0.6 : 0.8 }}
      />

      {/* Subtle code elements - Adjusted for light mode */}
      {!reduceMotion && (
        <div className="absolute bottom-10 right-10 -z-10">
          <motion.div
            className="font-mono text-xs"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {["</>", "{}", "()", "=>", "const", "let", "function"].map(
              (code, i) => (
                <motion.div
                  key={code}
                  className="leading-4"
                  style={{ color: isDarkMode ? "#a78bfa" : "#6366f1" }}
                  animate={{
                    y: [-20, 20],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                >
                  {code}
                </motion.div>
              ),
            )}
          </motion.div>
        </div>
      )}

      {/* Subtle grid pattern - Adjusted for both modes */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-15 pointer-events-none",
          isDarkMode
            ? "bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.06)_1px,transparent_1px)]",
        )}
        style={{ backgroundSize: "60px 60px" }}
      />

      <Container
        size="xl"
        className="grid items-center gap-10 md:gap-12 lg:grid-cols-[1.1fr_0.9fr] xl:gap-14"
      >
        <motion.div
          className="grid gap-8 text-center lg:text-left"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.14 }}
        >
          <motion.div variants={fadeUp} className="mx-auto lg:mx-0">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold backdrop-blur-sm",
                isDarkMode
                  ? "border-indigo-300/25 bg-indigo-400/10 text-indigo-100"
                  : "border-indigo-300 bg-white/80 text-indigo-800 shadow-sm shadow-indigo-100",
              )}
            >
              <FaRegHandPaper className="h-4 w-4" aria-hidden="true" />
              Hello, I&apos;m
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="grid gap-4">
            <h1 className="text-4xl font-extrabold leading-tight min-[380px]:text-5xl sm:text-6xl xl:text-7xl">
              <span
                className={cn(
                  "bg-gradient-to-r bg-clip-text text-transparent",
                  isDarkMode
                    ? "from-indigo-300 via-violet-300 to-orange-300"
                    : "from-indigo-700 via-violet-700 to-orange-600",
                )}
              >
                Nasir Malik
              </span>
            </h1>

            <div
              className={cn(
                "flex min-h-24 flex-col items-center justify-center gap-2 text-xl font-extrabold sm:min-h-12 sm:flex-row sm:text-2xl lg:justify-start",
                isDarkMode ? "text-slate-100" : "text-slate-950",
              )}
            >
              <span>I&apos;m a</span>
              <span
                className={cn(
                  "relative inline-grid min-h-10 w-full min-w-0 place-items-center overflow-hidden sm:w-auto sm:min-w-[270px] sm:place-items-start",
                  isDarkMode ? "text-orange-300" : "text-indigo-800",
                )}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.35 }}
                    className="absolute"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
            {/* Option 1: Animated gradient text with icons */}
            <motion.p
              variants={fadeUp}
              className={cn(
                "mx-auto max-w-2xl text-lg font-medium leading-8 lg:mx-0",
                isDarkMode ? "text-slate-300" : "text-slate-700",
              )}
            >
              <span className="inline-flex items-center gap-1">
                Transforming ideas into
                <span
                  className={cn(
                    "bg-gradient-to-r bg-clip-text font-bold text-transparent",
                    isDarkMode
                      ? "from-indigo-400 to-purple-400"
                      : "from-indigo-600 to-purple-600",
                  )}
                >
                  elegant digital solutions
                </span>
              
              </span>
              <br />
              <span className="inline-flex items-center gap-1">
            
                <span
                  className={cn(
                    "bg-gradient-to-r bg-clip-text font-bold text-transparent",
                    isDarkMode
                      ? "from-orange-400 to-red-400"
                      : "from-orange-600 to-red-600",
                  )}
                >
                  high-performance applications
                </span>
              
              </span>
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <CtaButton
              fullWidth
              icon={<FaFileAlt className="h-4 w-4" />}
              onClick={downloadCV}
              className="sm:w-auto"
            >
              Download CV
            </CtaButton>
            <CtaButton
              fullWidth
              icon={<FaBriefcase className="h-4 w-4" />}
              isDarkMode={isDarkMode}
              onClick={() => onScrollToSection("contact")}
              variant="secondary"
              className="sm:w-auto"
            >
              View My Work
            </CtaButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className={cn(
              "grid grid-cols-3 gap-2 rounded-3xl border p-3 shadow-xl backdrop-blur-xl sm:max-w-xl sm:gap-3 sm:p-4",
              isDarkMode
                ? "border-white/10 bg-white/5 shadow-slate-950/20"
                : "border-slate-300/80 bg-white/80 shadow-indigo-100/70",
            )}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className={cn(
                    "bg-gradient-to-r bg-clip-text text-2xl font-extrabold text-transparent",
                    isDarkMode
                      ? "from-indigo-300 to-orange-300"
                      : "from-indigo-800 to-orange-600",
                  )}
                >
                  {stat.value}
                </div>
                <div
                  className={cn(
                    "text-xs font-bold sm:text-sm",
                    isDarkMode ? "text-slate-300" : "text-slate-700",
                  )}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <motion.div
            className={cn(
              "relative h-56 w-56 overflow-hidden shadow-2xl min-[380px]:h-64 min-[380px]:w-64 sm:h-80 sm:w-80 xl:h-[25rem] xl:w-[25rem]",
              isDarkMode ? "shadow-indigo-950/60" : "shadow-indigo-200",
            )}
            animate={{
              borderRadius: [
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "58% 42% 75% 25% / 76% 46% 54% 24%",
                "50% 50% 33% 67% / 55% 27% 73% 45%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="https://res.cloudinary.com/dhc6axjlg/image/upload/v1755375196/IMG_0494_yserlq.jpg"
              alt="Nasir Malik"
              fill
              priority
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 320px, 256px"
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 rounded-[inherit] ring-4 ring-inset ring-indigo-500/80" />
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        className={cn(
          "absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] md:flex",
          isDarkMode ? "text-slate-400" : "text-slate-600",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <span
          className={cn(
            "relative h-10 w-6 rounded-full border-2",
            isDarkMode ? "border-indigo-400" : "border-indigo-700",
          )}
        >
          <motion.span
            className={cn(
              "absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full",
              isDarkMode ? "bg-indigo-400" : "bg-indigo-700",
            )}
            animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </span>
        Scroll to explore
      </motion.div>
    </section>
  );
}
