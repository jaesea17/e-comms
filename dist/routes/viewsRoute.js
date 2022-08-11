"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const viewsController_1 = require("../controller/viewsController");
const router = express_1.default.Router();
/* GET register page*/
router.get('/', viewsController_1.registerView);
/* GET login page*/
router.get('/login', viewsController_1.loginView);
/* GET dashboard page*/
router.get('/dashboard', viewsController_1.dashboardView);
/* CREAT login page*/
router.get('/create', viewsController_1.createView);
exports.default = router;
