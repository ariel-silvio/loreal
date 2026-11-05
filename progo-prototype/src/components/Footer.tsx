import { FeedbackButton } from './FeedbackButton';

export function Footer() {
  return (
    <footer className="border-t border-line bg-ivory px-4 pb-4 pt-3 text-center">
      <FeedbackButton />
      <p className="mt-1 text-[10px] text-muted">Anonymous. Do not enter personal data.</p>
      <p className="mt-2 text-[11px] leading-snug text-muted">
        Student project for IE Business School. Not affiliated with or endorsed by L'Oréal. Fictional characters and simulated data.
      </p>
    </footer>
  );
}
