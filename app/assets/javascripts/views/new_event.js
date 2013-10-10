GCalClone.Views.NewEvent = Backbone.View.extend({

  template: JST["events/new"],

  initialize: function() {
    var self = this;
    var renderCallback = self.render.bind(self)

    self.listenTo(self.collection, 'add', renderCallback);
  },

  events: {
    "click #create-event": "create"
  },

  render: function () {
    var self = this;
    self.$el.html(self.template({ eventsCal: self.options.calendar }));

    return self;
  },

  create: function(event) {
    var self = this;
    event.preventDefault();

    var formData = $(event.target.form).serializeJSON();
    this.convertDates(formData.cal_event)

    self.collection.create(formData, {
      success: function (response) {
        Backbone.history.navigate("#/");
      },
      error: function (response) {
        console.log(response);
      }
    });
  },

  convertDates: function (calEvent) {
    var start_date = calEvent.start_date;
    var end_date = calEvent.end_date;

    calEvent["start_date"] = new Date(
      start_date.date + " " + start_date.time + " +0000"
    ).toUTCString();

    calEvent["end_date"] = new Date(
      end_date.date + " " + end_date.time + " +0000"
    ).toUTCString();
  }
});