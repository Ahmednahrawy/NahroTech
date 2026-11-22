import React from 'react';
import {Link} from 'react-router-dom';
import {cn} from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-[#176BCE] text-white hover:bg-[#1258AE] dark:hover:bg-[#2C82EB] border border-transparent shadow-sm',
  secondary:
    'bg-[#101B35] text-white hover:bg-[#1A2B52] dark:bg-[#16C7D9] dark:text-[#091122] dark:hover:bg-[#2AD9EC] border border-transparent',
  outline:
    'bg-transparent text-[var(--nt-text)] border border-[var(--nt-border-strong)] hover:bg-[var(--nt-surface-elevated)]',
  ghost:
    'bg-transparent text-[var(--nt-text-secondary)] hover:text-[var(--nt-text)] hover:bg-[var(--nt-surface-elevated)] border border-transparent',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'min-h-[40px] px-4 py-2 text-xs font-semibold',
  md: 'min-h-[44px] px-5 py-2.5 text-sm font-semibold',
  lg: 'min-h-[48px] px-6 py-3 text-base font-semibold',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)}
      {...props}
    />
  );
}

interface LinkButtonProps {
  to: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function LinkButton({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
  onClick,
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)}
    >
      {children}
    </Link>
  );
}
