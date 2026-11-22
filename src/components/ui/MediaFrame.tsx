import {ImageOff} from 'lucide-react';
import {useState} from 'react';
import {resolveMediaUrl} from '../../config/site';
import {cn} from '../../utils/cn';

interface MediaFrameProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
}

export function MediaFrame({
  src,
  alt,
  className,
  aspectClass = 'aspect-[4/3]',
  priority = false,
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = resolveMediaUrl(src);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[var(--nt-surface-elevated)] border-b border-[var(--nt-border)]',
        aspectClass,
        className,
      )}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-[var(--nt-text-muted)]">
          <ImageOff className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs font-medium line-clamp-2">{alt}</span>
        </div>
      ) : (
        <img
          src={resolvedSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      )}
    </div>
  );
}
