import { useState } from "react";

export interface ConfirmOptions {
  title?: string;
  message?: string;
  onConfirm: () => void;
}

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const confirm = (opts: ConfirmOptions) => {
    setOptions(opts);
    setIsOpen(true);
  };

  const ConfirmDialog = () =>
    isOpen && options ? (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {options.title || "Confirm Action"}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {options.message || "Are you sure you want to proceed?"}
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                options.onConfirm();
              }}
              className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    ) : null;

  return { confirm, ConfirmDialog };
};
