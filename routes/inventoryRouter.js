import express from 'express';

import {
  getAllItem,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/inventoryController.js';

const router = express.Router();

router.route('/').get(getAllItem).post(createItem);
router.route('/:id').put(updateItem).delete(deleteItem);
export default router;
