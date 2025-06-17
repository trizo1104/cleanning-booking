const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("service", "name");
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách sản phẩm", error: err.message });
  }
};

const getProductsByService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const products = await Product.find({ service: serviceId }).populate(
      "service",
      "name"
    );

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: "Lỗi khi lấy sản phẩm theo dịch vụ",
      error: err.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy sản phẩm", error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Lỗi khi tạo sản phẩm", error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để cập nhật" });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Lỗi khi cập nhật sản phẩm", error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để xóa" });
    }
    res.status(200).json({ message: "Xóa sản phẩm thành công" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa sản phẩm", error: err.message });
  }
};

module.exports = {
  getAllProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  getProductById,
  getProductsByService,
};
