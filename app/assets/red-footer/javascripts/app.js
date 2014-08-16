/* ========================================
 * app.js for red-footer
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

  var sampleTrigger = '[data-sample]';

  /* SAMPLE CLASS DEFINITION
   * ======================= */

  function Sample(el) {
    $(el).on('mouseenter', this.open);
    $(el).on('mouseout', this.close);
  }

  Sample.prototype = {
    constructor: Sample,
    open: function (e) {
      $(this).addClass('in');
    },
    close: function (e) {
      $(this).removeClass('in');
    }
  };

  /* SAMPLE PLUGIN DEFINITION
   * ======================== */

  var old = $.fn.sample;
  $.fn.sample = function (option) {
    return this.each(function () {
      var $this = $(this),
        data = $this.data('sample');
      if (!data) {
        data = new Sample(this);
        $this.data('sample', data);
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.sample.Constructor = Sample;

  /* SAMPLE NO CONFLICT
   * ================== */

  $.fn.sample.noConflict = function () {
    $.fn.sample = old;
    return this;
  };

  /* SAMPLE DATA-API
   * =============== */

  $(function () {
    $(document).on('mouseenter.sample.data-api', sampleTrigger, Sample.prototype.open);
    $(document).on('mouseleave.sample.data-api', sampleTrigger, Sample.prototype.close);
  });

}(window.jQuery, window.App));
