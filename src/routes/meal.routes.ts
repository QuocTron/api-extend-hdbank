import {
  createMealHandler,
  getAllMealHandler,
  updateMealHandler,
} from "./../controller/meal.controller";
import { Request } from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";
import moment from "moment";
import path from "path";
import { Router } from "express";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const router = Router();

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    console.log(__dirname);
    callback(
      null,
      path.join(path.dirname(path.dirname(__dirname)), `src/public/images`)
    );
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) => {
    const generator: string = uuid().split("-")?.pop() || uuid().split("-")[0];
    const date = moment(Date.now()).format("YYYYMMDDhhmmss");
    const filename = date + generator;
    console.log(`${filename}${path.extname(file.originalname)}`);
    callback(null, `${filename}${path.extname(file.originalname)}`);
  },
});

router.post("/", multer({ storage }).single("meal"), createMealHandler);
router.get("/", getAllMealHandler);
router.put("/", updateMealHandler);
export default router;
