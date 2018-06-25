const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var TypographySchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},

	variants: [{
		alias: String,

		breakpoint: [ObjectId],

		fontFamily: {
			type: ObjectId,
			required: true
		},

		fontStyle: {
			type: ObjectId,
			required: true
		},

		fontSize: {
			type: Number,
			required: true
		},

		lineHeight: {
			type: Number,
			default: 1
		},

		letterSpace: Number,

		transform: {
			type: String,
			enum: ['uppercase', 'lowercase', 'capitalize']
		},

		decoration: {
			type: String,
			enum: ['none', 'underline', 'overline', 'line-through']
		}
	}]
});

module.exports = mongoose.model('Typography', TypographySchema);