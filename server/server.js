const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');
const handlebars = require('handlebars');
const helpers = require('/app/views/helpers.js');

mongoose.connect('mongodb://mongo:27017/style-builder');

let basedir = path.resolve('/app/views');

const readFiles = (cwd, dir, ignore) => {
	let files = [];

	fs.readdirSync(dir).forEach(file => {
		let filePath = dir+'/'+file;
		if(fs.statSync(filePath).isDirectory()) {
			readFiles(cwd, filePath, ignore);
		} else if(file.indexOf('hbs') != -1) {
			let path = filePath.substr(cwd.length+1);

			if(!ignore || ignore.indexOf(path) == -1) {
				console.log(path)
				handlebars.registerPartial(path, fs.readFileSync(filePath, 'utf8'));
			}
		}
	});

	return files;
}

readFiles(basedir, basedir, ['base.hbs']);

app.engine('hbs', function (filePath, options, callback) {
	let template = handlebars.compile(fs.readFileSync(filePath, 'utf8'));

	return callback(null, template(options));
});

app.set('views', '/app/views');
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
	res.status(200).render('base.hbs', {
		template: 'layouts/home.hbs',
		data: {
			title: `Styleguide!`,
			intro: `Lets's get started.`
		}
	});
});

const privateKey = fs.readFileSync(process.env.PRIVATE_KEY, 'utf8');
const certificate = fs.readFileSync(process.env.CERTIFICATE, 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate
};

http.createServer(app).listen(2000);
https.createServer(credentials, app).listen(3000);