import { Badge } from "@/components/ui/badge";

export default function SkillSection() {
  const frontendSkills = [
    "React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux/ Zustand", "GraphQL", "REST APIs"
  ];

  const backendSkills = [
    "Node.js", "Express.js", "NestJS", "PostgreSQL", "MongoDB", "Prisma", "REST & GraphQL APIs"
  ];

  const otherTools = [
    "Docker", "Git & GitHub", "Vercel / Netlify", "Postman", "Figma / UI Design", "AWS & Cloud Services"
  ];

  return (
    <section id="skills" className="px-6 py-20 bg-slate-50">
      <div className="mx-auto max-w-6xl container">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-extrabold text-3xl md:text-5xl text-blue-600">
            My Skills
          </h2>
         
        </div>

        {/* Skills grid */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Frontend */}
          <div>
            <h3 className="mb-4 font-semibold text-xl text-slate-900">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {frontendSkills.map((skill) => (
                <Badge key={skill} className="bg-blue-100 text-blue-800 text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div>
            <h3 className="mb-4 font-semibold text-xl text-slate-900">Backend</h3>
            <div className="flex flex-wrap gap-2">
              {backendSkills.map((skill) => (
                <Badge key={skill} className="bg-blue-100 text-blue-800 text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Other Tools */}
          <div>
            <h3 className="mb-4 font-semibold text-xl text-slate-900">Other Tools & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {otherTools.map((tool) => (
                <Badge key={tool} className="bg-blue-100 text-blue-800 text-sm">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
