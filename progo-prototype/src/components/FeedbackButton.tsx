import { MessageSquare } from 'lucide-react';
import { CONFIG, feedbackReady } from '../config';

export function feedbackUrl(params: Record<string, string> = {}) {
  const url = new URL(CONFIG.FEEDBACK_FORM_URL);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}

export function FeedbackButton({ persona = 'customer' }: { persona?: string }) {
  if (!feedbackReady()) {
    return (
      <button type="button" disabled className="min-h-11 rounded-full border border-line px-4 text-xs text-muted">
        Form link coming soon
      </button>
    );
  }
  return (
    <a href={feedbackUrl({ persona })} target="_blank" rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-4 text-xs font-medium">
      <MessageSquare size={14} aria-hidden /> Give feedback
    </a>
  );
}
