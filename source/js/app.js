;
(function($, window) {

    let APP = {
        plugins: {
            bootstrap: {
                js: baseLink + "/source/css/bootstrap/js/bootstrap.min.js"
            },
            highlight: {
                js: baseLink + "/source/js/highlightjs/highlight.pack.js"
            },
            lazyLoad: {
                js: baseLink + "/source/js/jquery.lazyload.min.js"
            },
            share: {
                js: baseLink + "/source/js/overshare/js/social-share.min.js"
            },
            toc: {
                js: baseLink + "/source/js/toc.js"
            }
        }
    };

    console.log("%c Theme." + themeName + " v" + version + " %c https://www.extlight.com/ ", "color: white; background: #e9546b; padding:5px 0;", "padding:4px;border:1px solid #e9546b;");

    $.ajaxSetup({
        cache: true
    });

    const loadLazy = function() {
        $.getScript(APP.plugins.lazyLoad.js, function() {
            $("img.lazyload").lazyload({
                placeholder : baseLink + "/source/images/loading2.jpg",
                effect: "fadeIn"
            });
        })
    };

    const toTop = function () {
        let $top = $(".top-btn");
        $(window).scroll(function(e) {
            let scrollTop = $(this).scrollTop();
            if (scrollTop > 1080) {
                $top.addClass("show");
            } else {
                $top.removeClass("show");
            }
        });

        $top.off("click").on("click",function() {
            $('html, body').animate({
                scrollTop: $('html').offset().top
            }, 500);
        });
    };

    const postEvent = function() {
        let $detail = $("#post-content");
        if ($detail.length > 0) {

            $.getScript(APP.plugins.toc.js, function () {
                $(".toc-panel").html(tocHelper("post-content", "nav"));
                $('body').scrollspy({ offset: 300, target: '.toc-panel' });
                let headArr = $(".post-detail").find("h3");
                $(window).scroll(function(e) {
                    let scrollTop = $(this).scrollTop();
                    // 确认当前滚动的目录索引
                    let current = 0;
                    $.grep(headArr, function(domEle, index) {
                        if (scrollTop >= $(domEle).offset().top - 100) {
                            current = index;
                            return true;
                        }
                    });
                    $(".post-toc").find("li.nav-level-2").removeClass("active");
                    let currentHead = $(".post-toc").find("li.nav-level-2").eq(current);
                    currentHead.addClass("active");
                });
            });

            $.getScript(APP.plugins.highlight.js, function () {
                document.querySelectorAll('figure span').forEach((block) => {
                    hljs.highlightBlock(block);
                });
            });

            tocPositionEvent();
        }
    };

    const tocPositionEvent = function() {
        $.getScript(APP.plugins.bootstrap.js, function() {
            let $postToc = $("#postToc");
            $postToc.affix({ offset: 960});
        });
    };

    const navEvent = function() {
        $("#navBtn").off("click").on("click", function () {
            let $navList = $(".nav-list");
            $navList.toggleClass("open");
        });
    };

    $(function() {
        loadLazy();
        navEvent();
        toTop();
        postEvent();
    });

})(jQuery, window);
