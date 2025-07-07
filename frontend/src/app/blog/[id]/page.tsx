import { notFound } from "next/navigation";
import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  image?: string;
}

async function getBlog(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(`http://localhost:8080/api/blogs/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = await getBlog(params.id);
  if (!blog) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Back button */}
      <Link
        href="/"
        className="flex items-center gap-2 text-green-700 hover:underline mb-6"
      >
        <ArrowLeft size={18} />
        Back to Home
      </Link>

      {/* Blog title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        {blog.title}
      </h1>

      {/* Created time */}
      <p className="text-gray-500 text-sm mb-6">
        Created at: {new Date(blog.createdAt).toLocaleString()}
      </p>

      {/* Blog image (optional) */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full min-h-5 object-cover rounded-xl mb-8"
        />
      )}

      {/* Blog content (HTML from Tiptap, CKEditor...) */}
      <article
        className="prose prose-green max-w-none prose-img:rounded-lg prose-a:text-blue-600"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
