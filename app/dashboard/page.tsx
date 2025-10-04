import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText, FolderKanban } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoutButton from "./logoutbutton";
import { TResponse } from "@/zod/response.typeschema";
import { TPost } from "@/zod/post.typeschema";
import { TProject } from "@/zod/project.typeschema";

export default async function DashboardPage() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${url}/api/user/get-dashboard-data`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60, tags: ["posts", "projects"] },
  });

  const responseData: TResponse<{
    postData: TPost[];
    projectData: TProject[];
  }> = await res.json();

  const posts = responseData.data.postData || [];
  const projects = responseData.data.projectData || [];

  const stats = [
    { name: "Total Blog Posts", value: posts.length, icon: FileText, color: "text-blue-500 bg-blue-100" },
    { name: "Total Projects", value: projects.length, icon: FolderKanban, color: "text-green-500 bg-green-100" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 mb-10">
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Button>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/dashboard/blog">
            <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              <FileText className="w-4 h-4" />
              Blog Posts
            </Button>
          </Link>
          <Link href="/dashboard/project">
            <Button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
              <FolderKanban className="w-4 h-4" />
              Projects
            </Button>
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.name}
            className="bg-white p-6 shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="mb-1 text-gray-500 text-sm">{stat.name}</p>
                <p className="mb-0 font-bold text-gray-900 text-2xl">
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
