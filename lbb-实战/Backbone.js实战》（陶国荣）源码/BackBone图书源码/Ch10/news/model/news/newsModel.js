define(function () {
    var News = Backbone.Model.extend({
        defaults: {
            id: "",
            title: '',
            clsname: '',
            desc: ''
        },
        fetch: function (id) {
            var self = this;
            var tmpNews;
            var jqxhr = $.getJSON("data/" + id + ".json")
              .success(function (data, status, xhr) {
                  self.set({ id: data.id, title: data.title, clsname: data.clsname, desc: data.desc });
                  self.trigger("GetDetail:Detail");
              })
        }
    });
    return News;
});