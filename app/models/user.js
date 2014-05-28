define([
	'jquery',
	'underscore',
	'backbone'
], function( $, _, Backbone ) {
	app.userModel = Backbone.Model.extend( {
		url: 'http://vagrant.local/wp-json/users/me'
	} );

	return app.userModel;
} );