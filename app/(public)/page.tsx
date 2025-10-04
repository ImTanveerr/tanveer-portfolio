import { AboutSection } from '@/components/layout/aboutsection';
import { BlogSection } from '@/components/layout/blogsection';
import { ContactSection } from '@/components/layout/contactsection';
import { Header } from '@/components/layout/header';
import Hero from '@/components/layout/herosection';
import { ProjectsSection } from '@/components/layout/projectsection';
import SkillSection from '@/components/layout/SkillSection';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <BlogSection />
      <SkillSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
