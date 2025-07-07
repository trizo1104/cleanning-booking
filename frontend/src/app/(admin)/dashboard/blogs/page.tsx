"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, FileText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

import { toast } from "react-toastify";
import { useConfirmDialog } from "@/components/useConfirmDialog";

import { formatDateTime } from "@/lib/format";
import BlogFormModal from "@/components/BlogFormModal";
import { createBlog, deleteBlog, getAllBlogs } from "@/slices/blogSlice";

export default function AdminBlogsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, isLoading } = useSelector((state: RootState) => state.blog);
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  const handleDelete = async (id: string) => {
    confirm({
      title: "Delete Blog",
      message: "Are you sure you want to delete this blog post?",
      onConfirm: async () => {
        const result = await dispatch(deleteBlog(id));
        if (deleteBlog.fulfilled.match(result)) {
          toast.success("Blog deleted successfully!");
        } else {
          toast.error("Failed to delete blog.");
        }
      },
    });
  };

  const handleCreateBlog = async (formData: {
    title: string;
    content: string;
    image: string;
  }) => {
    const result = await dispatch(createBlog(formData));
    if (createBlog.fulfilled.match(result)) {
      toast.success("Blog created successfully!");
      setOpenModal(false);
    } else {
      toast.error("Failed to create blog.");
    }
  };

  return (
    <section className="min-h-screen bg-white p-6 md:p-10">
      <ConfirmDialog />
      <BlogFormModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateBlog}
        title="Create New Blog"
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-2xl font-bold text-green-700">Blogs Management</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus size={18} />
          Create New Blog
        </button>
      </motion.div>

      {isLoading ? (
        <p className="text-gray-500">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog: IBlog, index: number) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-xl shadow p-4 bg-gray-50 hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-green-800 line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-500">
                Created: {formatDateTime(blog.createdAt)}
              </p>
              <div className="flex gap-2 mt-4 float-end">
                {/* <button className="flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
                  <FileText size={14} />
                  View
                </button> */}
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex items-center  gap-1 text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
