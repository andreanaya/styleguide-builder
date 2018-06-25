const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var ThemeSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},

	breakpoints: [ObjectId],

	columnWidth: {
		type: Number,
		default: 300
	},
	maxWidth: {
		type: Number,
		default: 1440
	},

	grid: [Number],

	fontSize: {
		type: Number,
		default: 16
	},
	lineHeight: {
		type: Number,
		default: 1.5
	},

	spaces: [{
		key: String,
		value: Number
	}],

	colors: [{
		name: {
			type: String,
			unique: true
		},
		value: {
			type: String,
			unique: true
		}
	}],

	socialColors: [ObjectId],

	typography: [ObjectId],

	icons: [ObjectId]
});

module.exports = mongoose.model('Theme', ThemeSchema);