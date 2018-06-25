const handlebars = require('handlebars');

const helpers = {
	if_eq: function(v1, v2, options) {
		if(v1 === v2) {
			return options.fn(this);
		}
		return options.inverse(this);
	},

	if_not_eq: function(v1, v2, options) {
		if(v1 !== v2) {
			return options.fn(this);
		}
		return options.inverse(this);
	},

	if_lt: function(v1, v2, options) {
		if(v1 < v2) {
			return options.fn(this);
		}
		return options.inverse(this);
	},

	if_lt_eq: function(v1, v2, options) {
		if(v1 <= v2) {
			return options.fn(this);
		}
		return options.inverse(this);
	},

	if_gt: function(v1, v2, options) {
		if(v1 > v2) {
			return options.fn(this);
		}
		return options.inverse(this);
	},

	if_gt_eq: function(v1, v2, options) {
		if(v1 >= v2) {
			return options.fn(this);
		}
		return options.inverse(this);
	},

	contains: function(array, value, options) {
		if(array !== undefined && value !== undefined && array.indexOf(value) > -1) {
			return options.fn(this);
		}
		
		return options.inverse(this);
	},

	filter: function(data, params, type, options) {
		let filter = true;
		
		if(params !== undefined) {
			let keys = Object.keys(params);

			if(type === 'every') {
				filter = keys.filter((key) => {
					return params[key].indexOf(data[key]) > -1;
				}).length == keys.length;
			} else {
				filter = keys.filter((key) => {
					return params[key].indexOf(data[key]) > -1;
				}).length > 0;
			}


		}
		
		if(filter) {
			return options.fn(this);
		}

		return options.inverse(this);
	},

	sort: function(array, sort, descending, options) {
		let accum = '';
		
		if(sort) {
			array = array.sort(function(a, b) {
				if(a[sort] > b[sort]) {
					return descending === 'true'?-1:1;
				} else if(a[sort] < b[sort]) {
					return descending === 'true'?1:-1;
				} else {
					return 0;
				}
			})

		}

		array.forEach(function(item, index) {
			options.data.index = index;
			accum += options.fn(item);
		});	

		return accum;
	},

	for: function(from, to, options) {
		var accum = '';
		
		for(var i = from; i <= to; ++i) {
			options.data.index = i;
			accum += options.fn(this);
		}

		return accum;
	},

	json: function(json, removeQuotes) {
		if(removeQuotes === true) {
			return JSON.stringify(json).replace(/\"([^(\")"]+)\":/g,"$1:").replace(/"(true|false)"/igm, '$1');
		}

		return JSON.stringify(json);
	},

	partial: function(partialName) {
		return handlebars.partials[partialName];
	},

	objectlength: function(object) {
		return Object.keys(object).length;
	}
}

Object.keys(helpers).forEach(function(key) {
	handlebars.registerHelper(key, helpers[key]);
});
