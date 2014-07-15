/**
 * act as controller of controller
 * act as router delegate
 */
define(['backbone', 'underscore'], function(Backbone, _) {

  return Backbone.View.extend({
    el: 'body',
    currentView: null,
    stack: [],
    animated: false,

    changePage: function(newView, module) {
      //remove dom
      $("body").html("");

      if (module && !newView.module) newView.module = module;

      //inject self to the new view
      newView.container = this;

      var pageEl = newView.render().el;

      if (this.currentView) this.currentView.remove();

      document.body.appendChild(pageEl);
      this.currentView = newView;

      if ('onShow' in newView) newView.onShow();
    },

    slideIn: function(newView) {

      var me = this;

      var pageEl = newView.render().el;
      var lastView = _.last(this.stack);

      if (this.animated) {
        $(pageEl).css('position', 'absolute');
        $(pageEl).css('width', '100%');

        //1. prepare new page
        pageEl.classList.add('right');
        pageEl.classList.add('slide');

        lastView.el.classList.add('slide');
      }

      //2. insert page
      document.body.insertBefore(pageEl, lastView.el);


      //3. transition
      if (this.animated) {
        var removePageElEvent = function() {
          lastView.el.classList.add('slide');
          pageEl.classList.remove('slide');
          $(pageEl).css('position', 'static');
          $(lastView.el).hide();
          pageEl.removeEventListener('webkitTransitionEnd', removePageElEvent, false);
        };

        pageEl.addEventListener('webkitTransitionEnd', removePageElEvent, false);

        lastView.el.offsetWidth;
        lastView.el.classList.add('left');
        pageEl.classList.remove('right');
      } else {
        $(lastView.el).hide();
      }
    },

    slideOut: function() {
      var me = this;

      var pageEl = _.last(this.stack).el;
      var lastView = this.stack[this.stack.length - 2];
      $(lastView.el).show();

      if (this.animated) {
        lastView.el.offsetWidth;
        pageEl.classList.add('slide');

        $(lastView.el).css('position', 'fixed');
        $(lastView.el).css('top', '0px');
        $(lastView.el).css('width', '100%');

        //3. transition
        var removePageElEvent = function() {
          $(lastView.el).css('position', 'static');
          lastView.el.classList.remove('slide');
          $(pageEl).remove();
          lastView.el.offsetWidth;
          pageEl.removeEventListener('webkitTransitionEnd', removePageElEvent, false);
        };

        lastView.el.addEventListener('webkitTransitionEnd', removePageElEvent, false);

        lastView.el.offsetWidth;
        pageEl.classList.add('right');
        lastView.el.classList.remove('left');

      } else {
        $(pageEl).remove();
      }
    },

    push: function(newView) {
      this.slideIn(newView);
      this.stack.push(newView);
      if ('onShow' in newView) newView.onShow();
    },

    pop: function() {
      this.slideOut();
      this.stack.pop(_.last(this.stack));
    },

    navigateForResult: function(fragment, options, backFragment, callback) {
      //argument shift
      // if (typeof options === 'string') {options = undefined; callback = options;}

      this.backFragment = backFragment;
      this.callback = callback;

      Backbone.history.navigate(fragment, options);
    },

    navigateBack: function() {
      var me = this;
      Backbone.history.once('route', function(router, name, args) {
        // var path = _.invert(router.routes)[name];
        // path = router._modularFragment(path);
        me.callback.call(me.currentPage, me.navigateBackParams);
      });

      this.navigateBackParams = arguments;
      Backbone.history.navigate(this.backFragment, {
        trigger: true
      });
    }
  });
});