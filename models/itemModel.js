/* eslint-disable quotes */
import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, 'Name should have >=3 characters'],
    maxLength: [15, 'Name should have <15 characters'],
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
