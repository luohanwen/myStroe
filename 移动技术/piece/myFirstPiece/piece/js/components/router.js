define(['backbone'], function(Backbone){
    var CubeRouter = Backbone.Router.extend({

        stack: [],
        currentPageEL: null,

        initialize: function(options){
            if(options)this.delegate = options.delegate;
            // this.route("com.foss.bb/*actions(?t=:type)", this.defaultRoute);
        },

        //TODO: 
        defaultRoute: function(actions, type){
            var page = require(this.module + '/' + (actions === null ? '' : actions));
            this.delegate.changePage(new page());
        },

        //override for support modular
        _bindRoutes: function() {
          if (!this.routes) return;
          this.routes = _.result(this, 'routes');
          var route, routes = _.keys(this.routes);
          while ((route = routes.pop()) != null) {
            //suport for modular
            if (this.module) {
                var modularRoute = this.module + '/' + route;
                console.log('add route: ' + modularRoute + ' / ' + this.routes[route]);
                this.route(modularRoute, this.routes[route]);
            } else {
                console.log('add route: ' + route + ' / ' + this.routes[route]);
                this.route(route, this.routes[route]);
            }
          }
        },

        _modularFragment: function(fragment){
            /*modular support*/
            //this is a modular view(depends on the router), and the navigation path not start with slash,
            //we append module id in front of it
            if (this.module && fragment[0] !== '/') {
                fragment = this.module + '/' + fragment;
            //this is a modualr view, start with slash, means that your are using absolute path, 
            //so we don't append module id, but remove the slash
            } else if (this.module) {
                fragment = fragment.substring(1);
            }
            return fragment;
        },

        changePage: function(newPage){
            if (this.module) newPage.module = this.module;

            if('beforeRender' in newPage) newPage.beforeRender();
            var pageEl = newPage.render().el;
            if('afterRender' in newPage) newPage.afterRender();

            //we use a class variable 'currentPage' here to save the current page object
            //we want this variable can using across router instances, that why we use class variable
            if(CubeRouter.currentPage) CubeRouter.currentPage.remove();
            document.body.appendChild(pageEl);
            CubeRouter.currentPage = newPage;
            if(CubeRouter.stack)
                CubeRouter.stack.push(newPage);

            //deprecated
            if('onShow' in newPage) newPage.onShow();
        },

        navigate: function(page, options){
            if (options.replace) {this.changePage(page);}
        },

        slide: function(newPage, enter){
            var me = this;

            var pageEl = newPage.render().el;

            //1. prepare new page
            pageEl.classList.add(enter ? 'right' : 'left');
            pageEl.classList.add('slide');
            this.currentPageEL.classList.add('slide');

            //2. insert page
            document.body.insertBefore(pageEl, this.currentPageEL);

            //3. transition
            pageEl.addEventListener('webkitTransitionEnd', function(){
                pageEl.removeEventListener('webkitTransitionEnd', this);

                me.currentPageEL.parentNode.removeChild(me.currentPageEL);

                pageEl.classList.remove('slide');
                pageEl.classList.remove(enter ? 'right' : 'left');

                me.currentPageEL.offsetWidth;
            });

            this.currentPageEL.offsetWidth;
            this.currentPageEL.classList.add(enter ? 'left' : 'right');
            pageEl.classList.remove(enter ? 'right' : 'left');
        },

        push: function(newPage){
            this.slide(newPage, true);
            this.stack.push(newPage);
        },

        pop: function(newPage){
            this.slide(newPage, false);
            this.stack.pop(newPage);
        }
    });

    return CubeRouter;
});