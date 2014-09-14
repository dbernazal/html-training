//Initialization
$(document).ready(function() {
    var navView;

    window.app = {};

    app.mainContainer = new ContainerView('#mainContainer');
    navView = new NavView('#navBar', app.mainContainer);
});

/****************** Nav View ********************/
function NavView(elementSelector, containerView) {
    var self = this;

    self.links = {
        searchLink: $('#navSearch'),
        homeLink: $('#navHome')
    }

    self.el = $(elementSelector);
    this.containerView = containerView;
    self.bindListeners();
}

$.extend(NavView.prototype, {

    highlightNavLink: function (element) {
        this.el.find('li').removeClass('active');
        $(element).addClass('active');
    },

    openSearch: function (containerView) {
        containerView.show( new SearchView() );
    },

    openHome: function (containerView) {
        containerView.show( new HomeView() );
    },

    bindListeners: function () {
        var self = this;

        self.el.find('li').click(function() {
            self.highlightNavLink(this);
        });

        self.links.homeLink.click(function(event) {
            self.openHome(self.containerView);
        });

        self.links.searchLink.click(function(event) {
            self.openSearch(self.containerView);
        });
    }
});

/****************** Container View ********************/
function ContainerView(element) {
    this.el = $(element);
}

$.extend(ContainerView.prototype, {
    show: function (view) {
        if (this.child){
            this.child.close();
        }

        this.child = view;
        this.el.append( view.render() );
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
    render: function () {
        return this.el = $(this.template);
    },

    close: function () {
        this.el.remove();
    }
});

/****************** Search View ********************/
function SearchView() {
    this.template =
                '<div id="search">' +
                    '<h2>Search PROSify</h2>' +
                    '<form class="form-group" id="custom-search-input">' +
                        '<div class="input-group col-md-12">' +
                            '<input type="text" class="  search-query form-control" placeholder="Search" />' +
                            '<span class="input-group-btn">' +
                                '<button class="btn btn-danger" type="submit">' +
                                    '<span class=" glyphicon glyphicon-search"></span>' +
                                '</button>' +
                            '</span>' +
                        '</div>' +
                    '</form>' +
                    '<div id="searchResults"/>' +
                '</div>';
}

$.extend(SearchView.prototype, {
    init: function () {
        this.ui =
        {
            searchInput: this.el.find('input'),
            results: this.el.find('#searchResults'),
            searchForm: this.el.find('form')
        }

        this.bindListeners();
    },

    render: function () {
        this.el = $(this.template);
        this.init();
        return this.el;
    },

    renderResults: function (results){
        this.ui.results.empty();
        results.artists.items.forEach( this.renderArtist, this );
    },

    renderArtist: function (artist) {
        this.ui.results.append( artist.name + '<br>' );
    },

    bindListeners: function () {
        var self = this;

        this.ui.searchForm.on('submit', function (event) {
            self.search( self.ui.searchInput.val() );
        });
    },

    unbindListeners: function () {
        this.ui.searchForm.off('submit');
    },

    close: function () {
        this.el.remove();
        this.unbindListeners();
    },

    search: function (query) {
        var self = this;

        $.getJSON(
            'https://api.spotify.com/v1/search',
            {q: query, type:'album,artist,track', limit: '3'},
            function(json, textStatus) {
                self.renderResults(json);
            }
        );
    }
});

/****************** Artist Result View ********************/
function ArtistResultView( artist ) {
    this.artist = artist;

    this.template = '<div class="search-result well well-sm"><h4>' + this.artist.name + '</h2></div>';
}

$.extend(ArtistResultView.prototype, {

});
