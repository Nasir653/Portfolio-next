import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { IconType } from "react-icons";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import Container from "../container/Container";
import { cn } from "../../lib/cn";

type ThemeProps = {
  isDarkMode: boolean;
};

const quickLinks = [
  { href: "#", label: "About Me" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

const services = [
  "Software Engineer",
  "Web Development",
  "Mern Stack Development",
  "Mobile Apps",
  "API Development",
];

const socials: Array<{ href: string; icon: IconType; name: string }> = [
  {
    href: "https://www.linkedin.com/in/nasir-malik-250949250/",
    icon: FaLinkedinIn,
    name: "LinkedIn",
  },
  { href: "https://github.com/Nasir653", icon: FaGithub, name: "GitHub" },
  { href: "https://x.com/m_aadi_01", icon: FaTwitter, name: "Twitter" },
  {
    href: "https://www.instagram.com/m_aadi02?igsh=MnVmY2dybm9jb2hp",
    icon: FaInstagram,
    name: "Instagram",
  },
];

const contactInfo: Array<{ icon: IconType; label: string }> = [
  { icon: FaEnvelope, label: "Malikaadi653@gmail.com" },
  { icon: FaPhoneAlt, label: "+91 6006348676" },
  { icon: FaMapMarkerAlt, label: "Kashmir, India" },
];

const Footer = ({ isDarkMode }: ThemeProps) => {
  const currentYear = new Date().getFullYear();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.clientHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={cn(
        "relative overflow-hidden pb-8 pt-16 text-white",
        isDarkMode
          ? "bg-gradient-to-br from-slate-950 to-slate-900"
          : "bg-gradient-to-br from-slate-800 to-slate-700",
      )}
    >
      <Container size="xl">
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-[1.7fr_1fr_1fr_1.3fr] xl:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="max-w-md leading-8 text-white/80">
              Creating beautiful, functional web experiences with modern
              technologies and innovative solutions.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map((social) => {
                const SocialIcon = social.icon;

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-sm font-black text-white transition hover:bg-gradient-to-r hover:from-indigo-500 hover:to-violet-500"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SocialIcon className="h-4 w-4" aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <FooterSection title="Quick Links">
            <ul className="grid gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="text-white/75 transition hover:pl-1 hover:text-violet-300"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterSection>

          <FooterSection title="Services">
            <ul className="grid gap-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-white/75 transition hover:pl-1 hover:text-violet-300"
                >
                  {service}
                </li>
              ))}
            </ul>
          </FooterSection>

          <FooterSection title="Contact Info">
            <div className="grid gap-4 text-white/75">
              {contactInfo.map((item) => {
                const ContactIcon = item.icon;

                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <ContactIcon
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="break-all">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </FooterSection>
        </div>
      </Container>

      <div className="mt-12 border-t border-white/10 pt-8">
        <Container
          size="xl"
          className="flex flex-col items-center justify-between gap-4 text-center text-sm text-white/70 md:flex-row"
        >
          <p>&copy; {currentYear} Nasir Portfolio. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms of Service
            </a>
          </div>
        </Container>
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent"
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </footer>
  );
};

const FooterSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
  >
    <h4 className="relative mb-6 text-lg font-extrabold after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-8 after:rounded-full after:bg-gradient-to-r after:from-indigo-500 after:to-violet-500">
      {title}
    </h4>
    {children}
  </motion.div>
);

export default Footer;
