/* global FB */

window.fbAsyncInit = function() {
  FB.init({
    appId: window.App.settings.facebook.appId,
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });
};

// Load the SDK asynchronously
(function(d){
 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement('script'); js.id = id; js.async = true;
 //js.src = "./javascripts/all.js";
 js.src = window.App.settings.alljsPath.link;
 
 ref.parentNode.insertBefore(js, ref);
}(document));


window.loginFacebook = function loginFacebook(){

  function getUserInfo(){
    var form = $('form[name="newsletter-form"]');
    FB.api('/me',function(userInfo){
      $('[data-facebook="lastName"]', form).val(userInfo.last_name);
      $('[data-facebook="firstName"]', form).val(userInfo.first_name);
      $('[data-facebook="email"]', form).val(userInfo.email);

      window.form.birthday=userInfo.birthday;
      window.form.facebookId=userInfo.id;

      if(typeof userInfo.location !== 'undefined'){
        var location = userInfo.location.name.split(', ');
        $('[data-facebook="city"]', form).val(location[0]); // city
        $('[data-facebook="country"]', form).val(location[1]); // country
      }

    });
    FB.api('/me/likes', function(userLikes){
      window.form.likes = JSON.stringify(userLikes);
    });

  }

  function logme(successCallback) {
    FB.login(function(response) {
      if (response.status === 'connected') {
        // tracking
        window.csLayer.push({
        'event': 'Fbconnect'
        });
        successCallback();
      } else {
        console.log("[facebook_connect] Login failed, ");
      }
    },{scope:'email,user_birthday'});
  }

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      getUserInfo();
    } else {
      logme(getUserInfo);
    }
  });

};

$(function() {

/*
  $('[data-facebook-share]').on('click', function(evt) {
    evt.preventDefault();
    FB.ui({
      method: 'feed',
      link: window.App.settings.facebook.shareLink,
      caption: window.App.settings.facebook.shareCaption,
      picture: window.App.settings.facebook.sharePicture
    }, function(response){
    });
    return false;
  });
*/

  $('[data-facebook-share]').on('click', function(evt) {
    evt.preventDefault();
    var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = this.href,
        opts   = 'status=0'       +
                 ',location=0'    +
                 ',toolbar=0'     +
                 ',directories=0' +
                 ',menubar=0'     +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;

    window.open(url, 'facebook', opts);

    return false;
  });

});

