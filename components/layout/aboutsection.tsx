import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { BASIC_INFO } from '@/lib/contants';



export function AboutSection() {
  return (
    <section id="about" className="px-6 py-20 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-background">
      <div className="mx-auto max-w-6xl container">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-blue-600 dark:text-blue-400 text-3xl md:text-4xl">
            About Me
          </h2>
         
        </div>

        <div className="space-y-16">
          {/* Bio */}
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <h3 className="font-semibold text-foreground text-2xl">
              Hello, I'm {BASIC_INFO.name}
            </h3>
            <p>
              I’m a passionate full-stack developer with experience in designing and
              building modern web applications. My expertise lies in React, Next.js, Node.js,
              and scalable backend systems. I enjoy turning complex problems into elegant,
              efficient solutions.
            </p>
            <p>
              Beyond coding, I’m deeply curious about technology and entrepreneurship.
              I aspire to contribute to the tech ecosystem in Bangladesh by building platforms
              and opportunities for engineers to thrive.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-6">
            <h3 className="font-semibold text-foreground text-2xl">Educational Background</h3>
            <ul className="list-disc list-inside space-y-3 text-muted-foreground">
              <li>
                <span className="font-semibold text-foreground">BSc in Computer Science & Engineering</span> –
                Ongoing at United International University, Bangladesh
              </li>

            </ul>
          </div>

        

          {/* Resume Actions */}
          <div className="text-center pt-6 flex justify-center gap-4">

            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href={BASIC_INFO.resume} download>
                <Download size={20} className="mr-2" />
                Preview My CV
              </Link>
            </Button>

           
          </div>

        </div>
      </div>
    </section>
  );
}
