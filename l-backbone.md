# backbone

## model层

“Model是js应用的核心，包括基础的数据以及围绕着这些数据的逻辑：数据转换、验证、属性计算和访问控制”。

### 对象的定义
	var Man = Backbone.Model.extend({
		initialize: function(){
			alert('Hey, you create me!');
		}
	});
	var man = new Man;

### 对象的属性
1.定义默认值
	var Man = Backbone.Model.extend({
		initialize: function(){
			alert('Hey, you create me!');
		},
		defaults: {
			name:'张晶尧',
			age: '22'
		}
	});
	var man = new Man;
	alert(man.get('name'));
2.赋值时定义
	var Man = Backbone.Model.extend({
    initialize: function(){
        alert('Hey, you create me!');
    }
	});
	var man = new Man;
	man.set({name:'张晶尧',age:'21'});
	alert(man.get('name'));
属性赋值会覆盖默认值
	var Man = Backbone.Model.extend({
        initialize: function () {
            alert("Hey, you creat me");
        },
        defaults: {
            name: "张晶尧",
            age: "22"
        }
    });
    var man = new Man;
    man.set({ name: "change" });
	alert(man.get("name"));
    alert(man.get("age"));
输出change 22

### 对象的方法

	var Man = Backbone.Model.extend({
		initialize: function(){
			alert('Hey, you create me!');
		},
		defaults: {
			name:'张三',
			age: '38'
		},
		aboutMe: function(){
			return '我叫' + this.get('name') + ',今年' + this.get('age') + '岁';
		}
	});
	var man = new Man;
	alert(man.aboutMe());

### 监听属性的变化
在构造函数中绑定name属性的change的事件。当name发生变化时，就会触发这个事件。

	var Man = Backbone.Model.extend({
		initialize: function(){
			alert('Hey, you create me!');
			//初始化时绑定监听
			this.bind("change:name",function(){
				var name = this.get("name");
				alert("你改变了name属性为：" + name);
			});
		},
		defaults: {
			name:'张晶尧',
			age: '22'
		},
		aboutMe: function(){
			return '我叫' + this.get('name') + ',今年' + this.get('age') + '岁';
		}
	});
	var man = new Man;
	//触发绑定的change事件，alert。
	man.set({name:'change'});

	//触发绑定的change事件，alert。
	man.set({name:'change2'});

### 验证规则 错误提示
	var Man = Backbone.Model.extend({
		initialize: function(){
			alert('Hey, you create me!');
			//初始化时绑定监听, change事件会先于validate发生
			this.bind("change:name",function(){
				var name = this.get("name");
				alert("你改变了name属性为：" + name);
			});
			this.bind("invalid",function(model,error){
				alert(error);
			});
		},
		defaults: {
			name:'张三',
			age: '38'
		},
		validate:function(attributes){
			if(attributes.name == '') {
				return "name不能为空！";
			}
		},
		aboutMe: function(){
			return '我叫' + this.get('name') + ',今年' + this.get('age') + '岁';
		}
	});
	var man = new Man;
	// 这种方式添加错误处理也行
	// man.on('invalid', function(model, error){
	//         alert(error);
	// });

	//默认set时不进行验证
	man.set({name:''});
	//手动触发验证, set时会触发
	//man.set({name:''}, {'validate':true});
	//save时触发验证。根据验证规则，弹出错误提示。
	man.save();

### 和服务器进行交互
?

## Collections
collection是model对象的一个有序的集合，也可以理解为是model的容器。
	var Book = Backbone.Model.extend({
		defaults : {
			title:'default'
		},
		initialize: function(){
			//alert('Hey, you create me!');
		}
	});

	var BookShelf = Backbone.Collection.extend({
		model : Book
	});

	var book1 = new Book({title : 'book1'});
	var book2 = new Book({title : 'book2'});
	var book3 = new Book({title : 'book3'});

	//注意这里面是数组,或者使用add
	//var bookShelf = new BookShelf([book1, book2, book3]);

	var bookShelf = new BookShelf;

	bookShelf.add(book1);
	bookShelf.add(book2);
	bookShelf.add(book3);
	bookShelf.remove(book3);

	//基于underscore这个js库，还可以使用each的方法获取collection中的数据
	bookShelf.each(function(book){
		alert(book.get('title'));
	});

## Router
	var AppRouter = Backbone.Router.extend({
		routes: {
			"*actions" : "defaultRoute"
		},

		defaultRoute : function(actions){
			alert(actions);
		}
	});

	var app_router = new AppRouter;

	Backbone.history.start();
### 传参
<a href="#/posts/120">Post 120</a>
一种是“:”,来把#后面的对应的位置作为参数；
一种是“*”，它可以匹配所有的url，下面再来演练一下。
	var AppRouter = Backbone.Router.extend({

		routes: {
			"posts/:id" : "getPost",
			"*actions" : "defaultRoute"
		},

		getPost: function(id) {
			alert(id);
		},

		defaultRoute : function(actions){
			alert(actions);
		}
	});

	var app_router = new AppRouter;
	Backbone.history.start();

### 手动触发router

