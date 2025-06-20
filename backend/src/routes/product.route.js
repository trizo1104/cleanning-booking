const express = require("express");
const productController = require("../controllers/product.controller");
const middleware = require("../middleware/auth.middleware");
const productRoutes = express.Router();

productRoutes.get("/", productController.getAllProducts);

productRoutes.get("/:id", productController.getProductById);
productRoutes.post(
  "/",
  middleware.protectRoute,
  middleware.adminOnly,
  productController.createProduct
);

productRoutes.post(
  "/:id",
  middleware.protectRoute,
  middleware.adminOnly,
  productController.updateProduct
);

productRoutes.delete(
  "/:id",
  middleware.protectRoute,
  middleware.adminOnly,
  productController.deleteProduct
);

productRoutes.get(
  "/service/:serviceId",
  middleware.protectRoute,
  productController.getProductsByService
);

module.exports = productRoutes;
