const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FontFaceSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},

	family: {
		type: String,
		unique: true,
		required: true
	},

	fallback: String,

	styles: [{
		alias: {
			type: String,
			required: true
		},
		src: {
			type: String,
			required: true
		},
		weight: {
			type: Number,
			default: 400,
			enum: [100, 200, 300, 400, 500, 600, 700, 800, 900]
		},
		style: {
			type: String,
			default: 'normal',
			enum: ['normal', 'italic']
		},
		
		unicode: String
	}]

});

module.exports = mongoose.model('FontFace', FontFaceSchema);