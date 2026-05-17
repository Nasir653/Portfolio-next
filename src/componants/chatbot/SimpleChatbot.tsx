import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import { cn } from '../../lib/cn';

type ChatMessage = {
  text: string;
  isBot: boolean;
};

type SimpleChatbotProps = {
  isVisible: boolean;
  onClose: () => void;
};

const quickQuestions = [
  'What are your skills?',
  'Tell me about your experience',
  'What projects have you done?',
  'How to contact you?',
  "What's your education?",
];

const getBotResponse = (message: string) => {
  const lowerCaseMessage = message.toLowerCase();

  if (
    lowerCaseMessage.includes('skill') ||
    lowerCaseMessage.includes('technology') ||
    lowerCaseMessage.includes('tech stack')
  ) {
    return "Nasir specializes in:\n\n• Frontend: React.js, JavaScript, TypeScript, HTML5, CSS3\n• Backend: Node.js, Express.js, MongoDB, MySQL\n• Mobile: React Native\n• Tools: Git, Docker, AWS, REST APIs\n• Other: Python, Java, C++\n\nHe has 4+ years of experience with these technologies.";
  }

  if (
    lowerCaseMessage.includes('experience') ||
    lowerCaseMessage.includes('work') ||
    lowerCaseMessage.includes('background')
  ) {
    return 'Nasir has 4+ years of professional experience:\n\n• Full Stack Developer specializing in MERN stack\n• Built 10+ successful projects\n• Worked with 8+ happy clients\n• Expertise in scalable web applications\n\nHe has experience in both startup and enterprise environments.';
  }

  if (
    lowerCaseMessage.includes('project') ||
    lowerCaseMessage.includes('portfolio') ||
    lowerCaseMessage.includes('work done')
  ) {
    return 'Nasir has worked on various projects:\n\n• E-commerce platforms\n• Social media applications\n• Business management systems\n• Dashboard and analytics tools\n• REST API development\n\nCheck the portfolio sections for detailed project case studies!';
  }

  if (
    lowerCaseMessage.includes('contact') ||
    lowerCaseMessage.includes('email') ||
    lowerCaseMessage.includes('hire') ||
    lowerCaseMessage.includes('reach') ||
    lowerCaseMessage.includes('phone') ||
    lowerCaseMessage.includes('mobile')
  ) {
    return 'You can contact Nasir through:\n\nEmail: malikaadi653@gmail.com\nLinkedIn: https://www.linkedin.com/in/nasir-malik-250949250/\nPhone: +91 6006348676\nPortfolio: nasirmalik-portfolio-netlify.app\n\nFeel free to use the contact form on this website for quick responses!';
  }

  if (
    lowerCaseMessage.includes('education') ||
    lowerCaseMessage.includes('degree') ||
    lowerCaseMessage.includes('qualification')
  ) {
    return "Nasir's Education:\n\n• Bachelor's Degree in Computer Science\n• Specialized in Software Engineering\n• Strong academic background\n• Continuous learner with latest technologies\n\nHe combines formal education with practical experience.";
  }

  if (
    lowerCaseMessage.includes('certificate') ||
    lowerCaseMessage.includes('certification') ||
    lowerCaseMessage.includes('certified')
  ) {
    return 'Nasir holds certifications in:\n\n• Full Stack Web Development\n• React.js & Node.js\n• HTML & CSS\n• Advanced JavaScript\n• Agile Methodologies\n\nCheck the certificates section for all his credentials!';
  }

  if (lowerCaseMessage.includes('available') || lowerCaseMessage.includes('freelance')) {
    return "Nasir is available for:\n\n• Full-time positions\n• Freelance projects\n• Contract work\n• Technical consulting\n\nHe's open to discussing new opportunities!";
  }

  if (
    lowerCaseMessage.includes('hello') ||
    lowerCaseMessage.includes('hi') ||
    lowerCaseMessage.includes('hey')
  ) {
    return 'Hello there! I can help you learn about Nasir. You can ask me about:\n\n• Skills & Technologies\n• Work Experience\n• Projects\n• Education\n• Contact Information\n\nWhat would you like to know?';
  }

  if (lowerCaseMessage.includes('help') || lowerCaseMessage.includes('what can you do') || lowerCaseMessage.includes('options')) {
    return 'I can help you learn about Nasir. You can ask about:\n\n• Skills & Technologies\n• Work Experience\n• Projects\n• Education\n• Certificates\n• Contact Information\n\nOr use the quick questions below.';
  }

  if (
    lowerCaseMessage.includes('what is your age') ||
    lowerCaseMessage.includes('how old are you') ||
    lowerCaseMessage.includes('age')
  ) {
    return 'Nasir is 24 years old.';
  }

  if (
    lowerCaseMessage.includes('location') ||
    lowerCaseMessage.includes('where do you live') ||
    lowerCaseMessage.includes('reside') ||
    lowerCaseMessage.includes('live') ||
    lowerCaseMessage.includes('current location')
  ) {
    return 'Nasir is based in Kashmir, India.';
  }

  return 'I can help you learn about Nasir. You can ask about:\n\n• Skills & Technologies\n• Work Experience\n• Projects\n• Education\n• Contact Information\n\nOr use the quick questions below.';
};

const SimpleChatbot = ({ isVisible, onClose }: SimpleChatbotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hello! I'm Nasir's assistant. I can help you learn more about his skills, experience, projects, and more. What would you like to know?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (text: string) => {
    if (!text.trim()) {
      return;
    }

    setMessages((current) => [...current, { text, isBot: false }]);

    window.setTimeout(() => {
      setMessages((current) => [...current, { text: getBotResponse(text), isBot: true }]);
    }, 500);
  };

  const handleSend = () => {
    addMessage(input);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-x-4 bottom-24 z-50 mx-auto flex h-[min(620px,calc(100vh-8rem))] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20 dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-950 sm:inset-x-auto sm:right-7 sm:mx-0 sm:w-[380px]"
          initial={{ opacity: 0, y: 36, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 36, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 360, damping: 28 }}
        >
          <div className="relative flex min-h-16 items-center justify-between overflow-hidden bg-gradient-to-br from-indigo-500 to-violet-600 px-5 py-4 text-white">
            <motion.div
              className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              animate={{ x: ['0%', '320%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative z-10 flex items-center gap-3">
              <h4 className="text-lg font-extrabold">Nasir&apos;s Assistant</h4>
              <motion.span
                className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#4ade80]"
                animate={{ scale: [1, 1.18, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                aria-hidden="true"
              />
            </div>
            <button
              type="button"
              className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-2xl leading-none transition hover:rotate-90 hover:bg-white/30"
              onClick={onClose}
              aria-label="Close chatbot"
            >
              <FaTimes className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto bg-slate-50 p-4 dark:bg-slate-900/70">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.text}-${index}`}
                  className={cn(
                    'max-w-[88%] whitespace-pre-line break-words rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm',
                    message.isBot
                      ? 'self-start rounded-bl-lg border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-slate-700 dark:text-white'
                      : 'self-end rounded-br-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-indigo-500/20'
                  )}
                  initial={{ opacity: 0, y: 16, scale: message.isBot ? 1 : 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {message.text}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="max-h-32 shrink-0 overflow-y-auto border-t border-slate-200 bg-slate-100 p-4 dark:border-white/10 dark:bg-slate-800">
              <div className="mb-2 text-[0.7rem] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                Quick Questions
              </div>
              <div className="grid gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    className="truncate rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:to-violet-600 hover:text-white dark:border-white/10 dark:bg-slate-700 dark:text-slate-100"
                    onClick={() => addMessage(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 border-t border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-800">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSend();
                  }
                }}
                placeholder="Type your message here..."
                className="min-w-0 flex-1 rounded-full border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:-translate-y-0.5 focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/10 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
              />
              <motion.button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleSend}
                disabled={!input.trim()}
                whileHover={input.trim() ? { y: -2 } : undefined}
                whileTap={input.trim() ? { scale: 0.96 } : undefined}
              >
                <FaPaperPlane className="h-3.5 w-3.5" aria-hidden="true" />
                Send
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SimpleChatbot;
