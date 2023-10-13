import { Router } from "express";
import { body, validationResult, oneOf } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import { errorHandler } from "./error handlers/errors";

const router = Router();

// In this case, different routes will work to separate what needs
// authentication and what doesn't

//a router is like a component!

// Product
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  [body("name").isString(), handleInputErrors],
  updateProduct
);
router.post(
  "/product",
  [body("name").isString(), handleInputErrors],
  createProduct
);
router.delete("/product/:id", deleteProduct);

// Update
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  [
    body("title").optional(),
    body("body").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").optional(),
  ],
  updateUpdate
);
router.post(
  "/update",
  [
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("productId").exists().isString(),
  ],
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

// Update point
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  [body("name").optional(), body("description").optional().isString()],
  () => {}
);
router.post(
  "/updatepoint",
  [
    body("name").isString(),
    body("description").isString(),
    body("updateId").exists().isString(),
  ],
  () => {}
);
router.delete("/updatepoint/:id", () => {});

// Must add a error-handler for every sub-routers! It won't tell the error to it's "parent"
router.use(errorHandler);
export default router;
