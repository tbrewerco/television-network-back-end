import express from 'express';
import * as networkController from '../controllers/networkController';

const router = express.Router();

router.get('/', networkController.getAllNetworks);
router.get('/:id', networkController.getNetworkById);
router.post('/', networkController.createNetwork);
router.put('/:id', networkController.updateNetwork);
router.delete('/:id', networkController.deleteNetworks);

export default router;