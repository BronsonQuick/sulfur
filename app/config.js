var app = app || {};

require.config({
	baseUrl: 'app/',
	paths: {
		jquery: '../js/jquery',
		underscore: '../js/underscore',
		backbone: '../js/backbone',
		bootstrap: '../js/bootstrap',
		plupload: '../js/plupload',
		moment: '../js/moment'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});

require( ['app'] );
