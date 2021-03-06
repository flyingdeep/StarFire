var items_per_page = 10;
var scroll_in_progress = false;
var myScroll;
load_content = function(refresh, next_page) {
    // This is a DEMO function which generates DEMO content into the scroller.
    // Here you should place your AJAX request to fetch the relevant content (e.g. $.post(...))
    setTimeout(function() { // This immitates the CALLBACK of your AJAX function
        if (!refresh) {
            // Loading the initial content
            $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
        } else if (refresh && !next_page) {
            // Refreshing the content
            $('#wrapper > #scroller > ul').html('');
            $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
        } else if (refresh && next_page) {
            // Loading the next-page content and refreshing
            $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
            $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
        }
        if (refresh) {

            myScroll.refresh();
            pullActionCallback();

        } else {
            if (myScroll) {
                myScroll.destroy();
                $(myScroll.scroller).attr('style', ''); // Required since the styles applied by IScroll might conflict with transitions of parent layers.
                myScroll = null;
            }
            trigger_myScroll();
        }
    }, 1000);
};
function pullDownAction() {
    load_content('refresh');
    $('#wrapper > #scroller > ul').data('page', 1);
    // Since "topOffset" is not supported with iscroll-5
    $('#wrapper > .scroller').css({top:0});
}
function pullUpAction(callback) {
    if ($('#wrapper > #scroller > ul').data('page')) {
        var next_page = parseInt($('#wrapper > #scroller > ul').data('page'), 10) + 1;
    } else {
        var next_page = 2;
    }
    load_content('refresh', next_page);
    $('#wrapper > #scroller > ul').data('page', next_page);
    if (callback) {
        callback();
    }
}
function pullActionCallback() {
    if (pullDownEl && pullDownEl.className.match('loading')) {
        pullDownEl.className = 'pullDown';
        pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh';
        myScroll.scrollTo(0, parseInt(pullUpOffset)*(-1), 60);
    } else if (pullUpEl && pullUpEl.className.match('loading')) {
        $('.pullUp').removeClass('loading').html('');

    }
}
var pullActionDetect = {
    count:0,
    limit:10,
    check:function(count) {
        if (count) {
            pullActionDetect.count = 0;
        }
        // Detects whether the momentum has stopped, and if it has reached the end - 200px of the scroller - it trigger the pullUpAction
        setTimeout(function() {
            if (myScroll.y <= (myScroll.maxScrollY + 60) && pullUpEl && !pullUpEl.className.match('loading')) {
                $('.pullUp').addClass('loading').html('<span class="pullUpIcon">&nbsp;</span><span class="pullUpLabel">Loading...</span>');
                pullUpAction();
            } else if (pullActionDetect.count < pullActionDetect.limit) {
                pullActionDetect.check();
                pullActionDetect.count++;
            }
        }, 200);
    }
}

function trigger_myScroll(offset) {
    pullDownEl = document.querySelector('#wrapper .pullDown');
    if (pullDownEl) {
        pullDownOffset = pullDownEl.offsetHeight;
    } else {
        pullDownOffset = 0;
    }
    pullUpEl = document.querySelector('#wrapper .pullUp');
    if (pullUpEl) {
        pullUpOffset = pullUpEl.offsetHeight;
    } else {
        pullUpOffset = 0;
    }

    if ($('#wrapper ul > li').length < items_per_page) {
        // If we have only 1 page of result - we hide the pullup and pulldown indicators.
        $('#wrapper .pullDown').hide();
        $('#wrapper .pullUp span').hide();
        offset = 0;
    } else if (!offset) {
        // If we have more than 1 page of results and offset is not manually defined - we set it to be the pullUpOffset.
        offset = pullUpOffset;
    }

    myScroll = new IScroll('#wrapper', {
        probeType:1, tap:true, click:false, preventDefaultException:{tagName:/.*/}, mouseWheel:true, scrollbars:true, fadeScrollbars:true, interactiveScrollbars:false, keyBindings:false,
        deceleration:0.0002,
        startY:(parseInt(offset)*(-1))
    });


    myScroll.on('scrollStart', function () {
        scroll_in_progress = true;
    });
    myScroll.on('scroll', function () {

        scroll_in_progress = true;

        if ($('#wrapper ul > li').length >= items_per_page) {
            if (this.y >= 5 && pullDownEl && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'pullDown flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh';
                this.minScrollY = 0;
            } else if (this.y <= 5 && pullDownEl && pullDownEl.className.match('flip')) {
                pullDownEl.className = 'pullDown';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh';
                this.minScrollY = -pullDownOffset;
            }

            console.log(this.y);
            pullActionDetect.check(0);

        }
    });
    myScroll.on('scrollEnd', function () {
        console.log('scroll ended');
        setTimeout(function() {
            scroll_in_progress = false;
        }, 100);
        if ($('#wrapper ul > li').length >= items_per_page) {
            if (pullDownEl && pullDownEl.className.match('flip')) {
                pullDownEl.className = 'pullDown loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
                pullDownAction();
            }
            // We let the momentum scroll finish, and if reached the end - loading the next page
            pullActionDetect.check(0);
        }
    });

    // In order to prevent seeing the "pull down to refresh" before the iScoll is trigger - the wrapper is located at left:-9999px and returned to left:0 after the iScoll is initiated
    setTimeout(function() {
        $('#wrapper').css({left:0});
    }, 100);
}

function loaded() {

    load_content();

}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
