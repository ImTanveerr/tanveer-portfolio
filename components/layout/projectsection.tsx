import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { GetAllProjectsAction } from '@/actions/GetAllProjectsAction';
import { TResponse } from '@/zod/response.typeschema';
import { TPost } from '@/zod/post.typeschema';
import { TProject } from '@/zod/project.typeschema';
import Link from 'next/link';

export async function ProjectsSection() {
  // const projects = await GetAllProjectsAction();

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${url}/api/projects/get-all`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['projects'] },
  });
  const resData: TResponse<TProject[]> = await res.json();
  return (
    <section id="projects" className="px-6 py-20 bg-slate-50">
      <div className="mx-auto max-w-6xl container">

        {/* Section header */}
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-extrabold text-3xl md:text-5xl text-blue-600">
            Projects Showcase
          </h2>
        </div>




        {/* Projects grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {resData.data.map((project) => (
            <Card
              key={project.id}
              className="group border border-slate-200 bg-white hover:shadow-xl transform transition-all duration-300 overflow-hidden"
            >
              {/* Project image */}
              <div className="relative overflow-hidden h-48 group">
                <Image
                  src={project.thumbnailUrl ?? '/placeholder.png'}
                  alt={project.name}
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay for buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg text-lg flex items-center gap-2 hover:bg-blue-700 transition"
                  >
                    <ExternalLink size={20} />
                    Live Site
                  </a>

                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg text-lg flex items-center gap-2 hover:bg-blue-50 transition"
                  >
                    <Github size={20} />
                    Code
                  </a>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg md:text-xl text-slate-900">
                  {project.name}
                </CardTitle>
                <CardDescription className="text-slate-600 leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features/Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature, index) => (
                    <Badge
                      key={feature + index}
                      variant="secondary"
                      className="text-xs bg-blue-100 text-blue-800"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>



        {/* View all projects button */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
            asChild
          >
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );

}
