import { Link } from 'react-router-dom';
import type { ScreenMeta } from '../screens/registry';

// Phase 0 stub: each screen shows its title and a link to the next one.
export function Placeholder({ screen, next }: { screen: ScreenMeta; next?: ScreenMeta }) {
  return (
    <div className="flex flex-1 flex-col px-5 py-8">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-gold-text">{screen.id}</p>
      <h1 className="mt-2 font-serif text-3xl leading-tight">{screen.title}</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">{screen.seeing}</p>
      <p className="mt-2 text-xs text-muted">Screen content arrives in the next phase.</p>
      {next && (
        <Link to={next.path} className="mt-auto flex min-h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-ivory">
          Next: {next.title}
        </Link>
      )}
    </div>
  );
}
