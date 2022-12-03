import express, { Express, Request, Response } from 'express';
import controller from '../controllers/notesController';

const router = express.Router();

router.get('/notes', controller.findAll);
router.post('/notes', controller.create);
router.get('/notes/:id', controller.findOne);
router.delete('/notes/:id', controller.deleteNotes);

module.exports = router;