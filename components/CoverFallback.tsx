import { TechEchelonMark } from "./TechEchelonMark";

// Branded stand-in for a missing cover image. Drop inside any cover box
// that is positioned relative; it fills the box with the navy ground, the
// mark, and the desk label so an image-less story never looks broken.
export function CoverFallback({ label }: { label?: string }) {
  return (
    <div className="absolute inset-0 bg-navy flex flex-col items-center justify-center gap-2 text-cream" aria-hidden="true">
      <TechEchelonMark className="w-10 h-10 md:w-12 md:h-12 opacity-90" />
      {label && (
        <span className="font-mono text-[9.5px] md:text-[10px] tracking-[0.18em] uppercase font-bold text-coral-light">
          {label}
        </span>
      )}
    </div>
  );
}
