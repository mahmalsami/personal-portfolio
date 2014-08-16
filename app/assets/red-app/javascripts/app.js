(function ($, App) { "use strict";

  window.onYouTubePlayerAPIReady = function() {
    if(!!window.IntrovideoYT){
      window.IntrovideoYT();
    }
    if(!!window.PlaylistYT){
      window.PlaylistYT();
    }
  };

}(window.jQuery, window.App));
