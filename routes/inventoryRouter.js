import express from 'express';

import {
  getAllItem,
  createItem,
  updateItem,
} from '../controllers/inventoryController.js';

const router = express.Router();

router.route('/').get(getAllItem).post(createItem);
router.route('/:id').put(updateItem);
export default router;
