"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="social" className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl px-8 text-center"
      >
        <p className="text-white text-lg md:text-[22px] leading-relaxed font-light lowercase">
          DMs are opened on{" "}
          <a
            href="https://twitter.com/laurentdelrey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 border-b border-white/30 pb-2 hover:text-white hover:border-white/60 transition-all"
          >
            Twitter
          </a>{" "}
          and{" "}
          <a
            href="https://t.me/laurentdelrey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 border-b border-white/30 pb-2 hover:text-white hover:border-white/60 transition-all"
          >
            Telegram
          </a>
          . I can do{" "}
          <a
            href="mailto:laurent.desserrey@gmail.com?subject=Hi%20there"
            className="text-white/70 border-b border-white/30 pb-2 hover:text-white hover:border-white/60 transition-all"
          >
            email
          </a>{" "}
          too. Love.{" "}
          <span className="text-white/50">
            Updated on {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toLowerCase()}.
          </span>
        </p>
      </motion.div>
    </section>
  );
}