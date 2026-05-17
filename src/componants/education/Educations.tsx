import { motion } from "motion/react";
import type { IconType } from "react-icons";
import { FaBookOpen, FaCalendarAlt, FaCertificate, FaGraduationCap, FaTrophy } from "react-icons/fa";
import Container from "../container/Container";
import { cn } from "../../lib/cn";

type ThemeProps = {
  isDarkMode: boolean;
};

type EducationItem = {
  id: number;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  score: string;
  icon: IconType;
  description: string;
  achievements: string[];
};

type EducationStat = {
  icon: IconType;
  value: string;
  label: string;
};

const educationData: EducationItem[] = [
  {
    id: 1,
    degree: "B.Tech in Computer Science",
    institution: "Dr. Abdul Kalam Technical University",
    location: "Lucknow, UP",
    duration: "2019-2023",
    score: "CGPA: 7.5",
    icon: FaGraduationCap,
    description:
      "Specialized in software development, algorithms, and system design. Completed various projects in web development and machine learning.",
    achievements: [
      "Completed major project in MERN stack development",
      "Participated in national level coding competitions",
      "Member of Computer Science Society",
    ],
  },
  {
    id: 2,
    degree: "Higher Secondary Education",
    institution: "Elite Higher Secondary School",
    location: "",
    duration: "2019-2020",
    score: "Percentage: 65%",
    icon: FaBookOpen,
    description:
      "Focus on Science and Mathematics. Developed foundation for technical education and problem-solving skills.",
    achievements: [
      "Mathematics Topper in final year",
      "Active participant in science exhibitions",
      "Member of School Debate Team",
    ],
  },
];

const stats: EducationStat[] = [
  { icon: FaCalendarAlt, value: "4", label: "Years of Study" },
  { icon: FaTrophy, value: "10+", label: "Projects Completed" },
  { icon: FaCertificate, value: "5+", label: "Certifications" },
];

const Education = ({ isDarkMode }: ThemeProps) => {
  const accentText = isDarkMode ? "text-orange-300" : "text-indigo-600";
  const mutedText = isDarkMode ? "text-slate-300" : "text-slate-700";
  const accentGradient = isDarkMode
    ? "from-orange-500 to-orange-400"
    : "from-indigo-600 to-violet-500";

  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 sm:py-20 lg:py-24",
        isDarkMode
          ? "bg-gradient-to-br from-slate-950 to-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 to-slate-200 text-slate-900",
      )}
      id="education"
    >
      <Container size="xl">
        <motion.div
          className="mb-10 text-center sm:mb-14"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <h2
            className={cn(
              "text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
              isDarkMode ? "text-white" : "text-slate-900",
            )}
          >
            Education{" "}
            <span
              className={cn(
                "bg-gradient-to-r bg-clip-text text-transparent",
                isDarkMode
                  ? "from-indigo-400 to-purple-400"
                  : "from-indigo-600 to-purple-600",
              )}
            >
              Journey
            </span>
          </h2>
          <p className={cn("mt-4 text-lg", mutedText)}>
            My academic background and learning path.
          </p>
          <div
            className={cn(
              "mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r",
              accentGradient,
            )}
          />
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 sm:gap-9">
          {educationData.map((edu, index) => {
            const EducationIcon = edu.icon;

            return (
              <motion.article
                key={edu.id}
                className="relative grid gap-4 md:grid-cols-[minmax(0,1fr)_auto]"
                initial={{ opacity: 0, x: index % 2 === 0 ? -42 : 42 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
              >
              <motion.div
                className={cn(
                  "relative rounded-3xl border p-5 pt-10 text-center shadow-2xl sm:p-8 sm:pt-12 lg:p-10",
                  isDarkMode
                    ? "border-white/10 bg-white/[0.06] shadow-slate-950/30"
                    : "border-slate-200 bg-white/90 shadow-slate-200/80",
                )}
                whileHover={{ y: -5 }}
              >
                <div
                  className={cn(
                    "absolute left-1/2 top-0 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-r text-3xl shadow-xl",
                    accentGradient,
                  )}
                >
                  <EducationIcon className="h-8 w-8" aria-hidden="true" />
                </div>

                <h3
                  className={cn(
                    "text-xl font-extrabold sm:text-2xl",
                    accentText,
                  )}
                >
                  {edu.degree}
                </h3>
                <div className="mt-2 text-lg font-bold">{edu.institution}</div>
                {edu.location && (
                  <div className={cn("mt-1 text-sm italic", mutedText)}>
                    {edu.location}
                  </div>
                )}

                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <span
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-bold",
                      isDarkMode
                        ? "bg-orange-400/15 text-orange-200"
                        : "bg-indigo-50 text-indigo-700",
                    )}
                  >
                    {edu.duration}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-bold",
                      isDarkMode
                        ? "bg-orange-400/15 text-orange-200"
                        : "bg-indigo-50 text-indigo-700",
                    )}
                  >
                    {edu.score}
                  </span>
                </div>

                <p
                  className={cn("mx-auto mt-6 max-w-2xl leading-8", mutedText)}
                >
                  {edu.description}
                </p>

                <div className="mx-auto mt-6 max-w-2xl text-left">
                  <h4 className="text-center text-lg font-extrabold">
                    Key Achievements:
                  </h4>
                  <ul className="mt-4 grid gap-3">
                    {edu.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className={cn("flex gap-3 leading-7", mutedText)}
                      >
                        <span
                          className={cn(
                            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                            isDarkMode ? "bg-orange-300" : "bg-indigo-600",
                          )}
                          aria-hidden="true"
                        />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <div className="hidden w-10 flex-col items-center md:flex">
                <div
                  className={cn(
                    "h-5 w-5 rounded-full bg-gradient-to-r shadow-[0_0_0_6px]",
                    accentGradient,
                    isDarkMode
                      ? "shadow-orange-500/20"
                      : "shadow-indigo-500/20",
                  )}
                />
                {index !== educationData.length - 1 && (
                  <div
                    className={cn(
                      "mt-3 h-full w-0.5 flex-1 rounded-full bg-gradient-to-b",
                      accentGradient,
                    )}
                  />
                )}
              </div>
            </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Education;
