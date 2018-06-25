const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BreakpointSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},

	width: {
		type: Number,
		unique: true
	}
});

module.exports = mongoose.model('Breakpoint', BreakpointSchema);