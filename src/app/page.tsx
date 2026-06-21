import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero";
import { SkillsSection } from "@/components/sections/skills";
import { ExperienceSection } from "@/components/sections/experience";
import { AchievementsSection } from "@/components/sections/achievements";
import { ProjectsSection } from "@/components/sections/projects";
import { ProductsSection } from "@/components/sections/products";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { SectionSeparator } from "@/components/ui/section-separator";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Section order: About → Products → Work → Skills → Experience → Achievements → Contact */}
      <main className="flex-1">
        <HeroSection />
        <SectionSeparator />
        <ProductsSection />
        <SectionSeparator />
        <ProjectsSection />
        <SectionSeparator />
        <SkillsSection />
        <SectionSeparator />
        <ExperienceSection />
        <SectionSeparator />
        <AchievementsSection />
        <SectionSeparator />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

