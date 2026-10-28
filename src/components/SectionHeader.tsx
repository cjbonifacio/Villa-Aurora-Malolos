interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

// The same heading style for every section: small label between gold lines,
// script title (Cheetah Kick), short intro (Lexend).
const SectionHeader = ({ eyebrow, title, subtitle }: SectionHeaderProps) => (
  <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
    <p className="flex items-center justify-center gap-4 text-xs md:text-[13px] font-medium uppercase tracking-[0.28em] text-secondary mb-4">
      <span className="h-px w-8 md:w-12 bg-villa-gold" aria-hidden="true" />
      {eyebrow}
      <span className="h-px w-8 md:w-12 bg-villa-gold" aria-hidden="true" />
    </p>
    <h2 className="text-5xl md:text-6xl font-cheetah title-outline mb-5">{title}</h2>
    {subtitle && <p className="text-base md:text-lg text-foreground/75 leading-relaxed">{subtitle}</p>}
  </div>
);

export default SectionHeader;
