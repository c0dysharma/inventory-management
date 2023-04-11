import express from 'express';

import { getAllItem, updateItem } from '../controllers/inventoryController.js';

const router = express.Router();

router.route('/').get(getAllItem).put(updateItem);
export default router;
