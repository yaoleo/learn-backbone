require.config({
    paths: {
        jquery: 'script/jqm/jquery-1.8.2.min',
        jqmconfig: 'plugin/jqm.config',
        jqm: 'script/jqm/jquery.mobile-1.1.0.min',
        underscore: 'script/underscore/underscore-amd',
        backbone: 'script/backbone/backbone-amd',
        text: 'plugin/text',
        plugin: 'plugin',
        templates: '../templates',
        modules: '../modules',
        model: '../model'
    }
});
require(['app'], function (app) {
    app.initialize();
});