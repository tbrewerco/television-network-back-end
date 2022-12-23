import express from 'express';
import * as packageController from '../controllers/packageController.js';

const router = express.Router();

router.get('/', packageController.getPackages);
router.get('/:id', packageController.getSinglePackage);
router.post('/', packageController.createSinglePackage);
router.put('/:id', packageController.updateSinglePackage);
router.delete('/:id', packageController.deleteSinglePackage);

export default router;