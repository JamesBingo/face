/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.8
 *
 */
(function(e) {
    e.fn.extend({
        slimScroll: function(f) {
            var a = e.extend({
                width: "auto",
                height: "250px",
                size: "7px",
                color: "#000",
                position: "right",
                distance: "1px",
                start: "top",
                opacity: .4,
                alwaysVisible: !1,
                disableFadeOut: !1,
                railVisible: !1,
                railColor: "#333",
                railOpacity: .2,
                railDraggable: !0,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: !1,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "7px",
                railBorderRadius: "7px"
            }, f);
            this.each(function() {
                function v(d) {
                    if (r) {
                        d = d || window.event;
                        var c = 0;
                        d.wheelDelta && (c = -d.wheelDelta / 120);
                        d.detail && (c = d.detail / 3);
                        e(d.target || d.srcTarget || d.srcElement).closest("." + a.wrapperClass).is(b.parent()) && n(c, !0);
                        d.preventDefault && !k && d.preventDefault();
                        k || (d.returnValue = !1)
                    }
                }

                function n(d, e, f) {
                    k = !1;
                    var g = d,
                        h = b.outerHeight() - c.outerHeight();
                    e && (g = parseInt(c.css("top")) + d * parseInt(a.wheelStep) / 100 * c.outerHeight(), g = Math.min(Math.max(g, 0), h), g = 0 < d ? Math.ceil(g) : Math.floor(g), c.css({
                        top: g + "px"
                    }));
                    l = parseInt(c.css("top")) / (b.outerHeight() - c.outerHeight());
                    g = l * (b[0].scrollHeight - b.outerHeight());
                    f && (g = d, d = g / b[0].scrollHeight * b.outerHeight(), d = Math.min(Math.max(d, 0), h), c.css({
                        top: d + "px"
                    }));
                    b.scrollTop(g);
                    b.trigger("slimscrolling", ~~g);
                    w();
                    q()
                }

                function x() {
                    u = Math.max(b.outerHeight() / b[0].scrollHeight * b.outerHeight(), 30);
                    c.css({
                        height: u + "px"
                    });
                    var a = u == b.outerHeight() ? "none" : "block";
                    c.css({
                        display: a
                    })
                }

                function w() {
                    x();
                    clearTimeout(B);
                    l == ~~l ? (k = a.allowPageScroll, C != l && b.trigger("slimscroll", 0 == ~~l ? "top" : "bottom")) : k = !1;
                    C = l;
                    u >= b.outerHeight() ? k = !0 : (c.stop(!0, !0).fadeIn("fast"), a.railVisible && m.stop(!0, !0).fadeIn("fast"))
                }

                function q() {
                    a.alwaysVisible || (B = setTimeout(function() {
                        a.disableFadeOut && r || y || z || (c.fadeOut("slow"), m.fadeOut("slow"))
                    }, 1E3))
                }
                var r, y, z, B, A, u, l, C, k = !1,
                    b = e(this);
                if (b.parent().hasClass(a.wrapperClass)) {
                    var p = b.scrollTop(),
                        c = b.siblings("." + a.barClass),
                        m = b.siblings("." + a.railClass);
                    x();
                    if (e.isPlainObject(f)) {
                        if ("height" in f && "auto" == f.height) {
                            b.parent().css("height", "auto");
                            b.css("height", "auto");
                            var h = b.parent().parent().height();
                            b.parent().css("height",
                                h);
                            b.css("height", h)
                        } else "height" in f && (h = f.height, b.parent().css("height", h), b.css("height", h));
                        if ("scrollTo" in f) p = parseInt(a.scrollTo);
                        else if ("scrollBy" in f) p += parseInt(a.scrollBy);
                        else if ("destroy" in f) {
                            c.remove();
                            m.remove();
                            b.unwrap();
                            return
                        }
                        n(p, !1, !0)
                    }
                } else if (!(e.isPlainObject(f) && "destroy" in f)) {
                    a.height = "auto" == a.height ? b.parent().height() : a.height;
                    p = e("<div></div>").addClass(a.wrapperClass).css({
                        position: "relative",
                        overflow: "hidden",
                        width: a.width,
                        height: a.height
                    });
                    b.css({
                        overflow: "hidden",
                        width: a.width,
                        height: a.height
                    });
                    var m = e("<div></div>").addClass(a.railClass).css({
                            width: a.size,
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            display: a.alwaysVisible && a.railVisible ? "block" : "none",
                            "border-radius": a.railBorderRadius,
                            background: a.railColor,
                            opacity: a.railOpacity,
                            zIndex: 90
                        }),
                        c = e("<div></div>").addClass(a.barClass).css({
                            background: a.color,
                            width: a.size,
                            position: "absolute",
                            top: 0,
                            opacity: a.opacity,
                            display: a.alwaysVisible ? "block" : "none",
                            "border-radius": a.borderRadius,
                            BorderRadius: a.borderRadius,
                            MozBorderRadius: a.borderRadius,
                            WebkitBorderRadius: a.borderRadius,
                            zIndex: 99
                        }),
                        h = "right" == a.position ? {
                            right: a.distance
                        } : {
                            left: a.distance
                        };
                    m.css(h);
                    c.css(h);
                    b.wrap(p);
                    b.parent().append(c);
                    b.parent().append(m);
                    a.railDraggable && c.bind("mousedown", function(a) {
                        var b = e(document);
                        z = !0;
                        t = parseFloat(c.css("top"));
                        pageY = a.pageY;
                        b.bind("mousemove.slimscroll", function(a) {
                            currTop = t + a.pageY - pageY;
                            c.css("top", currTop);
                            n(0, c.position().top, !1)
                        });
                        b.bind("mouseup.slimscroll", function(a) {
                            z = !1;
                            q();
                            b.unbind(".slimscroll")
                        });
                        return !1
                    }).bind("selectstart.slimscroll",
                        function(a) {
                            a.stopPropagation();
                            a.preventDefault();
                            return !1
                        });
                    m.hover(function() {
                        w()
                    }, function() {
                        q()
                    });
                    c.hover(function() {
                        y = !0
                    }, function() {
                        y = !1
                    });
                    b.hover(function() {
                        r = !0;
                        w();
                        q()
                    }, function() {
                        r = !1;
                        q()
                    });
                    b.bind("touchstart", function(a, b) {
                        a.originalEvent.touches.length && (A = a.originalEvent.touches[0].pageY)
                    });
                    b.bind("touchmove", function(b) {
                        k || b.originalEvent.preventDefault();
                        b.originalEvent.touches.length && (n((A - b.originalEvent.touches[0].pageY) / a.touchScrollStep, !0), A = b.originalEvent.touches[0].pageY)
                    });
                    x();
                    "bottom" === a.start ? (c.css({
                        top: b.outerHeight() - c.outerHeight()
                    }), n(0, !0)) : "top" !== a.start && (n(e(a.start).position().top, null, !0), a.alwaysVisible || c.hide());
                    window.addEventListener ? (this.addEventListener("DOMMouseScroll", v, !1), this.addEventListener("mousewheel", v, !1)) : document.attachEvent("onmousewheel", v)
                }
            });
            return this
        }
    });
    e.fn.extend({
        slimscroll: e.fn.slimScroll
    })
})(jQuery);
/**
 * jquery.matchHeight-min.js master
 * http://brm.io/jquery-match-height/
 * License: MIT
 */
(function(c) {
    var n = -1,
        f = -1,
        g = function(a) {
            return parseFloat(a) || 0
        },
        r = function(a) {
            var b = null,
                d = [];
            c(a).each(function() {
                var a = c(this),
                    k = a.offset().top - g(a.css("margin-top")),
                    l = 0 < d.length ? d[d.length - 1] : null;
                null === l ? d.push(a) : 1 >= Math.floor(Math.abs(b - k)) ? d[d.length - 1] = l.add(a) : d.push(a);
                b = k
            });
            return d
        },
        p = function(a) {
            var b = {
                byRow: !0,
                property: "height",
                target: null,
                remove: !1
            };
            if ("object" === typeof a) return c.extend(b, a);
            "boolean" === typeof a ? b.byRow = a : "remove" === a && (b.remove = !0);
            return b
        },
        b = c.fn.matchHeight =
        function(a) {
            a = p(a);
            if (a.remove) {
                var e = this;
                this.css(a.property, "");
                c.each(b._groups, function(a, b) {
                    b.elements = b.elements.not(e)
                });
                return this
            }
            if (1 >= this.length && !a.target) return this;
            b._groups.push({
                elements: this,
                options: a
            });
            b._apply(this, a);
            return this
        };
    b._groups = [];
    b._throttle = 80;
    b._maintainScroll = !1;
    b._beforeUpdate = null;
    b._afterUpdate = null;
    b._apply = function(a, e) {
        var d = p(e),
            h = c(a),
            k = [h],
            l = c(window).scrollTop(),
            f = c("html").outerHeight(!0),
            m = h.parents().filter(":hidden");
        m.each(function() {
            var a = c(this);
            a.data("style-cache", a.attr("style"))
        });
        m.css("display", "block");
        d.byRow && !d.target && (h.each(function() {
            var a = c(this),
                b = a.css("display");
            "inline-block" !== b && "inline-flex" !== b && (b = "block");
            a.data("style-cache", a.attr("style"));
            a.css({
                display: b,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px"
            })
        }), k = r(h), h.each(function() {
            var a = c(this);
            a.attr("style", a.data("style-cache") || "")
        }));
        c.each(k, function(a, b) {
            var e = c(b),
                f = 0;
            if (d.target) f = d.target.outerHeight(!1);
            else {
                if (d.byRow && 1 >= e.length) {
                    e.css(d.property, "");
                    return
                }
                e.each(function() {
                    var a = c(this),
                        b = a.css("display");
                    "inline-block" !== b && "inline-flex" !== b && (b = "block");
                    b = {
                        display: b
                    };
                    b[d.property] = "";
                    a.css(b);
                    a.outerHeight(!1) > f && (f = a.outerHeight(!1));
                    a.css("display", "")
                })
            }
            e.each(function() {
                var a = c(this),
                    b = 0;
                d.target && a.is(d.target) || ("border-box" !== a.css("box-sizing") && (b += g(a.css("border-top-width")) + g(a.css("border-bottom-width")), b += g(a.css("padding-top")) + g(a.css("padding-bottom"))),
                    a.css(d.property, f - b + "px"))
            })
        });
        m.each(function() {
            var a = c(this);
            a.attr("style", a.data("style-cache") || null)
        });
        b._maintainScroll && c(window).scrollTop(l / f * c("html").outerHeight(!0));
        return this
    };
    b._applyDataApi = function() {
        var a = {};
        c("[data-match-height], [data-mh]").each(function() {
            var b = c(this),
                d = b.attr("data-mh") || b.attr("data-match-height");
            a[d] = d in a ? a[d].add(b) : b
        });
        c.each(a, function() {
            this.matchHeight(!0)
        })
    };
    var q = function(a) {
        b._beforeUpdate && b._beforeUpdate(a, b._groups);
        c.each(b._groups, function() {
            b._apply(this.elements,
                this.options)
        });
        b._afterUpdate && b._afterUpdate(a, b._groups)
    };
    b._update = function(a, e) {
        if (e && "resize" === e.type) {
            var d = c(window).width();
            if (d === n) return;
            n = d
        }
        a ? -1 === f && (f = setTimeout(function() {
            q(e);
            f = -1
        }, b._throttle)) : q(e)
    };
    c(b._applyDataApi);
    c(window).bind("load", function(a) {
        b._update(!1, a)
    });
    c(window).bind("resize orientationchange", function(a) {
        b._update(!0, a)
    })
})(jQuery);

$(function() {

    "use strict";

    // Back to top
    $('#scroll-up').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 900);
        return false;
    });

    // Smooth scroll for ToC
    $('.toc a, .sidenav.nav a').click(function() {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 80
        }, 500);
        return false;
    });

    // Smoothscroll to anchor in page load
    var hash = location.hash.replace('#', '');
    if (hash != '' && $("#" + hash).length > 0) {
        $('html, body').animate({
            scrollTop: $("#" + hash).offset().top - 100
        }, 600);
    }

    // Full height body to make sure footer will place in bottom of the page
    if ($(window).height() > $('body').height()) {
        var min_height = $(window).height() - $('.site-header').height() - $('.site-footer').height();
        $('body > main').css('min-height', min_height);
    }

    // Set the height of sidebar if it's fixed  .height(sidenav_max_height)
    if ($('.sidenav.sticky').length > 0) {
        var sidenav_max_height = $(window).height() - $('.sidenav.sticky').position().top - 100;
        $('.sidenav.sticky').height(sidenav_max_height);
    }

    //
    // Top navbar
    //
    if ($('.site-header').hasClass('sticky') && !$('.site-header').hasClass('navbar-sm')) {
        var navbar_lg = false;
        if ($('.site-header').hasClass('navbar-lg')) {
            navbar_lg = true;
        }

        $(window).on('scroll', function() {
            var offset = $('.site-header').offset().top + $('.site-header').height();

            if ($(window).scrollTop() > offset) {
                if (navbar_lg) {
                    $('.site-header').removeClass('navbar-lg');
                }
                $('.site-header').addClass('navbar-sm');

            } else {
                if (navbar_lg) {
                    $('.site-header').addClass('navbar-lg');
                }
                $('.site-header').removeClass('navbar-sm');
            }
        });
    }

    // Manage transparent navbar
    if ($('.site-header').hasClass('navbar-transparent') && $('.site-header').hasClass('sticky')) {

        if ($('.site-header > .banner').length == 0) {
            $('.site-header').removeClass('navbar-transparent');
        } else {
            if ($('.site-header').hasClass('sticky')) {

                $(window).on('scroll', function() {
                    var offset = $('.site-header .navbar').height();
                    if ($(window).scrollTop() > offset) {
                        $('.site-header').removeClass('navbar-transparent')
                    } else {
                        $('.site-header').addClass('navbar-transparent')
                    }
                });

            }
        }

    }

    // Margin top for sticky navbar without banner
    if ($('.site-header').hasClass('sticky') && $('.site-header > .banner').length == 0) {
        $('.site-header').css('padding-top', $('.site-header > .navbar').height() + 30);
    }

    // Add .force-middle if navbar-brand contains image
    if ('.navbar-brand > img') {
        $('.navbar-brand').prepend('<span class="force-middle"></span>');
    }

    //
    // Sidebar
    //

    // Offcanvas
    $('[data-toggle="offcanvas"]').on('click', function() {
        //$('.main-content').css('height', $('.sidenav').height()+100 + 'px');
        $('body').toggleClass('open-sidebar');
        if ($('body').hasClass('open-sidebar')) {
            $('html').css('overflow', 'hidden');
            //$('.main-content').css('height', $('.sidenav').height()+100 + 'px');
            $('.site-header .jumbotron').slideUp(50);
        } else {
            $('html').css('overflow', 'visible');
            //$('.main-content').css('height', 'auto');
            $('.site-header .jumbotron').slideDown(900);
        }
    });

    // Dropdown
    $('.sidenav.dropable > li > a').on('click', function(e) {

        if (0 < $(this).next("ul").length) {
            e.preventDefault();
        }

        if (0 == $(this).next("ul").length) {
            return;
        }

        if ($(this).hasClass('open')) {
            $(this).removeClass('open').next("ul").slideUp(300);
            return;
        }

        $(this).parents(".sidenav").find("> li > a").removeClass('open');
        $(this).parents(".sidenav").find("ul").not(":hidden").slideUp(300);
        $(this).addClass('open').next("ul").slideDown(300);
    });

    $('.sidenav.dropable > li > a.active').addClass('open');
    $('.sidenav.dropable > li > ul').prev('a').addClass('has-child');

    if ($(window).width() < 768) {
        $('.sidebar-boxed').removeClass('sidebar-dark');
    }

    // Sticky behaviour
    if ($('.sidenav').hasClass('sticky')) {
        $(window).on('scroll', function() {
            var $sidenav = $('.sidenav'),
                offset = $('.sidebar').offset();

            if ($(window).scrollTop() > offset.top) {
                $sidenav.css({
                    position: 'fixed',
                    top: '100px'
                });
            } else {
                $sidenav.css('position', 'static');
            }
        });
    }

    // Auto link creator for headings
    $('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').each(function(index, value) {
        var link = '<a href="#' + $(this).attr("id") + '">' + $(this).html() + '</a>';
        $(this).html(link);
    });

    //
    // FAQ Component
    //

    // Case insensitive contains selector
    jQuery.expr[':'].icontains = function(a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    // Search
    $('.faq-search').on('keyup', function(e) {
        var s = $(this).val().trim(),
            result = $(this).parent().find("li");
        if (s === '') {
            result.show();
            return true;
        }
        result.not(':icontains(' + s + ')').hide();
        result.filter(':icontains(' + s + ')').show();
    });

    $('.faq li > h6').on('click', function() {
        $(this).toggleClass('open').next('div').slideToggle(300);
    });

    //Taking care of video
    if ($.fn.mediaelementplayer) {
        $('video').mediaelementplayer();
    }

    if ($.fn.fitVids) {
        $('.video').fitVids();
    }

    //
    // File Tree
    //
    $('.file-tree li.is-file').on('click', function(e) {
        e.stopPropagation();
    });

    $('.file-tree li.is-folder').on('click', function(e) {
        $(this).find('ul:first').slideToggle(400, function() {
            $(this).parent('li').toggleClass('open');
        });
        e.stopPropagation();
    });

    //Equal height for grid view
    $('.grid-view > li, .categorized-view > li, .promo.small-icon').matchHeight();

    //
    // Code viewers
    //

    // Copy to clipboard
    // It doesn't support Safari yet, and also has some minor bugs
    $('pre').each(function(index, value) {
        $(this).prepend('<a class="btn btn-sm btn-purple clipboard-copy" data-original-title="Copied!">Copy</a>');
    });

    // Code snippet
    $('pre').each(function(index, value) {
        if ($(this).parents('.code-window').length || $(this).parents('.code-taps').length) {
            return;
        }
        var title = "";
        if ($(this).children("code").attr('class')) {
            title = $(this).children("code").attr('class');
            title = title.replace("language-", "");
            title = title.toLowerCase();
            if (title == "markup") {
                title = "html";
            }
        }
        var span = '<span class="language-name">' + title + '</span>';
        $(this).prepend(span);
    });

    $('pre .language-name').parent().on('scroll', function() {
        $(this).find('.language-name').css('transform', 'translate(' + $(this).scrollLeft() + 'px, ' + $(this).scrollTop() + 'px)');
    });

    // Code window
    $('.code-window').each(function(index, value) {
        var topbar = '<div class="window-bar"><div class="circles">';
        topbar += '<span class="circle circle-red"></span> <span class="circle circle-yellow"></span> <span class="circle circle-green"></span>';
        if ($(this).attr('data-title')) {
            topbar += '<span class="window-title">' + $(this).data('title') + '</span>';
        }
        topbar += '</div>'; //.circles

        //Languages
        if ($(this).children().length > 1) {
            topbar += '<div class="languages"><div class="btn-group" data-toggle="buttons">';

            $(this).children(':not(.prism-show-language)').each(function(index, value) {
                var active = '',
                    check = '',
                    title = '';
                if (index == 0) {
                    active = ' active';
                    check = ' checked';
                }
                if ($(this).children("code").attr('class')) {
                    title = $(this).children("code").attr('class');
                    title = title.replace("language-", "");
                    title = title.toLowerCase();
                    if (title == "markup") {
                        title = "html";
                    }
                } else if ($(this).hasClass('code-preview')) {
                    title = 'Example';
                }
                topbar += '<label class="btn' + active + '"><input type="radio" autocomplete="off"' + check + '>' + title + '</label>';
            });

            topbar += '</div></div>';
        }

        topbar += '</div>'; //.window-bar

        $(this).children(':not(:first)').hide(0);
        $(this).children().wrapAll('<div class="window-content"></div>');
        $(this).prepend(topbar);

        //Event handler, change tab
        var window_content = $(this).children('.window-content');
        $(this).find(".btn-group .btn").on('click', function() {
            var i = $(this).index();
            window_content.children(":visible").fadeOut(200, function() {
                window_content.children(":not(.prism-show-language):eq(" + i + ")").fadeIn(200);
            });
        });
    });

    // Code tabs
    $('.code-tabs').each(function(index, value) {
        var topbar = '';

        //Languages
        if ($(this).children().length > 1) {
            topbar += '<div class="languages"><div class="btn-group" data-toggle="buttons">';

            $(this).children(':not(.prism-show-language)').each(function(index, value) {
                var active = '',
                    check = '',
                    title = '';
                if (index == 0) {
                    active = ' active';
                    check = ' checked';
                }
                if ($(this).children("code").attr('class')) {
                    title = $(this).children("code").attr('class');
                    title = title.replace("language-", "");
                    title = title.toLowerCase();
                    if (title == "markup") {
                        title = "html";
                    }
                } else if ($(this).hasClass('code-preview')) {
                    title = 'Example';
                }
                topbar += '<label class="btn' + active + '"><input type="radio" autocomplete="off"' + check + '>' + title + '</label>';
            });

            topbar += '</div></div>';
        }

        $(this).children(':not(:first)').hide(0);
        $(this).children().wrapAll('<div class="window-content"></div>');
        $(this).prepend(topbar);

        //Event handler, change tab
        var window_content = $(this).children('.window-content');
        $(this).find(".btn-group .btn").on('click', function() {
            var i = $(this).index();
            window_content.children(":visible").fadeOut(200, function() {
                window_content.children(":not(.prism-show-language):eq(" + i + ")").fadeIn(200);
            });
        });
    });

    // Trim code blocks
    $('pre code').each(function() {
        $(this).html($.trim($(this).html()));
    });

    // Copy to clipboard
    $('.code-preview .clipboard-copy').remove();
    $('.clipboard-copy').tooltip({
        placement: 'bottom',
        trigger: 'manual'
    });
    // Move copy button when the content is scrolling
    $('.clipboard-copy').parent().on('scroll', function() {
        $(this).find('.clipboard-copy').css('transform', 'translate(' + $(this).scrollLeft() + 'px, ' + $(this).scrollTop() + 'px)');
    });

    if ($('.clipboard-copy').length > 0) {

        var clipboardSnippets = new Clipboard('.clipboard-copy', {
            target: function(trigger) {
                return trigger.nextElementSibling;
            }
        });

        clipboardSnippets.on('success', function(e) {
            e.clearSelection();
            $(e.trigger).tooltip('show');
            setTimeout(function(el) {
                $(el.trigger).tooltip('hide');
            }, 1000, e);
        });
    }

});
