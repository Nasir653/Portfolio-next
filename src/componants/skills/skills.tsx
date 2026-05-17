import { useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import { FaArrowRight, FaDatabase, FaHtml5, FaLaptopCode, FaReact, FaServer } from 'react-icons/fa';
import {
  SiDotnet,
  SiExpress,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiStrapi,
} from 'react-icons/si';
import Container from '../container/Container';
import CtaButton from '../cta-button/CtaButton';
import { cn } from '../../lib/cn';

type ThemeProps = {
  isDarkMode: boolean;
};

type SkillItem = {
  name: string;
  level: number;
  icon: IconType;
};

type SkillCategory = {
  title: string;
  skills: SkillItem[];
  icon: IconType;
  description: string;
};

const skillCategories: SkillCategory[] = [
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', level: 90, icon: SiNodedotjs },
      { name: 'NestJS', level: 70, icon: SiNestjs },
      { name: 'Express', level: 90, icon: SiExpress },
      { name: 'Starpi ', level: 90, icon: SiStrapi },
      { name: '.NET Core', level: 50, icon: SiDotnet },
    ],
    icon: FaServer,
    description: 'Robust server-side architecture',
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'ReactJS', level: 85, icon: FaReact },
      { name: 'NextJS', level: 75, icon: SiNextdotjs },
      { name: 'HTML/CSS', level: 95, icon: FaHtml5 },
      { name: 'JavaScript', level: 93, icon: SiJavascript },
    ],
    icon: FaLaptopCode,
    description: 'Modern, responsive interfaces',
  },
  {
    title: 'Database & Tools',
    skills: [
      { name: 'MongoDB', level: 85, icon: SiMongodb },
      { name: 'PostgreSQL', level: 60, icon: SiPostgresql },
      { name: 'MySQL', level: 50, icon: SiMysql },
      { name: 'Redis', level: 60, icon: SiRedis },
    ],
    icon: FaDatabase,
    description: 'Efficient data management',
  },
];

const Skills = ({ isDarkMode }: ThemeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const mutedText = isDarkMode ? 'text-slate-300' : 'text-slate-600';
  const cardBg = isDarkMode ? 'bg-slate-900/50' : 'bg-white';
  const borderColor = isDarkMode ? 'border-slate-800' : 'border-slate-200';

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('skills');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={cn(
        'relative overflow-hidden py-20 sm:py-24 lg:py-28',
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-950'
      )}
      id="skills"
    >
      <Container size="xl">
        {/* Header Section */}
        <div className="relative mb-16 text-center">
          <div
            className={cn(
              'mx-auto mb-4 inline-flex rounded-full px-4 py-1.5 text-sm font-medium',
              isDarkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
            )}
          >
            What I Do Best
          </div>
          
          <h2
            className={cn(
              'text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl',
              isDarkMode ? 'text-white' : 'text-slate-900'
            )}
          >
            Technical{' '}
            <span
              className={cn(
                'bg-gradient-to-r bg-clip-text text-transparent',
                isDarkMode ? 'from-indigo-400 to-purple-400' : 'from-indigo-600 to-purple-600'
              )}
            >
              Expertise
            </span>
          </h2>
          
          <p className={cn('mx-auto mt-4 max-w-2xl text-lg', mutedText)}>
            Mastery of modern technologies to build exceptional digital solutions
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
          {skillCategories.map((category, index) => {
            const average = Math.round(
              category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length
            );
            const CategoryIcon = category.icon;

            return (
              <div
                key={category.title}
                className={cn(
                  'rounded-2xl border p-6 transition-all duration-300 lg:p-8',
                  cardBg,
                  borderColor,
                  isDarkMode
                    ? 'hover:border-slate-700'
                    : 'hover:border-slate-300 hover:shadow-lg',
                  isVisible && 'animate-fade-up'
                )}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                  animationFillMode: 'forwards'
                }}
              >
                {/* Category Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-14 w-14 items-center justify-center rounded-xl text-3xl',
                        isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                      )}
                    >
                      <CategoryIcon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <div>
                      <h3
                        className={cn(
                          'text-xl font-bold',
                          isDarkMode ? 'text-white' : 'text-slate-800'
                        )}
                      >
                        {category.title}
                      </h3>
                      <p className={cn('text-sm', mutedText)}>{category.description}</p>
                    </div>
                  </div>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const SkillIcon = skill.icon;

                    return (
                      <div
                        key={skill.name}
                        className={cn(
                          'inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all',
                          isDarkMode
                            ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        )}
                      >
                        <SkillIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{skill.name}</span>
                        <span className={cn(
                          'ml-1 text-xs',
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        )}>
                          {skill.level}%
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Stats */}
                <div className="mt-6 flex items-center justify-between border-t pt-5 dark:border-slate-800">
                  <div>
                    <span className="block text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {category.skills.length}
                    </span>
                    <span className={cn('text-xs', mutedText)}>Technologies</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {average}%
                    </span>
                    <span className={cn('text-xs', mutedText)}>Avg. Mastery</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Skills Section */}
        <div
          className={cn(
            'mt-12 rounded-2xl border p-6 lg:p-8',
            cardBg,
            borderColor,
            isVisible && 'animate-fade-up'
          )}
          style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="text-center lg:text-left">
              <h3
                className={cn(
                  'text-2xl font-bold',
                  isDarkMode ? 'text-white' : 'text-slate-800'
                )}
              >
                Ready to bring your ideas to life?
              </h3>
              <p className={cn('mt-2', mutedText)}>
                Let&apos;s collaborate on your next project
              </p>
            </div>
            <CtaButton
              className="gap-2 px-6 py-3"
              icon={<FaArrowRight className="h-4 w-4" />}
              iconPosition="right"
              onClick={scrollToContact}
            >
              Start a Project
            </CtaButton>
          </div>
        </div>
      </Container>

      {/* Add CSS animations */}
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
          animation: fadeUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Skills;
