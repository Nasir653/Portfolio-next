import { useState, useEffect } from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaBolt,
  FaChartBar,
  FaChartLine,
  FaClock,
  FaFileAlt,
  FaGlobe,
  FaMicrophone,
  FaPaintBrush,
  FaSyncAlt,
  FaTimes,
  FaTrophy,
} from "react-icons/fa";
import Container from "../container/Container";
import { cn } from "../../lib/cn";

type ThemeProps = {
  isDarkMode: boolean;
};

type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  image: string;
  link: string;
  icon: IconType;
  level: string;
  duration: string;
};

type Achievement = {
  icon: IconType;
  title: string;
  copy: string;
};

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Full MERN Stack Developer",
    issuer: "Coding Academy",
    date: "2023",
    description:
      "Comprehensive training in MongoDB, Express.js, React.js, and Node.js with hands-on project experience.",
    skills: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "REST APIs",
      "JWT Auth",
    ],
    image:
      "https://d2ms8rpfqc4h24.cloudfront.net/Guide_to_Full_Stack_Development_000eb0b2d0.jpg",
    link: "#",
    icon: FaSyncAlt,
    level: "Advanced",
    duration: "6 Months",
  },
  {
    id: 2,
    title: "Advanced JavaScript Mastery",
    issuer: "Udemy",
    date: "2022",
    description:
      "Mastered ES6+ features, async programming, design patterns, and performance optimization techniques.",
    skills: [
      "ES6+",
      "Async/Await",
      "Design Patterns",
      "Performance",
      "Webpack",
    ],
    image:
      "https://www.milesweb.com/blog/wp-content/uploads/2025/07/best-ide-for-javascript.png",
    link: "https://drive.google.com/file/d/1LF1okh5PHMIF2rFD5aONAaPeG542jdNB/view?usp=drive_link",
    icon: FaBolt,
    level: "Advanced",
    duration: "3 Months",
  },
  {
    id: 3,
    title: "React & Bootstrap Specialist",
    issuer: "Frontend Masters",
    date: "2022",
    description:
      "Built responsive applications with React hooks, context API, and Bootstrap component library.",
    skills: [
      "React Hooks",
      "Bootstrap",
      "Responsive Design",
      "Component Library",
      "State Management",
    ],
    image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
    link: "https://drive.google.com/file/d/11LNiK9PEHZp52LppGUWbZyMcRQmPRDqj/view?usp=drive_link",
    icon: FaPaintBrush,
    level: "Intermediate",
    duration: "2 Months",
  },
  {
    id: 4,
    title: "HTML5 & CSS3 Expert",
    issuer: "Skills Academy",
    date: "2021",
    description:
      "Modern web development with semantic HTML, advanced CSS, Flexbox, Grid, and responsive design principles.",
    skills: [
      "HTML5",
      "CSS3",
      "Flexbox",
      "Grid",
      "Responsive Design",
      "Animations",
    ],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6a21B2kIs2Ix8yfqRPl0hJoMrVBdzE_GEQ&s",
    link: "https://drive.google.com/file/d/1O0gCJyDWPwiJrQw4uxVmgRTjvel1HGoL/view?usp=drive_link",
    icon: FaGlobe,
    level: "Intermediate",
    duration: "2 Months",
  },
];

const achievements: Achievement[] = [
  {
    icon: FaTrophy,
    title: "Code Competition Winner",
    copy: "Won first place in a regional coding competition among 50+ participants.",
  },
  {
    icon: FaMicrophone,
    title: "Tech Speaker",
    copy: "Presented at 5+ tech conferences and meetups on modern web development.",
  },
  {
    icon: FaChartLine,
    title: "Performance Optimization",
    copy: "Improved application performance by 40% through advanced optimization techniques.",
  },
];

const Certificates = ({ isDarkMode }: ThemeProps) => {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const SelectedCertificateIcon = selectedCertificate?.icon;

  const accentText = isDarkMode ? "text-orange-400" : "text-orange-600";
  const mutedText = isDarkMode ? "text-slate-300" : "text-slate-600";
  const softText = isDarkMode ? "text-slate-400" : "text-slate-500";
  const accentGradient = isDarkMode
    ? "from-orange-500 to-orange-400"
    : "from-orange-500 to-orange-400";

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

    const section = document.getElementById("certificates");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 sm:py-20 lg:py-24",
        isDarkMode
          ? "bg-gradient-to-br from-slate-950 to-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900",
      )}
      id="certificates"
    >
      <Container size="xl">
        {/* Header */}
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
              Certifications
            </span>
          </h2>
          <p className={cn("mt-4 text-lg", mutedText)}>
            Validating my expertise through recognized credentials.
          </p>
          <div
            className={cn(
              "mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r",
              accentGradient,
            )}
          />
        </div>

        {/* Certificates Grid */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:gap-8">
          {certificates.map((cert, index) => {
            const CertificateIcon = cert.icon;

            return (
              <div
                key={cert.id}
                className={cn(
                  "group cursor-pointer overflow-hidden rounded-2xl border shadow-lg transition-all duration-300 hover:scale-[1.02]",
                  isDarkMode
                    ? "border-slate-700 bg-slate-800/50 shadow-slate-950/35"
                    : "border-slate-200 bg-white shadow-slate-200/80",
                  isVisible && "animate-fade-up",
                )}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                  animationFillMode: "forwards",
                }}
                onClick={() => setSelectedCertificate(cert)}
              >
                <div className="relative h-48 overflow-hidden sm:h-56 md:h-52 xl:h-60">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    unoptimized={cert.image.endsWith(".svg")}
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent opacity-70" />
                  <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/55 px-3 py-2 text-sm font-bold text-white backdrop-blur">
                    <CertificateIcon className="h-4 w-4" aria-hidden="true" />
                    <span>{cert.level}</span>
                  </div>
                  <div className="absolute inset-0 grid place-items-center bg-slate-600/80 opacity-0 transition group-hover:opacity-100">
                    <span className="rounded-full border-2 border-white px-5 py-3 font-bold text-white">
                      View Details
                    </span>
                  </div>
                </div>

              <div className="p-5 sm:p-6 xl:p-8">
                <div className="mb-4">
                  <h3 className="text-xl font-bold leading-tight sm:text-2xl">
                    {cert.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                    <span className={cn("font-bold", accentText)}>
                      {cert.issuer}
                    </span>
                    <span className={mutedText}>{cert.date}</span>
                  </div>
                </div>

                <p className={cn("line-clamp-3 leading-7", mutedText)}>
                  {cert.description}
                </p>

                <div
                  className={cn("mt-5 flex flex-wrap gap-4 text-sm", mutedText)}
                >
                  <span className="inline-flex items-center gap-2">
                    <FaClock className="h-4 w-4" aria-hidden="true" />
                    {cert.duration}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <FaChartBar className="h-4 w-4" aria-hidden="true" />
                    {cert.level}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {cert.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-bold",
                        isDarkMode
                          ? "border-orange-500/30 bg-orange-500/10 text-orange-300"
                          : "border-orange-200 bg-orange-50 text-orange-700",
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 4 && (
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-bold",
                        mutedText,
                      )}
                    >
                      +{cert.skills.length - 4} more
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className={cn(
                    "mt-7 flex w-full cursor-pointer items-center justify-between rounded-xl bg-gradient-to-r px-5 py-3.5 font-bold text-white shadow-md transition hover:shadow-lg",
                    accentGradient,
                  )}
                >
                  <span>View Credential</span>
                  <FaArrowRight
                    className="text-xl transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            );
          })}
        </div>

        {/* Achievements Section */}
        <div
          className={cn(
            "mt-12 rounded-2xl border p-5 shadow-lg sm:mt-16 sm:p-8 lg:p-10",
            isDarkMode
              ? "border-slate-700 bg-slate-800/30 shadow-slate-950/25"
              : "border-slate-200 bg-white/80 shadow-slate-200",
            isVisible && "animate-fade-up",
          )}
          style={{
            animationDelay: "0.4s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold sm:text-3xl">
              Beyond Certifications
            </h3>
            <p className={cn("mt-3", mutedText)}>
              Real-world achievements that demonstrate my capabilities.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {achievements.map((achievement, index) => {
              const AchievementIcon = achievement.icon;

              return (
                <div
                  key={achievement.title}
                  className={cn(
                    "rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] sm:p-6",
                    isDarkMode
                      ? "border-slate-700 bg-slate-800/50"
                      : "border-slate-200 bg-white",
                  )}
                  style={{
                    animationDelay: `${0.5 + index * 0.1}s`,
                  }}
                >
                  <AchievementIcon className="mb-4 h-10 w-10" aria-hidden="true" />
                  <h4 className="text-xl font-bold">{achievement.title}</h4>
                  <p className={cn("mt-3 leading-7", mutedText)}>
                    {achievement.copy}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-[70] grid cursor-pointer place-items-center bg-slate-950/80 p-4 backdrop-blur-md"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className={cn(
              "max-h-[90vh] w-full max-w-4xl cursor-auto overflow-y-auto rounded-2xl border p-6 shadow-2xl sm:p-8",
              isDarkMode
                ? "border-slate-700 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-900",
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div
                  className={cn(
                    "grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-r text-2xl shadow-md sm:h-16 sm:w-16 sm:text-3xl",
                    accentGradient,
                  )}
                >
                  {SelectedCertificateIcon && (
                    <SelectedCertificateIcon className="h-7 w-7" aria-hidden="true" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold sm:text-2xl">
                    {selectedCertificate.title}
                  </h3>
                  <p className={cn("mt-1", mutedText)}>
                    <span className={cn("font-bold", accentText)}>
                      {selectedCertificate.issuer}
                    </span>
                    <span> • {selectedCertificate.date}</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                className={cn(
                  "grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full text-2xl leading-none transition hover:rotate-90",
                  isDarkMode
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-900",
                )}
                onClick={() => setSelectedCertificate(null)}
                aria-label="Close certificate preview"
              >
                <FaTimes className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
              <div
                className={cn(
                  "relative h-48 overflow-hidden rounded-xl border bg-white shadow-md sm:h-64",
                  isDarkMode ? "border-slate-700" : "border-slate-200",
                )}
              >
                <Image
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  unoptimized={selectedCertificate.image.endsWith(".svg")}
                  className="object-cover"
                />
                <span
                  className={cn(
                    "absolute left-4 top-4 rounded-full border px-4 py-2 text-xs font-bold",
                    isDarkMode
                      ? "border-orange-500/30 bg-slate-900/80 text-orange-300"
                      : "border-orange-200 bg-white/90 text-orange-700",
                  )}
                >
                  Verified Credential
                </span>
              </div>

              <div className="grid gap-6">
                <div className="grid gap-4 min-[420px]:grid-cols-2">
                  {[
                    ["Level", selectedCertificate.level],
                    ["Duration", selectedCertificate.duration],
                    ["Status", "Verified"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className={cn(
                        "rounded-xl border p-4",
                        isDarkMode ? "border-slate-700" : "border-slate-200",
                      )}
                    >
                      <span className={cn("block text-sm", softText)}>
                        {label}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-lg font-bold",
                          value === "Verified" ? "text-emerald-500" : "",
                        )}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-lg font-bold">
                    About this certification
                  </h4>
                  <p className={cn("mt-3 leading-7", mutedText)}>
                    {selectedCertificate.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold">Skills Validated</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedCertificate.skills.map((skill) => (
                      <span
                        key={skill}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm font-bold",
                          isDarkMode
                            ? "border-orange-500/30 bg-orange-500/10 text-orange-300"
                            : "border-orange-200 bg-orange-50 text-orange-700",
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={selectedCertificate.link}
                className={cn(
                  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-6 py-3.5 font-bold text-white shadow-md transition hover:shadow-lg",
                  accentGradient,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Full Certificate</span>
                <FaFileAlt className="h-4 w-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                className={cn(
                  "cursor-pointer rounded-xl border px-6 py-3.5 font-bold transition",
                  isDarkMode
                    ? "border-slate-600 text-white hover:bg-slate-800"
                    : "border-slate-300 text-slate-900 hover:bg-slate-100",
                )}
                onClick={() => setSelectedCertificate(null)}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

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
        
        .animate-fade-up {
          animation: fadeUp 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Certificates;
