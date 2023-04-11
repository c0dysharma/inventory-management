/* eslint-disable quotes */
import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

export default mongoose.model('Item', itemSchema);
