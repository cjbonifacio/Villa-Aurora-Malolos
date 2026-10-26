interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

// The same heading style for every section: small label, script title, short intro.
const SectionHeader = ({ eyebrow, title, subtitle }: SectionHeaderProps) => (
  <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
    <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-secondary mb-3">{eyebrow}</p>
    <h2 className="text-4xl md:text-5xl font-cheetah title-outline mb-4">{title}</h2>
    {subtitle && <p className="text-base md:text-lg text-foreground/70 leading-relaxed">{subtitle}</p>}
  </div>
);

export default SectionHeader;
