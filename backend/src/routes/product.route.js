const express = require("express");
const productController = require("../controllers/product.controller");
const productRoutes = express.Router();

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/:id", productController.getProductById);
productRoutes.post("/", productController.createProduct);
productRoutes.put("/:id", productController.updateProduct);
productRoutes.delete("/:id", productController.deleteProduct);
productRoutes.get(
  "/service/:serviceId",
  productController.getProductsByService
);

module.exports = productRoutes;
