define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'collections/filelist',
	'models/file',
	'views/userdetails',
	'views/header',
	'views/file',
	'views/filelist',
	'views/picker',
	'views/single',
], function( $, _, Backbone, Router ) {

	app.Router = Backbone.Router.extend( {
		currentViews: [],

		routes: {
			'': 						'home',
			'm': 						'home',
			'logout': 					'logout',
			'view/:id':					'viewSingleItem'
		},

		home: function() {
			if ( app.filelistViewInstance ) {
				return;
			}

			// So we access this instance in the uploader.
			app.filelistViewInstance = new app.filelistView();

			this.renderViews( [
				new app.headerView(),
				new app.pickerView(),
				app.filelistViewInstance
			] );
		},

		logout: function() {
			app.auth = {};
			localStorage.removeItem( 'access_token' );
			localStorage.removeItem( 'site_id' );

			this.navigate( 'authorize', { trigger: true, replace: true } );
		},

		viewSingleItem: function ( id ) {
			// Remove existing single view items.
			if ( app.singleItemViewInstance ) {
				app.singleItemViewInstance.remove();
			}

			var singleItem = new app.fileModel( { id: id } );

			singleItem.fetch().done( _.bind( function () {
				app.singleItemViewInstance = new app.singleView( { model: singleItem } );

				this.renderViews( [
					app.singleItemViewInstance
				], false );
			}, this ) );
		},

		renderViews: function ( views, removeCurrentViews ) {
			// Remove any current views
			if ( _.isUndefined( removeCurrentViews ) && this.currentViews.length ) {
				$.each( this.currentViews, function ( i, view ) {
					if ( typeof view.remove == 'function' ) {
						view.remove();
					}
				} );
			}

			if ( !views ) {
				return false;
			}

			$.each( views, _.bind( function ( i, view ) {
				var el = view.render().el;

				$( '#main' ).append( el );

				this.currentViews.push( view );
			}, this ) );

			return this;
		}
	} );

	return app.Router;
});