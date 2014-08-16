/* ========================================
 * app.js for red-header
 * --------------------
 * @author: Author Name <author@digitas.fr>
 * @forked: origin.js <http://source-website>
 * @dependencies: jQuery, App
 * @changelog:
 * 1. dd-mm-yy: Created / Forked from…
 * 2. dd-mm-yy: Added…
 * …
 * ======================================== */

(function ($, App) { "use strict";

  $(function () {
    $('.red-header').on('click', '.btn-navigation', function(evt){
      evt.preventDefault();
      $('#navmenu').toggleClass('open');
    });
    $('.red-header .navigation').affix({
      offset: {
        top: 105
      }
    });

    $('.red-header').on('click touchend', '[data-nav="scroll"]', function (evt) {
      evt.preventDefault();
      var target = $( $(this).attr('href') ),
          topContent = 0,
          fixedNav = $('#navmenu');

      if(!target.length){
        return;
      }

      if(fixedNav.height() > 100) {
        topContent = $('.red-header').height();
      } else if(!fixedNav.hasClass('affix')) {
        topContent = fixedNav.height() * 2;
      } else {
        topContent = fixedNav.height();
      }
      var offsetTop = target.offset().top - topContent;
      $('html, body').stop().animate({ scrollTop: offsetTop+'px' }, 400);
      $('#navmenu').toggleClass('open');
    });
  });

}(window.jQuery, window.App));
