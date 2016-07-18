# backbone

## model��

��Model��jsӦ�õĺ��ģ����������������Լ�Χ������Щ���ݵ��߼�������ת������֤�����Լ���ͷ��ʿ��ơ���

### ����Ķ���
	var Man = Backbone.Model.extend({
		initialize: function(){
			alert('Hey, you create me!');
		}
	});
	var man = new Man;

### ���������
1.����Ĭ��ֵ
	var Man = Backbone.Model.extend({
		initialize: function(){
			alert('Hey, you create me!');
		},
		defaults: {
			name:'�ž�Ң',
			age: '22'
		}
	});
	var man = new Man;
	alert(man.get('name'));
2.��ֵʱ����
	var Man = Backbone.Model.extend({
    initialize: function(){
        alert('Hey, you create me!');
    }
	});
	var man = new Man;
	man.set({name:'�ž�Ң',age:'21'});
	alert(man.get('name'));
���Ը�ֵ�Ḳ��Ĭ��ֵ
	var Man = Backbone.Model.extend({
        initialize: function () {
            alert("Hey, you creat me");
        },
        defaults: {
            name: "�ž�Ң",
            age: "22"
        }
    });
    var man = new Man;
    man.set({ name: "change" });
	alert(man.get("name"));
    alert(man.get("age"));
���change 22

### ����ķ���

	var Man = Backbone.Model.extend({
		initialize: function(){
			alert('Hey, you create me!');
		},
		defaults: {
			name:'����',
			age: '38'
		},
		aboutMe: function(){
			return '�ҽ�' + this.get('name') + ',����' + this.get('age') + '��';
		}
	});
	var man = new Man;
	alert(man.aboutMe());

### �������Եı仯
�ڹ��캯���а�name���Ե�change���¼�����name�����仯ʱ���ͻᴥ������¼���

	var Man = Backbone.Model.extend({
		initialize: function(){
			alert('Hey, you create me!');
			//��ʼ��ʱ�󶨼���
			this.bind("change:name",function(){
				var name = this.get("name");
				alert("��ı���name����Ϊ��" + name);
			});
		},
		defaults: {
			name:'�ž�Ң',
			age: '22'
		},
		aboutMe: function(){
			return '�ҽ�' + this.get('name') + ',����' + this.get('age') + '��';
		}
	});
	var man = new Man;
	//�����󶨵�change�¼���alert��
	man.set({name:'change'});

	//�����󶨵�change�¼���alert��
	man.set({name:'change2'});

### ��֤���� ������ʾ
	var Man = Backbone.Model.extend({
		initialize: function(){
			alert('Hey, you create me!');
			//��ʼ��ʱ�󶨼���, change�¼�������validate����
			this.bind("change:name",function(){
				var name = this.get("name");
				alert("��ı���name����Ϊ��" + name);
			});
			this.bind("invalid",function(model,error){
				alert(error);
			});
		},
		defaults: {
			name:'����',
			age: '38'
		},
		validate:function(attributes){
			if(attributes.name == '') {
				return "name����Ϊ�գ�";
			}
		},
		aboutMe: function(){
			return '�ҽ�' + this.get('name') + ',����' + this.get('age') + '��';
		}
	});
	var man = new Man;
	// ���ַ�ʽ��Ӵ�����Ҳ��
	// man.on('invalid', function(model, error){
	//         alert(error);
	// });

	//Ĭ��setʱ��������֤
	man.set({name:''});
	//�ֶ�������֤, setʱ�ᴥ��
	//man.set({name:''}, {'validate':true});
	//saveʱ������֤��������֤���򣬵���������ʾ��
	man.save();

### �ͷ��������н���
?

## Collections
collection��model�����һ������ļ��ϣ�Ҳ�������Ϊ��model��������
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

	//ע��������������,����ʹ��add
	//var bookShelf = new BookShelf([book1, book2, book3]);

	var bookShelf = new BookShelf;

	bookShelf.add(book1);
	bookShelf.add(book2);
	bookShelf.add(book3);
	bookShelf.remove(book3);

	//����underscore���js�⣬������ʹ��each�ķ�����ȡcollection�е�����
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
### ����
<a href="#/posts/120">Post 120</a>
һ���ǡ�:��,����#����Ķ�Ӧ��λ����Ϊ������
һ���ǡ�*����������ƥ�����е�url��������������һ�¡�
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

### �ֶ�����router

