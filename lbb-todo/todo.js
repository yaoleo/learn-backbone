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


	var TodoList = Backbone.Collection.extend({
		model: Todo,

	});

	var Todos = new TodoList;

    console.log(Todos);

    var AppView = Backbone.View.extend({
    	initialize: function(){
    		this.input = this.$("#new-todo");
    		this.allCheckbox = this.$("#toggle-all")[0];
    	},
    });

	var App = new AppView;
})	