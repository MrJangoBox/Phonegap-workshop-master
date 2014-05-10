var app = {

//    Moved to HomeVew class Completely
//    findByName: function() {
//
//        var self = this;
//        this.store.findByName($('.search-key').val(), function(employees) {
//            $('.employee-list').html(self.employeeLiTpl(employees));
//        });

        
//        Inline html previous
//        console.log('findByName');
//        this.store.findByName($('.search-key').val(), function(employees) {
//            var l = employees.length;
//            var e;
//            $('.employee-list').empty();
//            for (var i=0; i<l; i++) {
//                e = employees[i];
//                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' +                   e.lastName + '</a></li>');
//            }
//        });
        
//    },

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title,'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },
    
//    Moved to HomeVew class Completely
//    renderHomeView: function() {
        
//      Inline html
//        var html =
//            "<div class='header'><h1>Home</h1></div>" +
//            "<div class='search-view'>" +
//            "<input class='search-key'/>" +
//            "<ul class='employee-list'</ul>" +
//            "</div>"
        
//        $('body').html(this.homeTpl());
//        $('.search-key').on('keyup', $.proxy(this.findByName, this));
//    },
    
    registerEvents: function() {
        var self = this;
        
        $(window).on('hashchange', $.proxy(this.route, this));
        
        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchstart', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        }
    },
    
    route: function() {
        var self = this;
        var hash = window.location.hash;
        if (!hash) {
            if (this.homePage) {
                this.slidePage(this.homePage);
                StatusBar.backgroundColorByHexString('#CC99FF');
            } else {
                this.homePage = new HomeView(this.store).render();
                this.slidePage(this.homePage);
            }
            return;
        }
        var match = hash.match(app.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                self.slidePage(new EmployeeView(employee).render());
            });
        }
    },
    
    slidePage: function(page) {
 
        var currentPageDest,
            self = this;

        // If there is no current page (app just started) -> No transition: Position new page in the view               port
        if (!this.currentPage) {
            $(page.el).attr('class', 'page stage-center');
            $('body').append(page.el);
            this.currentPage = page;
            return;
        }

        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').not('#homePage').remove();

        if (page === app.homePage) {
            // Always apply a Back transition (slide from left) when we go back to the search page
            $(page.el).attr('class', 'page stage-left');
            currentPageDest = "stage-right";
        } else {
            // Forward transition (slide from right)
            $(page.el).attr('class', 'page stage-right');
            currentPageDest = "stage-left";
        }

        $('body').append(page.el);

        // Wait until the new page has been added to the DOM...
        setTimeout(function() {
            // Slide out the current page: If new page slides from the right -> slide current page to the                   left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });

    },
    
    initialize: function() {
        var self = this;
//        self.showAlert('Store Initialized', 'info');
        this.detailsURL = /^#employees\/(\d{1,})/;
        this.registerEvents();
        
        function onDeviceReady() {
            if (parseFloat(window.device.version) >= 7.0) {
                  document.body.style.marginTop = "20px";
                  // OR do whatever layout you need here, to expand a navigation bar etc
            }
            navigator.splashscreen.hide();
        }

        document.addEventListener('deviceready', onDeviceReady, false);

        this.store = new MemoryStore(function() {
            self.route();
        });
    }
    
//    initialize: function() {
//        var self = this;
//        
//        Compile the two templates, privious
//        this.homeTpl = Handlebars.compile($("#home-tpl").html());
//        this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        
//        this.store = new MemoryStore(function () {
//            Previous
//            self.renderHomeView();
//            self.showAlert('Store Initialized', 'info');
            
//            $('body').html(new HomeView(self.store).render().el);
//        });
//        $('.search-key').on('keyup', $.proxy(this.findByName, this));
//    }
};

app.initialize();