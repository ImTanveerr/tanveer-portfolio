import { Button } from '@/components/ui/button';
import { Mail, Phone, Linkedin, Github, Twitter } from 'lucide-react';
import Link from 'next/link';
import { BASIC_INFO } from '@/lib/contants';

export function ContactSection() {
  return (
    <section id="contact" className="px-6 py-20 bg-blue-50 dark:bg-blue-950">
      <div className="mx-auto max-w-6xl container">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-extrabold text-3xl md:text-5xl text-blue-600 dark:text-blue-400">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-2xl text-slate-700 text-lg md:text-xl">
            Whether you have a project idea, collaboration, or just want to say hello, feel free to reach out!
          </p>
        </div>

        {/* Contact info */}
        <div className="grid gap-8 md:grid-cols-3 text-center mb-12">
          <div className="flex flex-col items-center gap-2">
            <Mail size={28} className="text-blue-600" />
            <span className="text-lg font-medium text-slate-900">{BASIC_INFO.email}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Phone size={28} className="text-blue-600" />
            <span className="text-lg font-medium text-slate-900">{BASIC_INFO.phone}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-lg font-medium text-slate-900">Follow Me</span>
            <div className="flex items-center gap-4 mt-2 justify-center">
              <Link href={BASIC_INFO.linkedIn} target="_blank">
                <Linkedin size={24} className="text-blue-600 hover:text-blue-800 transition" />
              </Link>
              <Link href={BASIC_INFO.github} target="_blank">
                <Github size={24} className="text-blue-600 hover:text-blue-800 transition" />
              </Link>
        
            </div>
          </div>
        </div>

        {/* Contact form button or link */}
        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <Link href={`mailto:${BASIC_INFO.email}`}>
              Send Me a Message
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
