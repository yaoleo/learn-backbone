$(function (){
	
	//model
	var Todo = Backbone.Model.extend ({
		defaults: function(){
			return {
				title: "empty todo...",
				done: false,
			}
		}
	});

	//collection
	var TodoList = Backbone.Collection.extend({
		model: Todo,
	});

	var Todos = new TodoList;

	//view

	var TodoView = Backbone.View.extend({
		template: _.template($('#item-template').html()),

		events: {

		},

		initialize: function(){
			this.listenTo(this.model, 'change', this.render);
		},

		render: function(){
			this.$el.html("ASDF");
			alert("af");
		},

	}); 
})	