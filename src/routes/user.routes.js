import { Router } from "express";
import { register } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name:"avatar",
      maxCount:1
    },{
      name:"cover image",
      maxCount:2
    }
  ]),
  register);

export default router;