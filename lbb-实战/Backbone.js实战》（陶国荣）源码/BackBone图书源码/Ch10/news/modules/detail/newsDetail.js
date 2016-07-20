define(['jquery', 'underscore', 'backbone', 'text!modules/detail/newsDetailView.html'], function ($, _, Backbone, detailViewTemplate) {
    var detailView = Backbone.View.extend({
        template: _.template(detailViewTemplate),
        initialize: function () {
            this.model.bind('GetDetail:Detail', this.render, this);
        },
        render: function () {
            $(this.el).append(this.template(this.model.toJSON()));
            this.trigger("renderDetail:Detail", this, "");
            return this;
        }
    });
    return detailView;
});