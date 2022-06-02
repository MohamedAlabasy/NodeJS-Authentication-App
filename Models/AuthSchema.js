const mongoose = require('mongoose');


// 1- build schema with validation
const schema = new mongoose.Schema({
    _id: Number,//,mongoose.Types.object
    name: { type: String, required: true, }, //unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], default: 'male' },
}, { timestamps: true });

// Register for schema in mongoose
module.exports = mongoose.model('users', schema);