$(function () {
    var lastId,
        topMenu = $("#navbar-nav"),
        topMenuHeight = topMenu.outerHeight() + 1,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });
    $(window).scroll(function () {
        var fromTop = $(this).scrollTop()+topMenuHeight+100;
        var $nav = $(".fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=\\#" + id + "]").parent().addClass("active");
        }
    });
    $(".nav-link").click(function (e) {
        e.preventDefault();
        var aid = $(this).attr("href");
        $('html,body').animate({ scrollTop: ($(aid).offset().top - 70) }, 'slow');
    });
});