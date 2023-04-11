/* eslint-disable import/no-cycle */
import catchAsync from '../utils/catchAsync.js';
import Item from '../models/itemModel.js';
import { io } from '../wss.js';
import AppError from '../utils/appError.js';

// controller for getting all items in inventory
export const getAllItem = catchAsync(async (req, res, next) => {
  const data = await Item.find({});
  io.emit('items', { status: 'success', data });
  return res.status(200).json({ status: 'success', data });
});

// controller for creating a item in inventory
export const createItem = catchAsync(async (req, res, next) => {
  const { name, price, quantity } = req.body;
  const data = await Item.create({
    name,
    price,
    quantity,
  });
  io.emit('items', { status: 'success', data: await Item.find({}) });
  return res.status(200).json({ status: 'success', data });
});

// controller for editing a item in inventory
export const updateItem = catchAsync(async (req, res, next) => {
  const { name, price, quantity } = req.body;
  if (!req.params.id) next(new AppError('Requested resource not found', 404));

  const data = await Item.findByIdAndUpdate(
    req.params.id,
    { name, price, quantity },
    { new: true }
  );
  io.emit('items', { status: 'success', data: await Item.find({}) });
  return res.status(200).json({ status: 'success', data });
});

// controller for deleting a item in inventory
export const deleteItem = catchAsync(async (req, res, next) => {
  if (!req.params.id) next(new AppError('Requested resource not found', 404));

  const data = await Item.findByIdAndDelete(req.params.id, {
    returnDocument: true,
  });
  io.emit('items', { status: 'success', data: await Item.find({}) });
  return res.status(200).json({ status: 'success', data });
});
