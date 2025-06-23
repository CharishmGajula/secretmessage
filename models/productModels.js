//const mongoose = require('mongoose');
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Please provide a product name, e.g., Parle-G']
  },
  summary:
  {
    type:String,
  }
  
});

// The Model is a wrapper on the Schema that provides an interface to the database.
// 'Product' will be turned into a collection named 'products' in MongoDB.
const Product = mongoose.model('Product', productSchema);

export default Product;

