import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { FaBriefcase, FaLaptopCode, FaRocket } from "react-icons/fa";
import Container from "../container/Container";
import { cn } from "../../lib/cn";

type ThemeProps = {
  isDarkMode: boolean;
};

type ExperienceItem = {
  id: number;
  company: string;
  role: string;
  duration: string;
  period: string;
  description: string;
  achievements: string[];
  icon: IconType;
};

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "NeoSoft Technologies",
    role: "Full Mern Stack Developer",
    duration: "2 months",
    period: "Present",
    description:
      "Spearheading the development of cross-platform mobile and web applications using React Native and the MERN stack, delivering responsive, high-performance solutions.",
    achievements: [
      "Built and maintained RESTful and GraphQL APIs with Node.js and Express",
      "Integrated third-party APIs including payment gateways, Firebase, Socket.IO, and Agora",
      "Delivered responsive, high-performance solutions",
    ],
    icon: FaRocket,
  },
  {
    id: 2,
    company: "ILS Technology",
    role: "Full-Stack Developer",
    duration: "2.5 years",
    period: "2023 - 2025",
    description:
      "Built high-performance web applications with the MERN stack, boosting client satisfaction.",
    achievements: [
      "Developed scalable backend systems with Node.js",
      "Reduced response times by 30% through optimized RESTful APIs",
      "Collaborated with cross-functional teams to deliver projects on time",
    ],
    icon: FaBriefcase,
  },
  {
    id: 3,
    company: "MKT Software",
    role: "Software Developer",
    duration: "1 year",
    period: "2021 - 2023",
    description:
      "Contributed to the development process by designing and implementing reusable components and modules.",
    achievements: [
      "Designed and implemented reusable components and modules",
      "Accelerated project timelines and improved team efficiency",
      "Deployed scalable, mobile-first solutions",
    ],
    icon: FaLaptopCode,
  },
];

const summary = [
  { value: "4+", label: "Years Experience" },
  { value: "10+", label: "Projects Completed" },
  { value: "12+", label: "Technologies" },
];

const Experience = ({ isDarkMode }: ThemeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const mutedText = isDarkMode ? "text-slate-300" : "text-slate-700";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const section = document.getElementById("experience");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 sm:py-20 lg:py-24",
        isDarkMode
          ? "bg-slate-950/70 text-white"
          : "bg-gradient-to-br from-slate-100 to-indigo-50 text-slate-900",
      )}
      id="experience"
    >
      <Container size="xl">
        {/* Header Section */}
        <div
          className={cn(
            "mb-10 text-center sm:mb-14",
            isVisible && "animate-fade-up",
          )}
          style={{ opacity: 0, animationFillMode: "forwards" }}
        >
          <h2
            className={cn(
              "text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
              isDarkMode ? "text-white" : "text-slate-900",
            )}
          >
            Professional{" "}
            <span
              className={cn(
                "bg-gradient-to-r bg-clip-text text-transparent",
                isDarkMode
                  ? "from-indigo-400 to-purple-400"
                  : "from-indigo-600 to-purple-600",
              )}
            >
              Experience
            </span>
          </h2>
          <p className={cn("mt-4 text-lg", mutedText)}>
            My journey as a Full Stack Developer
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8">
          {experiences.map((exp, index) => {
            const ExperienceIcon = exp.icon;

            return (
              <div
                key={exp.id}
                className="relative grid gap-4 md:grid-cols-[minmax(0,1fr)_auto]"
              >
              <div
                className={cn(
                  "rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6 lg:p-8",
                  isDarkMode
                    ? "border-white/10 bg-white/[0.06] shadow-slate-950/30 hover:border-white/20"
                    : "border-slate-200 bg-white/85 shadow-slate-200/80 hover:shadow-lg",
                  isVisible && "animate-slide-in",
                )}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex flex-wrap items-start gap-4">
                  <ExperienceIcon className="h-10 w-10 shrink-0" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold sm:text-2xl">
                      {exp.role}
                    </h3>
                    <p
                      className={cn("mt-1 text-base font-semibold", mutedText)}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-4 py-2 text-sm font-bold text-white",
                        isDarkMode
                          ? "bg-gradient-to-r from-indigo-500 to-violet-500"
                          : "bg-gradient-to-r from-orange-500 to-orange-400",
                      )}
                    >
                      {exp.duration}
                    </span>
                    <p className={cn("mt-2 text-sm", mutedText)}>
                      {exp.period}
                    </p>
                  </div>
                </div>

                <p className={cn("mt-6 text-base leading-8", mutedText)}>
                  {exp.description}
                </p>

                <div className="mt-6">
                  <h4 className="text-lg font-bold">Key Achievements:</h4>
                  <ul className="mt-4 grid gap-3">
                    {exp.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className={cn("flex gap-3 leading-7", mutedText)}
                      >
                        <span
                          className={cn(
                            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                            isDarkMode ? "bg-indigo-400" : "bg-orange-500",
                          )}
                          aria-hidden="true"
                        />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Timeline connector */}
              <div className="hidden w-10 flex-col items-center md:flex">
                <div
                  className={cn(
                    "h-5 w-5 rounded-full shadow-[0_0_0_6px]",
                    isDarkMode
                      ? "bg-gradient-to-r from-indigo-500 to-violet-500 shadow-indigo-500/20"
                      : "bg-gradient-to-r from-orange-500 to-orange-400 shadow-orange-500/20",
                  )}
                />
                {index !== experiences.length - 1 && (
                  <div
                    className={cn(
                      "mt-3 h-full w-0.5 flex-1 rounded-full",
                      isDarkMode
                        ? "bg-gradient-to-b from-indigo-500 to-violet-500"
                        : "bg-gradient-to-b from-orange-500 to-orange-400",
                    )}
                  />
                )}
              </div>
            </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:mt-16 lg:gap-6">
          {summary.map((item, index) => (
            <div
              key={item.label}
              className={cn(
                "rounded-3xl border p-6 text-center transition-all duration-300 hover:-translate-y-1 lg:p-8",
                isDarkMode
                  ? "border-white/10 bg-white/[0.06] shadow-slate-950/30 hover:border-white/20"
                  : "border-slate-200 bg-white/85 shadow-slate-200/80 hover:shadow-lg",
                isVisible && "animate-fade-up",
              )}
              style={{
                animationDelay: `${0.3 + index * 0.1}s`,
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              <h3
                className={cn(
                  "bg-clip-text text-4xl font-black text-transparent",
                  isDarkMode
                    ? "bg-gradient-to-r from-indigo-400 to-violet-400"
                    : "bg-gradient-to-r from-orange-500 to-orange-400",
                )}
              >
                {item.value}
              </h3>
              <p className={cn("mt-2", mutedText)}>{item.label}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-up {
          animation: fadeUp 0.6s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Experience;
