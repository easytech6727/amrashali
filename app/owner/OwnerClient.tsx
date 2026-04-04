"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { OwnerProfile } from "@/types/journal";
import type { CVContact } from "@/types/journal";

const ContactIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 dark:bg-white/10 flex items-center justify-center text-primary dark:text-accent">
    {children}
  </span>
);

const ScrollReveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.3"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
};

export default function OwnerClient({
  ownerProfile,
  contact,
}: {
  ownerProfile: OwnerProfile;
  contact?: CVContact | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const c = contact ?? { id: "", phone: "", email: "", address: "" };
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background image – heavily blurred & low opacity for readability */}
        {ownerProfile.backgroundImageUrl && (
          <div className="absolute inset-0">
            <Image
              src={ownerProfile.backgroundImageUrl}
              alt=""
              fill
              className="object-cover blur-2xl scale-110 opacity-30"
              priority
              sizes="100vw"
              aria-hidden
            />
            {/* Dark overlay to ensure text contrast */}
            <div
              className="absolute inset-0 bg-primary/40"
              aria-hidden
            />
          </div>
        )}

        {/* Subtle parallax gradient – keeps color scheme */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none"
          aria-hidden
        />

        {/* Content container – no overlap, clean grid */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16 xl:gap-20 lg:items-center">
            {/* Profile image – left, reduced size, rounded, soft shadow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px]"
            >
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/20 bg-white/95 dark:bg-gray-900/95">
                <Image
                  src={ownerProfile.imageUrl}
                  alt={ownerProfile.imageAlt || ownerProfile.name}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 300px"
                />
              </div>
            </motion.div>

            {/* Text content – right, in glassmorphism card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-w-0 flex-1"
            >
              <div className="rounded-2xl border border-white/20 bg-white/10 dark:bg-black/20 px-6 py-8 sm:px-8 sm:py-10 shadow-2xl backdrop-blur-md">
                {/* Typography hierarchy – light text for contrast on dark hero */}
                <p
                  className="text-accent text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3 opacity-90"
                  style={{ letterSpacing: "0.2em" }}
                >
                  About the Author
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-2">
                  {ownerProfile.name}
                </h1>
                <p className="text-lg sm:text-xl text-white/90 font-medium">
                  {ownerProfile.role}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Profile details – contact + full bio */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16 sm:space-y-24">
        <ScrollReveal>
          <section className="card overflow-hidden rounded-2xl shadow-xl border border-primary/10 dark:border-white/10">
            <div className="flex flex-col">
              <div className="p-6 sm:p-8 lg:p-10 border-b border-primary/10 dark:border-white/10">
                <h3 className="text-primary dark:text-white text-xs font-semibold tracking-[0.2em] uppercase mb-4 opacity-90">
                  Profile
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-text-light dark:text-text-dark leading-relaxed font-light">
                  {ownerProfile.bio}
                </p>
              </div>

              <div className="p-6 sm:p-8 lg:p-10 bg-primary/5 dark:bg-white/5">
                <h3 className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6 opacity-90">
                  Contact
                </h3>
                <div className="space-y-5">
                  <div className="flex gap-4 pt-1">
                    <a href="https://www.facebook.com/share/1FNKwbNNqQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <svg className="w-7 h-7 text-[#1877F3] hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
                    </a>
                    <a href="https://www.instagram.com/amras_ali23?igsh=aWtuMWZhZmN0MGRk&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <svg className="w-7 h-7 text-[#E4405F] hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.783 2.295 7.149 2.233 8.415 2.175 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.334 3.678 1.315c-.98.98-1.187 2.092-1.245 3.373C2.012 8.332 2 8.741 2 12c0 3.259.012 3.668.07 4.948.058 1.281.265 2.393 1.245 3.373.98.98 2.092 1.187 3.373 1.245C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.393-.265 3.373-1.245.98-.98 1.187-2.092 1.245-3.373.058-1.28.07-1.689.07-4.948 0-3.259-.012-3.668-.07-4.948-.058-1.281-.265-2.393-1.245-3.373-.98-.98-2.092-1.187-3.373-1.245C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/amras-ali-6994b1218?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <svg className="w-7 h-7 text-[#0077B5] hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.069 0-1.144.925-2.069 2.069-2.069 1.144 0 2.069.925 2.069 2.069 0 1.143-.925 2.069-2.069 2.069zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z"/></svg>
                    </a>
                  </div>

                  <div className="flex items-start gap-4">
                    <ContactIcon>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 14.387c-.272-.136-1.607-.793-1.855-.883-.248-.09-.429-.136-.61.136-.18.272-.7.883-.858 1.064-.158.18-.315.203-.587.068-.272-.136-1.148-.423-2.187-1.348-.81-.722-1.358-1.613-1.518-1.885-.158-.272-.017-.419.12-.555.124-.123.272-.32.408-.48.136-.16.18-.272.272-.453.09-.18.045-.34-.022-.48-.068-.136-.61-1.473-.836-2.018-.22-.53-.445-.457-.61-.465l-.52-.009c-.18 0-.47.068-.717.34-.247.272-.94.92-.94 2.24 0 1.32.962 2.591 1.096 2.77.136.18 1.893 2.893 4.59 3.94.642.221 1.142.353 1.532.452.643.163 1.228.14 1.69.085.516-.061 1.607-.656 1.834-1.29.227-.634.227-1.178.158-1.29-.068-.113-.247-.18-.52-.317z" />
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </ContactIcon>
                    <a href="https://wa.me/94741154696" target="_blank" rel="noopener noreferrer" className="text-text-light dark:text-text-dark hover:text-accent transition-colors font-medium">
                      Contact Us on WhatsApp
                    </a>
                  </div>

                  {contact && contact.email && (
                    <div className="flex items-start gap-4">
                      <ContactIcon>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </ContactIcon>
                      <a href={`mailto:${contact.email}`} className="text-text-light dark:text-text-dark hover:text-accent transition-colors break-all">
                        {contact.email}
                      </a>
                    </div>
                  )}

                  {contact && contact.phone && (
                    <div className="flex items-start gap-4">
                      <ContactIcon>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </ContactIcon>
                      <a href={`tel:${contact.phone}`} className="text-text-light dark:text-text-dark hover:text-accent transition-colors">
                        {contact.phone}
                      </a>
                    </div>
                  )}

                  {contact && contact.address && (
                    <div className="flex items-start gap-4">
                      <ContactIcon>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </ContactIcon>
                      <span className="text-text-light dark:text-text-dark">
                        {contact.address}
                      </span>
                    </div>
                  )}

                  {(!contact || (!contact.phone && !contact.email && !contact.address)) && (
                    <p className="text-text opacity-80 text-sm">Add contact info in cv_contact table.</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Card image – Be Your Best Version */}
        <ScrollReveal delay={0.05}>
          <section className="flex justify-center">
            <div className="relative w-full max-w-4xl aspect-[4/3] sm:aspect-[3/2] rounded-2xl overflow-hidden shadow-xl ring-1 ring-primary/10 dark:ring-white/10">
              <Image
                src="/ab-journal/background%20image.jpeg"
                alt="Be Your Best Version - AB Journal"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <section className="text-center">
            <Link
              href="/about"
              className="text-primary dark:text-accent hover:text-accent dark:hover:text-accent-light font-medium underline underline-offset-4 transition-colors"
            >
              ← Back to About the Journal
            </Link>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
