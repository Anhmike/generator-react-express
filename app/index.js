'use strict';

var assign = require('object-assign');
var chalk = require('chalk');
var speakingurl = require('speakingurl');
var yeoman = require('yeoman-generator');

var ReactExpressGenerator = yeoman.generators.Base.extend({

	initializing: function() {
		this.pkg = require('../package.json');
	},

	prompting: function() {
		var done = this.async();

		this.log(
			'\n' + chalk.bold.underline('Welcome to the React + Express project generator') +
			'\n' +
			'\nWe\'re going to set up a new project with ' + chalk.bold('ReactJS') + ' for the client,' +
			'\n' + chalk.bold('express') + ' for the server, and include ' + chalk.bold('react-router') + ' and ' + chalk.bold('Bootstrap') + '.' +
			'\n'
		);

		var prompts = [{
			type: 'input',
			name: 'projectName',
			message: 'First, what is the name of your project?',
			default: 'My React Project'
		}, {
			type: 'confirm',
			name: 'createDirectory',
			message: 'Would you like to create a new directory for your project?',
			default: true
		}];

		this.prompt(prompts, function (props) {
			this.log('\n');
			assign(this, props);
			this.projectKey = speakingurl(this.projectName);
			if (props.createDirectory) {
				this.destinationRoot(this.projectKey);
			}
			done();
		}.bind(this));
	},

	writing: {
		project: function () {
			this.copy('server.js', 'server.js');
			this.copy('editorconfig', '.editorconfig');
			this.copy('gitignore', '.gitignore');
			this.template('_package.json', 'package.json');
		},

		clientfiles: function() {
			this.copy('client/config.js', 'client/config.js');
			this.template('client/scripts/_index.js', 'client/scripts/index.js');
			this.directory('client/routes', 'client/routes');
		},

		serverfiles: function() {
			this.template('server/templates/views/_index.html', 'server/templates/views/index.html');
		},

		publicfiles: function() {
			this.directory('public', 'public');
		}
	},

	install: function () {
		this.npmInstall();
	},

	end: function() {
		var chdir = this.createDirectory ? '"cd ' + this.projectKey + '" then ' : '';
		this.log(
			'\n' + chalk.green.underline('Your new React + Express project is ready!') +
			'\n' +
			'\nYour React app is in /client and your express app is in /server.' +
			'\n' +
			'\nAnything you place in /public will be served as static assets.' +
			'\n' +
			'\nType ' + chdir + '"npm start" to start the server.' +
			'\n'
		);
	}

});

module.exports = ReactExpressGenerator;
