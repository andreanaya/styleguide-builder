const express = require('express');
const router = express.Router();

const FontFace = require('/app/controllers/FontFace.js');

router.get('/', function (req, res) {
	res.send('ok2')
})

router.route('/fontface')
	.get(FontFace.get, FontFace.error)
	.post(FontFace.post, FontFace.error);

module.exports = router;