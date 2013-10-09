GCalClone.Views.UserSettings = Backbone.View.extend({

  template: JST['users/settings'],

  events: {
    'click #update-user': 'update'
  },

  render: function () {
    var self = this;
    var auth_token = $('meta[name=\"csrf-token\"').attr("content");

    self.$el.html(self.template({
      user: this.model,
      auth_token: auth_token
    }));

    return self;
  },

  update: function (event) {
    var self = this;
    event.preventDefault();

    var formData = $(event.target).parent().serializeJSON();
    self.model.save(formData, {
      patch: true,
      success: function (response) {
        Backbone.history.navigate("/#");
      },
      error: function (response) {
        console.log(response);
      }
    });
  }
});
