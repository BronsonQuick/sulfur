var app = app || {};

require([
	'jquery',
	'underscore',
	'backbone',
	'router'
], function( $, _, Backbone, Router ) {

	// Pass the auth details when we do a request.
	$.ajaxSetup({
		beforeSend: function( xhr ) {
				var basicAuth = btoa('admin:password');
				xhr.setRequestHeader('Authorization', 'Basic ' + basicAuth);
		}
	});

	// Init the router.
	app.router = new app.Router();
	Backbone.history.start();

	return app;
});