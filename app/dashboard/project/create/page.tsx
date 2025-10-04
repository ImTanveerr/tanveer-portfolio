'use client';

import { CreateProjectAction } from '@/actions/CreateProjectAction';
import UploadWidget from '@/components/features/imageupload/upload-widget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TProject } from '@/zod/project.typeschema';
import { ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';

export default function CreateProjectPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddFeature = () => {
    const v = featureInput.trim();
    if (!v) return;
    setFeatures(prev => [...prev, v]);
    setFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !description || !liveUrl || !projectUrl) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!imageUrl) {
      toast.error('Please upload a thumbnail');
      return;
    }
    if (features.length === 0) {
      toast.error('Add at least one feature');
      return;
    }

    setIsSubmitting(true);

    const payload: TProject = {
      name,
      description,
      thumbnailUrl: imageUrl,
      liveUrl,
      projectUrl,
      features,
    };

    const res = await CreateProjectAction(payload);
    if ((res as any).succes) {
      toast.success('Project created successfully!');
      router.push('/dashboard/project');
    } else {
      toast.error('Project creation failed');
    }
    setIsSubmitting(false);
  };

  return (
    <section className="mx-auto px-4 py-20 max-w-7xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/dashboard/project">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft size={16} /> Back
          </Button>
        </Link>
      </div>

      <h1 className="mb-10 text-3xl md:text-4xl font-bold text-blue-600">
        Create New Project
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Form */}
        <div className="flex-1 space-y-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter project name"
                className="bg-slate-50 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter project description"
                className="bg-slate-50 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <Label >Upload Project Thumbnail</Label>
              <div className="border-2 border-blue-200 rounded-md p-2">
                <UploadWidget onUploadComplete={setImageUrl} />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                value={liveUrl}
                onChange={e => setLiveUrl(e.target.value)}
                placeholder="https://your-project-live.com"
                className="bg-slate-50 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="projectUrl">Project Repo / URL</Label>
              <Input
                id="projectUrl"
                value={projectUrl}
                onChange={e => setProjectUrl(e.target.value)}
                placeholder="https://github.com/your/repo"
                className="bg-slate-50 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Features */}
            <div className="space-y-1">
              <Label>Features</Label>
              <div className="flex gap-2">
                <Input
                  value={featureInput}
                  onChange={e => setFeatureInput(e.target.value)}
                  placeholder="Add a feature and click Add"
                  className="bg-slate-50 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  onClick={handleAddFeature}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Add
                </Button>

              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {f}
                    <X
                      className="w-4 h-4 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveFeature(i)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </Button>
          </form>
        </div>

        {/* Thumbnail Preview */}
        <div className="w-full lg:w-1/3 flex flex-col items-center gap-4">
          <Label>Thumbnail Preview</Label>
          {imageUrl ? (
            <div className="relative w-full min-h-[250px] border border-blue-200 rounded-lg overflow-hidden">
              <Image src={imageUrl} alt="Thumbnail" fill className="object-contain" />
            </div>
          ) : (
            <div className="w-full min-h-[250px] flex items-center justify-center border border-dashed border-blue-300 rounded-lg text-blue-300">
              No image uploaded
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
