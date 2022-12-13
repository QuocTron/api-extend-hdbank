"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transfer_controller_1 = require("../controller/transfer.controller");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const transfer_schema_1 = require("../schema/transfer.schema");
const router = express_1.default.Router();
router.post("/", (0, validateResource_1.default)(transfer_schema_1.remitSchema), transfer_controller_1.remitHandler);
router.get("/:userIdSender", transfer_controller_1.getTransfersUserHandler);
exports.default = router;
