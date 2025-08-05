import TimelineNav from "@/components/TimelineNav";
import HeroSection from "@/components/sections/HeroSection";
import FreeIdeasSection from "@/components/sections/FreeIdeasSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="relative">
      <TimelineNav />
      <div className="ml-0 lg:ml-[15%]">
        <HeroSection />
        <FreeIdeasSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </main>
  );
}