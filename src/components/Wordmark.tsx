import {cn} from '../utils/cn';

export type WordmarkVariant = 'auto' | 'light' | 'dark' | 'monochrome';

interface WordmarkProps {
  variant?: WordmarkVariant;
  className?: string;
}

/**
 * Typography-first NahrTech geometric wordmark with distinctive N and T treatments
 * accented in Electric Blue (#176BCE) and Cyan (#16C7D9).
 */
export function Wordmark({variant = 'auto', className}: WordmarkProps) {
  const baseTextClass =
    variant === 'light'
      ? 'text-white'
      : variant === 'dark'
        ? 'text-[#101B35]'
        : variant === 'monochrome'
          ? 'text-current'
          : 'text-[#101B35] dark:text-[#F4F7FC]';

  const nAccentClass =
    variant === 'monochrome'
      ? 'text-current'
      : 'text-[#176BCE] dark:text-[#4C9BFF]';

  const tAccentClass =
    variant === 'monochrome'
      ? 'text-current'
      : 'text-[#16C7D9]';

  const barAccentClass =
    variant === 'monochrome'
      ? 'bg-current'
      : 'bg-gradient-to-r from-[#176BCE] to-[#16C7D9]';

  return (
    <span
      dir="ltr"
      className={cn(
        'inline-flex items-baseline font-extrabold tracking-tight text-[1.35rem] leading-none select-none whitespace-nowrap shrink-0',
        baseTextClass,
        className,
      )}
    >
      <span className={cn('relative inline-block', nAccentClass)}>
        N
        <span
          aria-hidden="true"
          className={cn('absolute -bottom-1 start-0 end-0 h-[2.5px] rounded-full', barAccentClass)}
        />
      </span>
      <span>ahr</span>
      <span className={cn('relative inline-block', tAccentClass)}>T</span>
      <span>ech</span>
    </span>
  );
}
