import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
const TiptapEditor = dynamic(() => import("../components/TiptapEditor"), {
  ssr: false,
});
import { X } from "lucide-react";

interface BlogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; content: string; image: string }) => void;
  title: string;
}

export default function BlogFormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
}: BlogFormModalProps) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  useEffect(() => {
    if (isOpen) {
      setForm({ title: "", content: "", image: "" });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl shadow-lg w-[90%] max-w-2xl h-[90vh] flex flex-col relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold p-3 mb-4 text-green-700">
              {title}
            </h2>

            <div className="flex-1 overflow-auto p-6 space-y-4">
              {/* Title input */}
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Content textarea */}
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <TiptapEditor
                content={form.content}
                onChange={(val) => setForm({ ...form, content: val })}
              />

              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image url"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Create
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
