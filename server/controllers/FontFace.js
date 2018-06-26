const fs = require('fs');
const fileType = require('file-type');
const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2');
const FontFace = require('/app/models/FontFace.js');

module.exports = {
	get: async (req, res, next) => {
		try {
			let fonts = await FontFace.find();

			let data = [...fonts].map((fontFace) => {
				return  {
					id: fontFace._id,
					name: fontFace.name,
					variants: fontFace.variants.map(variant => variant.alias)
				}
			});
			
			res.status(200).json({
				sucess: true,
				data: data
			});
		} catch(err) {
			next(err);
		}
	},
	post: async (req, res, next) => {
		try {
			let json = req.body;

			let name = json.name;
			let family = json.family;
			let fallback = json.fallback;

			let variants = json.variants.map((variant) => {
				let buffer = Buffer.from(variant.base64, 'base64');

				let type = fileType(buffer);

				if(type && type.ext === 'ttf') {
					let alias = variant.alias;
					let weight = variant.weight;
					let style = variant.style;
					let unicode = variant.unicode;

					let src = name.replace(/\s/gim, '_')+'-'+alias;

					try {
						let woff = ttf2woff(buffer);
						fs.writeFileSync('/app/uploads/'+src+'.woff', buffer, {flag: 'wx'});
					} catch(err) {
						if(err.message.indexOf('EEXIST') > -1) {
							throw new Error('Font '+src+'.woff already exist.');
						} else {
							throw new Error('Error generating '+src+'.woff');
						}
					}

					try {
						let woff = ttf2woff2(buffer);
						fs.writeFileSync('/app/uploads/'+src+'.woff2', buffer, {flag: 'wx'});
					} catch(err) {
						if(err.message.indexOf('EEXIST') > -1) {
							throw new Error('Font '+src+'.woff2 already exist.');
						} else {
							throw new Error('Error generating '+src+'.woff2');
						}
					}

					return {
						alias: alias,
						src: src,
						weight: weight,
						style: style,
						unicode: unicode
					}
				} else {
					throw new Error('Invalid font type.');
				}
			});

			let fontFace = new FontFace({
				name: name,
				family: family,
				fallback: fallback,
				variants: variants
			});

			let data = await fontFace.save();

			res.status(200).json({
				success: true,
				data: data
			});
		} catch(err) {
			if(err.code === 11000 && err.message.indexOf('name') > -1) {
				next(new Error('Font name '+req.body.name+' already exist.'));
			} else if(err.code === 11000 && err.message.indexOf('family') > -1) {
				next(new Error('Email '+req.body.family+' already exist.'));
			} else {
				next(err);
			}
		}
	},
	error: (err, req, res, next) => {
		res.status(400).json({success: false, error: err.message});
	}
}