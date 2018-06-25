const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var IconSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},

	svg: {
		type: String,
		unique: true
	}
});

module.exports = mongoose.model('Icon', IconSchema);