import catchAsync from '../utils/catchAsync.js';

import Item from '../models/itemModel.js';

export const getAllItem = catchAsync(async (req, res, next) => {
  return res.status(200).json({ status: 'success', data: 'All Users' });
});

export const updateItem = catchAsync(async (req, res, next) => {
  return res.status(200).json({ status: 'success', data: 'Updated User' });
});
