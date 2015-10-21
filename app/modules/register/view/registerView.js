define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Model = require("modules/register/model/registerModel"),
        View = CMS.View.extend({

            el: "#CrsMSContainer",

            initialize: function() {
                this.model = new Model();
                this.listenTo(this.model, "invalid", function (model, error) {
                    this.showErrors(model, error);
                });
            },

            serialize: function () {
                return {model : this.model};
            },

            afterRender: function () {
                this.$el.find(".error-message").addClass("hidden");
            },

            template: _.template( require("text!../template/registerTemplate.html") ),

			events: {
				'click #submit': "submitClicked"
			},

			submitClicked: function(e) {
				e.preventDefault();

                var feedback = {
                	name: this.$el.find('#name').val(),
                	surname: this.$el.find('#surname').val(),
                	email: this.$el.find('#email').val(),
                	pass: this.$el.find('#pass').val(),
                	repeatPass: this.$el.find('#repeatPass').val()
                };

                this.hideErrors();
                this.model.set( feedback, {validate: true} );
			},

			showErrors: function(model, errors) {
                _.each(errors, function (error) {
                    this.$el.find('.' + error).addClass('error');
                    // to be modified: controlGroup.find('.help-inline').text(error.message);
                }, this);
                this.$el.find(".warning").addClass("hidden");
                this.$el.find( ".error-message" ).removeClass( "hidden" );
            },

            hideErrors: function () {
                this.$el.find('.error-message').addClass('hidden');
                this.$el.find(".input-group").removeClass("error");
                // to be modified: this.$('.help-inline').text('');
            }
        });

    return View;
});