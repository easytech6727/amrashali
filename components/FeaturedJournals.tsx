"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import type { Journal } from "@/lib/data";
import JournalCard from "./JournalCard";

interface FeaturedJournalsProps {
  journals: Journal[];
}

export default function FeaturedJournals({ journals }: FeaturedJournalsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "start 0.3"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section ref={sectionRef} className="mb-16 sm:mb-24 lg:mb-32 xl:mb-40">
      <motion.div
        style={{ opacity, y }}
        className="mb-8 sm:mb-12 lg:mb-16 xl:mb-20"
      >
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
          <div className="h-px bg-accent flex-1" />
          <span className="text-accent text-xs sm:text-sm font-medium tracking-wider uppercase px-2">
            Latest
          </span>
          <div className="h-px bg-accent flex-1" />
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif font-bold text-primary mb-4 sm:mb-6 leading-[1.1] sm:leading-[0.95] tracking-tight">
          Featured Journal
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-text-light max-w-3xl leading-relaxed font-light">
          The latest journal entries from AB Journal, selected from the most
          recent published stories.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {journals.map((journal, index) => (
          <JournalCard key={journal.id} journal={journal} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-16 text-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/ab-journal"
            className="btn-primary text-lg px-10 py-4 inline-block"
          >
            View All Journal Entries
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}