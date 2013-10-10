GCalClone.Views.CalendarsAgenda = Backbone.View.extend({

  template: JST['calendars/agenda'],

  initialize: function () {
    var self = this;

    var renderCallback = self.render.bind(self)

    self.listenTo(self.collection, 'add', renderCallback);
    self.listenTo(self.collection, 'change', renderCallback);
    self.listenTo(self.collection, 'remove', renderCallback);
  },

  render: function () {
    self = this;
    self.$el.empty();

    self.$el.append(JST['calendars/nav']());

    $sidebar = $("<section>").attr("id", "sidebar")
    var calendarsSidebarTopView = new GCalClone.Views.CalendarsSidebarTop({
      collection: self.options.myCalendars
    });
    var calendarsSidebarBottomView = new GCalClone.Views.CalendarsSidebarBottom({
      collection: self.options.subscribedCalendars
    });

    $sidebar
      .append(calendarsSidebarTopView.render().$el)
      .append(calendarsSidebarBottomView.render().$el)

    self.$el.append($sidebar)
    self.$el.append(self.renderAgendaItems());

    return self;
  },

  renderAgendaItems: function () {
    self = this;
    $agenda = $('<section>').attr("id", "calendar-view");

    self.collection.each(function (calEvent) {
      if (calEvent.startDate() > currentDate()) {
        var dayId = calEvent.dayId()
        var doesntHaveTag = ($agenda.find("#" + dayId).length == 0)

        if (doesntHaveTag) {
          $agenda.append(JST['calendars/agenda/new_day']({
            dayId: dayId,
            calEvent: calEvent
          }));
        }
        else {
          if (calEvent.allDay()) {
            $agenda
              .find("#" + dayId + " .all-day-events")
              .append(JST['calendars/agenda/all_day_event']({
                calEvent: calEvent
            }));
          }
          else {
            $agenda
              .find("#" + dayId + " .events")
              .append(JST['calendars/agenda/new_event']({
                calEvent: calEvent
            }));
          };
        };
      }
    });

    return $agenda;
  }
});