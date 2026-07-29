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
      { title: "VideoMorph 🎬 — Convert Videos Without Crying" },
      {
        name: "description",
        content:
          "A playful, open-source video format converter. MP4, MOV, AVI, MKV, WEBM — we got you.",
      },
      { property: "og:title", content: "VideoMorph — Convert Videos Without Crying" },
      {
        property: "og:description",
        content: "A playful, open-source video format converter. Fast, free, and slightly chaotic.",
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
