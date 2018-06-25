const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SocialColorSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},

	value: {
		type: String,
		unique: true
	}
});

module.exports = mongoose.model('SocialColor', SocialColorSchema);