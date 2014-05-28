define([
	'jquery',
	'underscore',
	'backbone',
	'models/file'
], function( $, _, Backbone ) {
	app.filelistCollection = Backbone.Collection.extend( {
		model: app.fileModel,
		found: 0,

		url: function () {
			return 'http://vagrant.local/wp-json/media/';
		},

		initialize: function () {
			this.fetch( { remove: false } ).done( _.bind( function() {
				this.trigger( 'fetched' );
			}, this ) );
		},

		parse: function ( response ) {
			this.found = response.length;
			return response;
		}
	} );

	return app.filelistCollection;
});