import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import Container from "../container/Container";
import CtaButton from "../cta-button/CtaButton";
import { cn } from "../../lib/cn";

type ThemeProps = {
  isDarkMode: boolean;
};

type ContactForm = {
  [key: string]: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
};

type StatusMessage = {
  type: "success" | "error";
  text: string;
} | null;

const contactReasons = [
  "Project Collaboration",
  "Job Opportunity",
  "Freelance Work",
  "Consultation",
  "Just saying hello!",
];

const contactItems: Array<{ icon: IconType; title: string; value: string }> = [
  {
    icon: FaEnvelope,
    title: "Email",
    value: "Malikaadi653@gmail.com",
  },
  { icon: FaPhoneAlt, title: "Phone", value: "+91 6006348676" },
];

const initialFormData: ContactForm = {
  name: "",
  email: "",
  phone: "",
  reason: "",
  message: "",
};

const Contact = ({ isDarkMode }: ThemeProps) => {
  const [formData, setFormData] = useState<ContactForm>(initialFormData);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<StatusMessage>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const mutedText = isDarkMode ? "text-slate-300" : "text-slate-700";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!status) {
      return undefined;
    }

    const timer = window.setTimeout(() => setStatus(null), 5000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.reason) {
      newErrors.reason = "Please select a reason";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://portfolio-backend-pe15.onrender.com/api/user/send-contact-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus({
        type: "success",
        text: "Thank you! Your message has been sent successfully.",
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (name: keyof ContactForm) =>
    cn(
      "w-full rounded-xl border-2 px-4 py-3 text-base outline-none transition focus:-translate-y-0.5 focus:ring-4",
      isDarkMode
        ? "border-white/15 bg-white/10 text-white placeholder:text-slate-400 focus:border-indigo-400 focus:ring-indigo-500/25"
        : "border-slate-200 bg-white/90 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500/10",
      errors[name] &&
        "border-red-500 focus:border-red-500 focus:ring-red-500/15",
    );

  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 sm:py-20 lg:py-24",
        isDarkMode
          ? "bg-gradient-to-br from-slate-950 to-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900",
      )}
      id="contact"
      ref={sectionRef}
    >
      <AnimatePresence>
        {status && (
          <motion.div
            className={cn(
              "fixed left-1/2 top-5 z-[80] w-[min(92vw,520px)] -translate-x-1/2 rounded-2xl border px-5 py-4 text-center font-bold shadow-2xl backdrop-blur",
              status.type === "success"
                ? "border-emerald-300/40 bg-emerald-500/95 text-white shadow-emerald-500/20"
                : "border-red-300/40 bg-red-500/95 text-white shadow-red-500/20",
            )}
            initial={{ opacity: 0, y: -24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.96 }}
          >
            {status.text}
          </motion.div>
        )}
      </AnimatePresence>

      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10 text-center sm:mb-14">
            <h2
              className={cn(
                "text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
                isDarkMode ? "text-white" : "text-slate-900",
              )}
            >
              Get In{" "}
              <span
                className={cn(
                  "bg-gradient-to-r bg-clip-text text-transparent",
                  isDarkMode
                    ? "from-indigo-400 to-purple-400"
                    : "from-indigo-600 to-purple-600",
                )}
              >
                Touch
              </span>
            </h2>
            <p className={cn("mx-auto mt-4 max-w-2xl text-lg", mutedText)}>
              Have a project in mind or want to collaborate? Let&apos;s talk!
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.3fr] xl:gap-10">
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -24 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl font-extrabold sm:text-3xl">
                Let&apos;s start a conversation
              </h3>
              <p className={cn("mt-4 text-lg leading-8", mutedText)}>
                I&apos;m always interested in new opportunities and exciting
                projects. Feel free to reach out and I&apos;ll get back to you
                as soon as possible.
              </p>

              <div className="mt-8 grid gap-5">
                {contactItems.map((item) => {
                  const ContactIcon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-center justify-center gap-4 lg:justify-start"
                    >
                      <span
                        className={cn(
                          "grid h-12 w-12 place-items-center rounded-full text-xl",
                          isDarkMode ? "bg-indigo-500/20" : "bg-indigo-500/10",
                        )}
                        aria-hidden="true"
                      >
                        <ContactIcon className="h-5 w-5" />
                      </span>
                      <div className="text-left">
                        <h4 className="font-extrabold">{item.title}</h4>
                        <p className={cn("break-all", mutedText)}>{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="https://www.linkedin.com/in/nasir-malik-250949250/"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-center font-bold transition hover:-translate-y-0.5",
                    isDarkMode
                      ? "bg-white/10 text-white hover:bg-indigo-500/30"
                      : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
                  )}
                >
                  <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Nasir653"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-center font-bold transition hover:-translate-y-0.5",
                    isDarkMode
                      ? "bg-white/10 text-white hover:bg-indigo-500/30"
                      : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
                  )}
                >
                  <FaGithub className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
              </div>
            </motion.div>

            <motion.form
              className={cn(
                "rounded-3xl border p-5 shadow-2xl sm:p-6 lg:p-8",
                isDarkMode
                  ? "border-white/10 bg-white/[0.06] shadow-slate-950/30"
                  : "border-slate-200 bg-white/90 shadow-slate-200/80",
              )}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 24 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
              transition={{ delay: 0.18 }}
            >
              <div className="grid gap-6">
                <div>
                  <label htmlFor="name" className="mb-2 block font-bold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={fieldClass("name")}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <span className="mt-2 block text-sm font-semibold text-red-500">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 block font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={fieldClass("email")}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <span className="mt-2 block text-sm font-semibold text-red-500">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block font-bold">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={fieldClass("phone")}
                      placeholder="+91 823-456-7890"
                    />
                    {errors.phone && (
                      <span className="mt-2 block text-sm font-semibold text-red-500">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="reason" className="mb-2 block font-bold">
                    Why are you contacting me? *
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className={fieldClass("reason")}
                  >
                    <option value="">Select a reason</option>
                    {contactReasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                  {errors.reason && (
                    <span className="mt-2 block text-sm font-semibold text-red-500">
                      {errors.reason}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block font-bold">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={fieldClass("message")}
                    rows={5}
                    placeholder="Tell me about your project or inquiry..."
                  />
                  {errors.message && (
                    <span className="mt-2 block text-sm font-semibold text-red-500">
                      {errors.message}
                    </span>
                  )}
                </div>

                <CtaButton
                  type="submit"
                  fullWidth
                  className="gap-3 text-lg font-extrabold"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { y: -2 } : undefined}
                >
                  {isSubmitting ? (
                    <>
                      <motion.span
                        className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </CtaButton>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Contact;
