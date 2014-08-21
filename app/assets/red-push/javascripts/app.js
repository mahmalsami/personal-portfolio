(function ($, App) { "use strict";

  $(function () {
    var jobTitles=['Swat Team Manager','Digital Consultant','Creative Technologist Manager','Geek','Software Engineer'];

    var card= $('section[class="red-push"]');

     $('[id="jobtitle"]', card).text(jobTitles[Math.floor((Math.random() * 5) )]);
     $('[id="email"]', card).text('mahmalsami@gmail.com');
     $('[id="tel"]', card).text('(+33) 6 24 44 54 20');

  });

}(window.jQuery, window.App));
