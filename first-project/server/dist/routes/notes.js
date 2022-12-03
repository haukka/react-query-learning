"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notesController_1 = __importDefault(require("../controllers/notesController"));
const router = express_1.default.Router();
router.get('/notes', notesController_1.default.findAll);
router.post('/notes', notesController_1.default.create);
router.get('/notes/:id', notesController_1.default.findOne);
router.delete('/notes/:id', notesController_1.default.deleteNotes);
module.exports = router;
