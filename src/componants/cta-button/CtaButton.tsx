import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/cn';

type CtaButtonVariant = 'primary' | 'secondary';
type CtaButtonSize = 'md' | 'lg';

type CtaButtonProps = Omit<ComponentPropsWithoutRef<typeof motion.button>, 'children'> & {
  children: ReactNode;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isDarkMode?: boolean;
  size?: CtaButtonSize;
  variant?: CtaButtonVariant;
};

const sizeClasses: Record<CtaButtonSize, string> = {
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-4 text-base sm:px-7',
};

const primaryClasses =
  'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-xl shadow-orange-500/25';

const secondaryClasses = (isDarkMode: boolean) =>
  cn(
    'border-2 bg-transparent shadow-sm',
    isDarkMode
      ? 'border-indigo-300 text-indigo-200 shadow-none hover:bg-indigo-400/10'
      : 'border-indigo-700 bg-white/80 text-indigo-900 shadow-indigo-100 hover:bg-indigo-50'
  );

export default function CtaButton({
  children,
  className,
  disabled,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  isDarkMode = false,
  size = 'lg',
  type = 'button',
  variant = 'primary',
  whileHover,
  whileTap,
  ...props
}: CtaButtonProps) {
  const resolvedWhileHover = disabled ? undefined : whileHover ?? { y: -3, scale: 1.02 };
  const resolvedWhileTap = disabled ? undefined : whileTap ?? { scale: 0.98 };

  return (
    <motion.button
      {...props}
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-bold transition disabled:cursor-not-allowed disabled:opacity-70',
        sizeClasses[size],
        fullWidth && 'w-full',
        variant === 'primary' ? primaryClasses : secondaryClasses(isDarkMode),
        className
      )}
      whileHover={resolvedWhileHover}
      whileTap={resolvedWhileTap}
    >
      {icon && iconPosition === 'left' && (
        <span aria-hidden="true" className="shrink-0">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span aria-hidden="true" className="shrink-0">
          {icon}
        </span>
      )}
    </motion.button>
  );
}
