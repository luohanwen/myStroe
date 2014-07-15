define(['zepto', 'backbone', 'core/mainview', 'core/cocrouter'], function($, Backbone, MainView, CoCRouter) {

  var init = function(options) {

    var mainview = new MainView();

    var router = new CoCRouter({
      delegate: mainview
    });

    var rootPath = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
    console.info("cube---app---start watch history, rootPath: " + rootPath);
    Backbone.history.start({
      pushState: false,
      root: rootPath
    });

    $("#appLoadingIndicator").remove();
    $("body,html").css('background-color', 'white');
  };

  return {
    initialize: init
  };
  
});