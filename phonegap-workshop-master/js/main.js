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
    
    initialize: function() {
        var self = this;
        self.showAlert('Store Initialized', 'info');
        this.store = new MemoryStore(function() {
            $('body').html(new HomeView(self.store).render().el);
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