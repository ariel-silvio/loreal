import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CONFIG } from '../config';

export function Banner() {
  const [open, setOpen] = useState(false);
  const reset = () => {
    try { localStorage.removeItem(CONFIG.STORAGE_KEY); } catch { /* storage blocked */ }
    window.location.hash = '#/customer/invite';
    window.location.reload();
  };
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between bg-ink px-3 text-ivory">
      <span className="py-2 text-[11px] font-medium uppercase tracking-[0.14em]">Prototype, simulated data</span>
      <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-11 items-center justify-center rounded-full">
        {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
      </button>
      {open && (
        <div className="absolute right-2 top-11 w-48 rounded-xl border border-line bg-paper p-1 text-ink shadow-lg">
          <button type="button" onClick={reset} className="min-h-11 w-full rounded-lg px-3 text-left text-sm hover:bg-ivory">
            Reset demo
          </button>
        </div>
      )}
    </div>
  );
}
