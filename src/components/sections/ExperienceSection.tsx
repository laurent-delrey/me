"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    id: "snap",
    title: "Snap, Inc.",
    description: "I've been a member of the core product design team at snapchat. A small pioneer group of inventors who disrupted the space. I've been honored to contribute to building for chat, calling, minis and the camera.",
    link: "https://www.snap.com/",
    linkText: "snapchat",
  },
  {
    id: "tribe",
    title: "A Quest Called Tribe",
    titleFont: "font-saol italic",
    description: "2 continents. 3 cities. 4 houses. 15 people. 4 products. 1 family. Tribe was a series of social experiments backed by Sequoia Capital and KPCB. A messaging app, a calling app and a gaming app.",
    awards: ["Product Hunt", "Apple", "Google", "Time"],
  },
  {
    id: "hustle",
    title: "SIDE HUSTLES",
    titleFont: "font-cinderblock uppercase",
    description: "I've released a bunch of side projects. From an ironic fan brand inspired by Balenciaga, the missing \"Explore\" section of Snapchat, or Collectible Cards on the Ethereum network. The one that blew up the most though was a controversial email-based app called Leak.",
    mentions: ["Washington Post", "BBC", "Vogue", "Vice", "Mashable"],
  },
  {
    id: "lost",
    title: "LOST",
    titleFont: "font-druk uppercase",
    description: "I have a Master Degree in Finance. I've never studied Design at school. During my College years, I created a bunch of Tumblrs receiving 100,000+ visits, curated a newsletter of torrent links called Le Video Club (RIP), made merch for several French Colleges, interned at Leetchi - the \"Hottest Startup #1 in Paris (Wired)\" and also created my first social app.",
  },
  {
    id: "kid",
    title: "Just\na kid",
    titleFont: "font-noe",
    description: "Born and raised in Paris, France. I started designing at 16 on a cracked version of Photoshop CS2. My first gigs were terrible logos & websites for my Counter Strike friends. AIM, MSN or mIRC. The early days of remote work.",
  },
];

export default function ExperienceSection() {
  return (
    <>
      {experiences.map((exp, index) => (
        <section 
          key={exp.id} 
          id={exp.id} 
          className="min-h-screen flex items-center justify-center relative"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl px-8 text-center relative z-10"
          >
            {exp.title && (
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className={`
                  text-[#b4b4b4] mb-8 whitespace-pre-line
                  ${exp.titleFont || "font-aretha"}
                  ${exp.id === "lost" ? "text-[160px] md:text-[260px] lg:text-[320px] leading-[0.8]" : ""}
                  ${exp.id === "kid" ? "text-[130px] md:text-[200px] lg:text-[300px] leading-[0.9]" : ""}
                  ${exp.id === "hustle" ? "text-[100px] md:text-[200px] lg:text-[300px] leading-[0.7]" : ""}
                  ${exp.id === "tribe" ? "text-[80px] md:text-[150px] lg:text-[200px]" : ""}
                  ${!["lost", "kid", "hustle", "tribe"].includes(exp.id) ? "text-4xl md:text-6xl" : ""}
                `}
              >
                {exp.title}
              </motion.h2>
            )}
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white text-lg md:text-[22px] leading-relaxed font-light lowercase"
            >
              {exp.description.split(/(\[.*?\])/g).map((part, i) => {
                if (part.startsWith('[') && part.endsWith(']')) {
                  const linkText = part.slice(1, -1);
                  return (
                    <a
                      key={i}
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        border-b border-white/30 pb-2 hover:border-white/60 transition-all
                        ${exp.id === "tribe" ? "text-[#14f8c5]" : ""}
                        ${exp.id === "hustle" ? "text-[#b35bff]" : ""}
                        ${exp.id === "lost" ? "text-[#ffbce7]" : ""}
                      `}
                    >
                      {linkText}
                    </a>
                  );
                }
                return part;
              })}
              {exp.link && !exp.description.includes('[') && (
                <>
                  {" "}
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white border-b border-white/30 pb-2 hover:border-white/60 transition-all"
                  >
                    {exp.linkText}
                  </a>
                </>
              )}
            </motion.p>

            {exp.awards && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-12 flex flex-wrap justify-center gap-8"
              >
                {exp.awards.map((award) => (
                  <span key={award} className="text-white/50 hover:text-white transition-colors">
                    {award}
                  </span>
                ))}
              </motion.div>
            )}

            {exp.mentions && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-12 flex flex-wrap justify-center gap-6"
              >
                {exp.mentions.map((mention) => (
                  <span key={mention} className="text-white/50 hover:text-white transition-colors text-sm">
                    {mention}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </section>
      ))}
    </>
  );
}