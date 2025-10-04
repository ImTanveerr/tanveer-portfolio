import React from 'react';
import { TProject } from '@/zod/project.typeschema';
import { TResponse } from '@/zod/response.typeschema';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import ItemActions from '@/components/ui/item-actions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FolderKanban } from 'lucide-react';

export default async function ProjectPage() {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Fetch all projects
    const res = await fetch(`${url}/api/projects/get-all`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 60, tags: ['projects'] },
    });

    const resData: TResponse<TProject[]> = await res.json();

    if (!resData.data) return notFound();

    return (
        <section className="p-8 min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="outline" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Dashboard
                        </Button>
                    </Link>
                </div>


                <h1 className="text-3xl font-bold text-green-600">Project Management</h1>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/project/create">Add New Project</Link>
                </Button>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 bg-white shadow rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                        <FolderKanban className="w-6 h-6 text-green-500" />
                        <div>
                            <p className="text-gray-500 text-sm">Total Projects</p>
                            <p className="text-gray-900 font-bold text-xl">{resData.data.length}</p>
                        </div>
                    </div>
                </Card>
                {/* You can add more cards for live projects, completed projects, etc. */}
            </div>

            {/* Recent Projects */}
            <div className="grid grid-cols-1 gap-6">
                {resData.data.map((project) => (
                    <Card
                        key={project.id}
                        className="p-6 bg-white shadow rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">{project.name}</h2>
                                <p className="text-gray-500 text-sm">
                                    {project.description
                                        ? `${String(project.description).slice(0, 80)}${String(project.description).length > 80 ? '…' : ''
                                        }`
                                        : 'No description'}
                                </p>
                            </div>
                            <ItemActions
                                id={String(project.id)}
                                type="project"
                                viewHref={project.liveUrl}
                                editHref={`/dashboard/project/edit/${project.id}`}
                            />
                        </div>
                    </Card>
                ))}

                {resData.data.length === 0 && (
                    <p className="text-center text-gray-500">No projects available.</p>
                )}
            </div>
        </section>
    );
}
