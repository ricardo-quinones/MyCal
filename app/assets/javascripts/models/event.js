GCalClone.Models.Event = Backbone.Model.extend({

  allDay: function () {
    return this.get('all_day');
  },

  startDate: function () {
    return this.get('local_start_date');
  },

  endDate: function () {
    return this.get('local_end_date');
  },

  startYear: function () {
    return this.startDate().getFullYear();
  },

  startMonth: function () {
    return monthNames[this.startDate().getMonth()];
  },

  startDayOfMonth: function () {
    return this.startDate().getDate();
  },

  startTime: function () {
    var hours = this.startDate().getHours() + ":";
    var minutes = this.startDate().getMinutes()
    return (minutes < 10 ? (hours + "0" + minutes) : (hours + minutes));
  },

  endYear: function () {
    this.endDate().getFullYear();
  },

  endMonth: function () {
    return monthNames[this.endDate().getMonth()];
  },

  endDayOfMonth: function () {
    return this.endDate().getDate();
  },

  endTime: function () {
    var hours = this.endDate().getHours() + ":";
    var minutes = this.endDate().getMinutes()
    return (minutes < 10 ? (hours + "0" + minutes) : (hours + minutes));
  },

  dayId: function () {
    return this.startYear() + "-" + this.startMonth() + "-" + this.startDayOfMonth();
  },

  timeRange: function () {
    return this.startTime() + " - " + this.endTime()
  }
});