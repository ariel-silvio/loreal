import type { ScreenMeta } from '../screens/registry';

export function SidePanel({ screen }: { screen?: ScreenMeta }) {
  return (
    <aside className="w-80 shrink-0 self-center" aria-label="What you are seeing">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-gold-text">What you are seeing</p>
      {screen ? (
        <>
          <h2 className="mt-2 font-serif text-2xl">{screen.id}. {screen.title}</h2>
          <p className="mt-3 text-sm leading-relaxed">{screen.seeing}</p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-gold-text">Assumption it tests</p>
          <p className="mt-1 text-sm leading-relaxed">{screen.tests}</p>
        </>
      ) : (
        <p className="mt-2 text-sm">Pick a screen.</p>
      )}
      <p className="mt-6 rounded-xl border border-line bg-paper p-3 text-xs leading-relaxed text-muted">
        Honesty note: classmates are not Dubai women who colour their hair. Their answers are a rehearsal and a usability check, not evidence of demand.
      </p>
    </aside>
  );
}
