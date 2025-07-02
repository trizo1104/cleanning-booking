"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "react-toastify";

interface ServiceOption {
  optionType: string;
  priceFrom: number;
  description: string;
}

interface ProcedureStep {
  step: string;
  stepDescription: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ServiceFormData) => void;
  defaultValues?: ServiceFormData;
  title?: string;
}

export default function ServiceFormModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  title = "Service Form",
}: Props) {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    icon: "",
    serviceOptions: [],
    duration: 0,
    description: "",
    details: "",
    notes: "",
    warrantyPolicy: "",
    benefits: [],
    procedureSteps: [],
    safetyStandards: [],
    technicianInfo: "",
    imageUrls: [],
  });

  const [benefitsInput, setBenefitsInput] = useState("");
  const [safetyInput, setSafetyInput] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        icon: "",
        serviceOptions: [],
        duration: 0,
        description: "",
        details: "",
        notes: "",
        warrantyPolicy: "",
        benefits: [],
        procedureSteps: [],
        safetyStandards: [],
        technicianInfo: "",
        imageUrls: [],
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues);
      setBenefitsInput(defaultValues.benefits?.join(", "));
      setSafetyInput(defaultValues.safetyStandards?.join(", "));
    }
  }, [defaultValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  const handleServiceOptionChange = (
    index: number,
    field: keyof ServiceOption,
    value: string | number
  ) => {
    const updated = [...formData.serviceOptions];
    updated[index] = {
      ...updated[index],
      [field]: field === "priceFrom" ? Number(value) : value,
    };
    setFormData({ ...formData, serviceOptions: updated });
  };

  const addServiceOption = () => {
    setFormData({
      ...formData,
      serviceOptions: [
        ...formData.serviceOptions,
        { optionType: "", priceFrom: 0, description: "" },
      ],
    });
  };

  const handleStepChange = (
    index: number,
    field: keyof ProcedureStep,
    value: string
  ) => {
    const updated = [...formData.procedureSteps];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, procedureSteps: updated });
  };

  const addStep = () => {
    setFormData({
      ...formData,
      procedureSteps: [
        ...formData.procedureSteps,
        { step: "", stepDescription: "" },
      ],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.icon ||
      !formData.description ||
      !formData.details ||
      !formData.duration ||
      formData.serviceOptions.length === 0 ||
      formData.procedureSteps.length === 0
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    onSubmit({
      ...formData,
      benefits: benefitsInput
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean),
      safetyStandards: safetyInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="w-full max-w-2xl bg-white rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold text-green-700 mb-4">{title}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full border p-2 rounded"
                />
                <input
                  name="icon"
                  value={formData.icon || ""}
                  onChange={handleChange}
                  placeholder="Icon URL"
                  className="w-full border p-2 rounded"
                />
                <input
                  name="duration"
                  value={formData.duration || ""}
                  onChange={handleChange}
                  placeholder="Duration (mins)"
                  type="number"
                  className="w-full border p-2 rounded"
                />

                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full border p-2 rounded"
                />
                <textarea
                  name="details"
                  value={formData.details || ""}
                  onChange={handleChange}
                  placeholder="Details"
                  className="w-full border p-2 rounded"
                />

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Notes"
                  className="w-full border p-2 rounded"
                />
                <textarea
                  name="warrantyPolicy"
                  value={formData.warrantyPolicy}
                  onChange={handleChange}
                  placeholder="Warranty Policy"
                  className="w-full border p-2 rounded"
                />

                <textarea
                  value={benefitsInput}
                  onChange={(e) => setBenefitsInput(e.target.value)}
                  placeholder="Benefits (comma separated)"
                  className="w-full border p-2 rounded"
                />
                <textarea
                  value={safetyInput}
                  onChange={(e) => setSafetyInput(e.target.value)}
                  placeholder="Safety Standards (comma separated)"
                  className="w-full border p-2 rounded"
                />

                <input
                  name="technicianInfo"
                  value={formData?.technicianInfo || ""}
                  onChange={handleChange}
                  placeholder="Technician Info"
                  className="w-full border p-2 rounded"
                />

                <input
                  value={formData?.imageUrls?.join(", ") || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      imageUrls: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  placeholder="Image URLs (comma separated)"
                  className="w-full border p-2 rounded"
                />

                <div className="space-y-2">
                  <label className="font-semibold">Service Options</label>
                  {formData.serviceOptions?.map((opt, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-2">
                      <input
                        placeholder="Option Type"
                        value={opt.optionType}
                        onChange={(e) =>
                          handleServiceOptionChange(
                            idx,
                            "optionType",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded"
                      />
                      <input
                        placeholder="Price From"
                        type="number"
                        value={opt.priceFrom}
                        onChange={(e) =>
                          handleServiceOptionChange(
                            idx,
                            "priceFrom",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded"
                      />
                      <input
                        placeholder="Description"
                        value={opt.description}
                        onChange={(e) =>
                          handleServiceOptionChange(
                            idx,
                            "description",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addServiceOption}
                    className="text-green-600 hover:underline"
                  >
                    + Add Option
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold">Procedure Steps</label>
                  {formData.procedureSteps?.map((step, idx) => (
                    <div key={idx} className="grid grid-cols-2 gap-2">
                      <input
                        placeholder="Step"
                        value={step.step}
                        onChange={(e) =>
                          handleStepChange(idx, "step", e.target.value)
                        }
                        className="border p-2 rounded"
                      />
                      <input
                        placeholder="Step Description"
                        value={step.stepDescription}
                        onChange={(e) =>
                          handleStepChange(
                            idx,
                            "stepDescription",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addStep}
                    className="text-green-600 hover:underline"
                  >
                    + Add Step
                  </button>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
