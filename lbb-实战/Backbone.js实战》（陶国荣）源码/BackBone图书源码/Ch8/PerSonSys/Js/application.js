(function ($) {
    $(document).ready(function () {
        //构建人员资料信息数据模块类
        var Person = Backbone.Model.extend({
            defaults: {
                name: '',
                sex: '',
                email: ''
            },
            search: function (key) {
                if (typeof (key) === 'undefined' || key === null || key === '') return true;
                key = key.toLowerCase();
                return this.get('name').toLowerCase().indexOf(key) != -1 || this.get('email').toLowerCase().indexOf(key) != -1;
            }
        });
        //构建基于模块类的集合类并指定数据缓存对象
        var Persons = Backbone.Collection.extend({
            model: Person,
            localStorage: new Store('person-data')
        });
        //构建“姓名”列表中单个选项的视图
        var PersonItemView = Backbone.View.extend({
            className: 'item',
            template: _.template($('#tpl-item').html()),
            events: {
                'click': 'select'
            },
            initialize: function () {
                _.bindAll(this, 'select');
                this.model.bind('reset', this.render, this);
                this.model.bind('change', this.render, this);
                this.model.bind('destroy', this.remove, this);
                if (this.model.view) this.model.view.remove();
                this.model.view = this;
            },
            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            select: function () {
                appRouter.navigate('person/' + this.model.cid, {
                    trigger: true
                });
            },
            sele: function () {
                this.$el.addClass('sele');
            },
            desele: function () {
                this.$el.removeClass('sele');
            }
        });
        //构建顶部搜索和新建人员信息的视图类
        var TopView = Backbone.View.extend({
            className: 'top',
            template: _.template($('#tpl-top').html()),
            events: {
                'click footer button': 'create',
                'keyup input': 'search'
            },
            initialize: function () {
                _.bindAll(this, 'create', 'search');
                this.model.bind('reset', this.renderAll, this);
                this.model.bind('add', this.add, this);
                this.model.bind('remove', this.remove, this);
            },
            render: function () {
                $(this.el).html(this.template());
                this.renderAll();
                return this;
            },
            renderAll: function () {
                this.$(".items").empty();
                console.log(this);
                this.model.each(this.renderOne, this);
                this.search();
            },
            renderOne: function (contact) {
                var view = new PersonItemView({
                    model: contact
                });
                this.$(".items").append(view.render().el);
            },
            create: function () {
                var contact = new Person();
                this.model.add(contact);
                appRouter.navigate('person/' + contact.cid + '/edit', {
                    trigger: true
                });
            },
            search: function () {
                var key = $('input', this.el).val();
                this.model.each(function (contact, element, index, list) {
                    contact.view.$el.toggle(contact.search(key));
                });
            },
            sele: function (item) {
                if (this.seleItem) this.seleItem.view.desele();
                this.seleItem = item;
                if (this.seleItem) this.seleItem.view.sele();
            },
            add: function (contact) {
                this.renderOne(contact);
            },
            remove: function (contact) {
                console.log(contact.cid);
            }
        });
        //构建用于显示个人资料详细页的视图类
        var ShowView = Backbone.View.extend({
            className: 'show',
            template: _.template($('#tpl-show').html()),
            events: {
                'click .edit': 'edit'
            },
            initialize: function () {
                _.bindAll(this, 'edit');
            },
            render: function () {
                if (this.item) this.$el.html(this.template(this.item.toJSON()));
                return this;
            },
            change: function (item) {
                this.item = item;
                this.render();
            },
            edit: function () {
                if (this.item) appRouter.navigate('person/' + this.item.cid + '/edit', {
                    trigger: true
                });
            }
        });
        //构建用于编辑个人资料信息的视图类
        var EditView = Backbone.View.extend({
            className: 'edit',
            template: _.template($('#tpl-edit').html()),
            events: {
                'click .save': 'submit',
                'click .dele': 'remove'
            },
            initialize: function () {
                _.bindAll(this, 'submit', 'remove');
            },
            render: function () {
                if (this.item) this.$el.html(this.template(this.item.toJSON()));
                return this;
            },
            change: function (item) {
                this.item = item;
                this.render();
            },
            submit: function () {
                this.item.set(this.form());
                this.item.save();
                appRouter.navigate('person/' + this.item.cid, {
                    trigger: true
                });
                return false;
            },
            form: function () {
                return {
                    name: this.$('#name').val(),
                    email: this.$('#email').val(),
                    sex: this.$('#sex').val()
                };
            },
            remove: function () {
                this.item.destroy();
                this.item = null;
                appRouter.navigate('', {
                    trigger: true
                });
            }
        });
        //构建包含显示和编辑视图对象的主视图类
        var MainView = Backbone.View.extend({
            className: 'main unact',
            initialize: function () {
                this.editView = new EditView();
                this.showView = new ShowView();
            },
            render: function () {
                this.$el.append(this.showView.render().el);
                this.$el.append(this.editView.render().el);
                return this;
            },
            edit: function (item) {
                this.showView.$el.removeClass('sele');
                this.editView.$el.addClass('sele');
                this.editView.change(item);
            },
            show: function (item) {
                this.editView.$el.removeClass('sele');
                this.showView.$el.addClass('sele');
                this.showView.change(item);
            }
        });
        //构建整个页面展示的视图类，包含顶部和主视图两个对象
        var AppView = Backbone.View.extend({
            className: 'person',
            initialize: function () {
                this.top = new TopView({
                    model: this.model
                });
                this.main = new MainView();
                this.model.fetch();
                this.render();
            },
            render: function () {
                this.$el.append(this.top.render().el);
                this.$el.append(this.main.render().el);
                $('#info').append(this.el);
                return this;
            },
            show: function (item) {
                this.top.sele(item);
                this.main.show(item);
            },
            edit: function (item) {
                this.top.sele(item);
                this.main.edit(item);
            }
        });
        //构建路由导航类，根据不同Hash执行对应方法
        var AppRouter = Backbone.Router.extend({
            routes: {
                '': 'show',
                'person/:id': 'show',
                'person/:id/edit': 'edit'
            },
            show: function (id) {
                if (id != undefined) {
                    appView.show(this.getPerson(id));
                } else {
                    appView.show(person.first());
                }
            },
            edit: function (id) {
                appView.edit(this.getPerson(id));
            },
            getPerson: function (id) {
                return person.get(id);
            }
        });
        var person = new Persons();
        //实例化一个整体页面视图对象，启动各个数据绑定和渲染功能
        window.appView = new AppView({
            model: person
        });
        //实例化一个路由导航对象
        window.appRouter = new AppRouter();
        //开启路由导航功能
        Backbone.history.start();
    });
})(jQuery);