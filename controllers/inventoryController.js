/* eslint-disable import/no-cycle */
import catchAsync from '../utils/catchAsync.js';
import Item from '../models/itemModel.js';
import { io } from '../wss.js';
import AppError from '../utils/appError.js';

export const getAllItem = catchAsync(async (req, res, next) => {
  const data = await Item.find({});
  io.emit('items', { status: 'success', data });
  return res.status(200).json({ status: 'success', data });
});

export const createItem = catchAsync(async (req, res, next) => {
  const { name, price, stock } = res.body;
  const data = await Item.create({ name, price, stock });
  io.emit('items', { status: 'success', data });
  return res.status(200).json({ status: 'success', data });
});

export const updateItem = catchAsync(async (req, res, next) => {
  const { name, price, stock } = res.body;
  if (!req.params.id) next(new AppError('Requested resource not found', 404));

  const data = await Item.findByIdAndUpdate(
    req.params.id,
    {
      name,
      price,
      stock,
    },
    { new: true }
  );
  io.emit('items', { status: 'success', data });
  return res.status(200).json({ status: 'success', data });
});

export const deleteItem = catchAsync(async (req, res, next) => {
  if (!req.params.id) next(new AppError('Requested resource not found', 404));

  const data = await Item.findByIdAndDelete(req.params.id, {
    returnDocument: true,
  });
  io.emit('items', { status: 'success', data });
  return res.status(200).json({ status: 'success', data });
});
