"use client";
import { notFound, useParams } from "next/navigation";
import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getDetailBlog } from "@/slices/blogSlice";

export default function BlogDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const dispatch = useDispatch<AppDispatch>();
  const { blog } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (id) {
      dispatch(getDetailBlog(id));
    } else {
      return notFound;
    }
  }, []);

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
        {blog?.title}
      </h1>

      {/* Created time */}
      {blog?.createdAt && (
        <p className="text-gray-500 text-sm mb-6">
          Created at: {new Date(blog.createdAt).toLocaleString()}
        </p>
      )}

      {/* Blog image (optional) */}
      {blog?.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full min-h-5 object-cover rounded-xl mb-8"
        />
      )}

      {/* Blog content (HTML from Tiptap, CKEditor...) */}
      {blog?.content && (
        <article
          className="prose prose-green max-w-none prose-img:rounded-lg prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      )}
    </div>
  );
}
