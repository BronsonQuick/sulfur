define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'models/file'
], function( $, _, Backbone ) {
	app.singleView = Backbone.View.extend( {
		id		 : 'single',
		model 	 : app.fileModel,
		template : _.template( $( '#single-template' ).html() ),

		events: {
			'click .btn-danger': 'confirmDelete',
			'click .close': 'closeModal'
		},

		initialize: function() {
			this.model.fetch();
			this.listenTo( this.model, 'change', _.bind( this.renderImageData, this ) );
		},

		render: function() {
			var that = this;

			this.$el.html(
				this.template( this.model.defaults )
			).find( '.modal' )
				.modal( 'show' );

			return this;
		},

		renderImageData: function() {
			var data = this.model.attributes;
			data.preview = this.model.getPreview();

			this.$el.html(
				this.template( data )
			).find( '.modal' )
				.modal( { backdrop: false } )
				.find( '#modal-image' )
					.html( '<img src="' + data.preview + '?w=500">' );
		},

		closeModal: function() {
			// Remove modal completely
			this.$el.find( '.modal' ).modal( 'hide' );
			$( '.modal-backdrop' ).remove();

			app.router.navigate( 'media', { trigger: true } );
		},

		confirmDelete: function() {
			if ( confirm( 'Are you sure you want to delete this image?' ) ) {
				this.$el.find( '.modal' ).modal( 'hide' );
				if ( app.filelistViewInstance )
					app.filelistViewInstance.trigger( 'destroyedModel', this.model );

				this.model.destroy( {
					success: function( model, response ) {
						app.router.navigate( 'media', { trigger: true } );
					}
				} );
			}

			return false;
		}
	} );

	return app.singleView;
} );
