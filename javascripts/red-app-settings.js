(function (window) {

  /* TRACKING VARIBALE
   *  MUST BE SET BEFORE ANY OTHER TRACKING CODE
   * =========================================== */
  window.csLayer = [];

  /* APP DEFINITION
   * ============== */

  var App = {
    settings: {
      tracking: {
        isocode: 'FR',
        siteLabel: 'personal-portfolio'
      }
    },
    l10n: {
      random: {}
    }
  };


  /* APP SETTINGS
   * ============ */

  App.settings.debug = true;


  /* APP LOCALIZATION VARIABLES
   * ========================== */

  App.l10n.random.close = 'Fermer';


  /* EXPOSE APP
   * ========== */

  window.App = App;

}(window));
