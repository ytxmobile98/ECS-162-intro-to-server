"use strict";

const Palindrome = require("./palindrome.js");

const myServer = new (function () {
	
	const root = "./public/";
	const homePage = "palindrome.html";
	
	const express = require('express');
	const port = 55776; // use your own server port
	
	Object.defineProperty(this, "queryHandler", {
		value: function (req, res, next) {
			let url = req.url;
			let qObj = req.query;
			console.log(qObj);
			if (qObj.animal != undefined) {
				res.json({"beast" : qObj.animal});
			}
			else {
				next();
			}
		}
	});
	
	Object.defineProperty(this, "fileNotFound", {
		value: function (req, res) {
			const url = req.url;
			res.type('text/plain');
			res.status(404);
			res.send('Cannot find '+ url);
		}
	});
	
	// put together the server pipeline
	Object.defineProperty(this, "app", {
		value: express(),
	});
	
	this.app.use(express.static(root, {index: homePage}));  // can I find a static file? 
	this.app.get('/query', this.queryHandler );   // if not, is it a valid query?
	this.app.use(this.fileNotFound);            // otherwise not found
	
	this.app.listen(port, function () {
		console.log('Listening...');
		console.log(`Server running at http://localhost:${port}/`);
	});

})();

