define(['jquery', 'underscore', 'backbone', 'model/news/newsModel'], function ($, _, Backbone, News) {
    var Newss = Backbone.Collection.extend({
        model: News,
        fetch: function () {
            var self = this;
            var tmpNews;
            var jqxhr = $.getJSON("data/data.json")
              .success(function (data, status, xhr) {
                  $.each(data, function (i, item) {
                      tmpNews = new News({ id: item.id, title: item.title });
                      self.add(tmpNews);
                  });
                  self.trigger("GetList:list");
              })
        }
    });
    return Newss;
});