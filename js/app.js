//Initialization
$(document).ready(function() {
    var navView = new NavView('#navBar');
});

/****************** Nav View ********************/
function NavView(elementSelector) {
    var self = this;

    self.links = {
        searchLink: $('#navSearch'),
        homeLink: $('#navHome')
    }

    self.el = $(elementSelector);

    self.bindListeners();
}

$.extend(NavView.prototype, {
    highlightNavLink: function (element) {
        this.el.find('li').removeClass('active');
        $(element).addClass('active');
    },

    bindListeners: function () {
        var self = this;

        self.el.find('li').click(function() {
            self.highlightNavLink(this);
        });
    }
});

/****************** Home View ********************/
function HomeView() {
    this.template = 
        '<div class="jumbotron">' +
            '<h1>Hello, everyone!</h1>' +
            '<p>This is my Spotify clone, PROSify!</p>' +
        '</div>';
}

$.extend(HomeView.prototype, {
    
});
