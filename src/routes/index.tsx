import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { ConverterPanel } from "@/components/ConverterPanel";
import { FeatureCards } from "@/components/FeatureCards";
import { FormatBubbles } from "@/components/FormatBubbles";
import { StatsCounters } from "@/components/StatsCounters";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FLUXA 🎬 — Privacy-First Browser-Based File Tools" },
      {
        name: "description",
        content:
          "FLUXA is a fast, beautiful, privacy-first, open-source file workspace running directly in your browser.",
      },
      { property: "og:title", content: "FLUXA — Privacy-First File Tools" },
      {
        property: "og:description",
        content: "Fast, free, privacy-first browser-based file conversion and tools.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Hero />
      <ConverterPanel />
      <FeatureCards />
      <FormatBubbles />
      <StatsCounters />
      <FaqAccordion />
      <Footer />
    </main>
  );
}
