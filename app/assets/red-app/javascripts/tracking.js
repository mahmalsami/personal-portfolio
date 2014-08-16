// Main tracking script is in app-layout.jade
// Search for 'csLayer' if you wish to find all the files where tracking is set.

$(function () {

  $('[data-trackme]').on('click touchend', function () {
    var data = $(this).attr('data-trackme') || '';
    window.csLayer.push( $.parseJSON(data) );
  });

  $('[data-twitter-share],[data-facebook-share]').on('click touchend', function () {
    var socialMedia = $(this).attr('data-social');
    window.csLayer.push({
      'event': 'socialSharing',
      'socialMedia': socialMedia,
      'contentName': 'Page',
      'contentID': ''
    });
  });

  $('.red-introvideo').on('click touchstart', function () {
    window.csLayer.push({
      'event': 'interactiveVideo',
      'sectionName': 'banner',
    });
  });

  $('.red-form .user-data input[type="radio"]').on('click.tracking touchend.tracking', function () {
    window.csLayer.push({
      'event': 'formStart'
    });
    $('.red-form .user-data input[type="radio"]').off('click.tracking touchend.tracking');
  });



});