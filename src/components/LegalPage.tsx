import SimplePageLayout from "@/components/SimplePageLayout";

export interface LegalSection {
  title: string;
  body: React.ReactNode;
}

// Shared layout for the Privacy Policy and Terms pages.
const LegalPage = ({ title, updated, intro, sections }: { title: string; updated: string; intro: React.ReactNode; sections: LegalSection[] }) => (
  <SimplePageLayout>
    <article className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <h1 className="text-5xl md:text-6xl font-cheetah title-outline mb-3">{title}</h1>
      <p className="text-sm text-foreground/70 mb-8">Last updated: {updated}</p>
      <div className="text-[17px] leading-relaxed text-foreground/85 mb-10">{intro}</div>
      <div className="space-y-8">
        {sections.map((s, i) => (
          <section key={s.title} aria-labelledby={`sec-${i}`}>
            <h2 id={`sec-${i}`} className="!font-display !text-2xl font-semibold !text-foreground mb-3">
              {i + 1}. {s.title}
            </h2>
            <div className="text-[17px] leading-relaxed text-foreground/85 space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_a]:text-secondary [&_a]:underline [&_a]:underline-offset-2">
              {s.body}
            </div>
          </section>
        ))}
      </div>
    </article>
  </SimplePageLayout>
);

export default LegalPage;
