const Service = require("../models/service");

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Cannot get services", error: error.message });
  }
};

const getServiceDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("Error getting service detail:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createService = async (req, res) => {
  try {
    const {
      name,
      icon,
      serviceOptions,
      duration,
      description,
      details,
      notes,
      warrantyPolicy,
      benefits,
      procedureSteps,
      safetyStandards,
      technicianInfo,
      imageUrls,
    } = req.body;

    const service = await Service.create({
      name,
      icon,
      serviceOptions,
      duration,
      description,
      details,
      notes,
      warrantyPolicy,
      benefits,
      procedureSteps,
      safetyStandards,
      technicianInfo,
      imageUrls,
    });

    res.status(201).json(service);
  } catch (error) {
    res
      .status(400)
      .json({ mess: "Create service failed", error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Update service success" });
  } catch (err) {
    res.status(400).json({ message: "Failed to update service" });
  }
};

const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete service" });
  }
};

module.exports = {
  getAllServices,
  createService,
  getServiceDetail,
  updateService,
  deleteService,
};
