import {ChevronLeft, ChevronRight} from 'lucide-react';
import {Link} from 'react-router-dom';
import {useLocale} from '../../i18n/LocaleContext';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumbs({items}: {items: BreadcrumbItem[]}) {
  const {dir, t} = useLocale();
  const Separator = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <nav aria-label={t.a11y.breadcrumbs} className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[var(--nt-text-muted)]">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
              {idx > 0 && <Separator className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="hover:text-[var(--nt-text)] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? 'text-[var(--nt-text)] font-semibold' : undefined}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
