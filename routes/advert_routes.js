import { Router } from "express";
import { postAdvert, getAllAdverts, getAdvertById, updateAdvert, deleteAdvert } from "../controllers/advert_contrllers.js";
import { authenticate } from "../middlewares/auth.js";
import { multipleImages } from "../middlewares/image_upload.js";
import { authorizeVendor } from "../middlewares/roles.js";

export const advertRouter = Router();

advertRouter.get("/getAllAdverts", getAllAdverts);
advertRouter.get('/:id', getAdvertById)
advertRouter.post('/',authenticate, authorizeVendor, multipleImages, postAdvert);
advertRouter.put("/:id",authenticate, authorizeVendor, updateAdvert);
advertRouter.delete("/:id", authenticate, authorizeVendor, deleteAdvert)


