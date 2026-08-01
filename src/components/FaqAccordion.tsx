import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShinyText } from "./ShinyText";

const FAQS = [
  { q: "Can this convert everything?", a: "No. Only emotionally." },
  { q: "Why is it so fast?", a: "We yell at the pixels. They listen." },
  { q: "Why is it open source?", a: "Because secrets are boring and PRs are fun." },
  { q: "Will my computer explode?", a: "Only metaphorically. Probably." },
];

export function FaqAccordion() {
  return (
    <section id="faq" className="relative z-10 mx-auto max-w-3xl px-6 py-20">
      <h2 className="text-center text-4xl font-black text-ink sm:text-5xl dark:text-white">
        <ShinyText text="FAQ, kinda" color="currentColor" shineColor="#a3e635" speed={2.5} />
      </h2>
      <p className="mt-3 text-center text-ink/60 dark:text-white/70">
        Real questions. Fake answers.
      </p>
      <Accordion type="single" collapsible className="mt-10 space-y-4">
        {FAQS.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="rounded-3xl border border-ink/5 bg-white px-6 shadow-float dark:bg-surface dark:border-white/10"
          >
            <AccordionTrigger className="py-5 text-left text-lg font-black text-ink dark:text-white hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-base text-ink/70 dark:text-white/80">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
