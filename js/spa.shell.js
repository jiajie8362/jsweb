spa.shell = (function () {
  var configMap = {
    main_html: '<div class="spa-shell-head">'
     + '<div class="spa-shell-head-logo"></div>'
     + '<div class="spa-shell-head-acct"></div>'
     + '<div class="spa-shell-head-search"></div>'
     + '</div>'
     + '<div class="spa-shell-main">'
     + '<div class="spa-shell-main-nav"></div>'
     + '<div class="spa-shell-main-content"></div>'
     + '</div>'
     + '<div class="spa-shell-foot"></div>'
     + '<div class="spa-shell-chat"></div>'
     + '<div class=="spa-shell-modal"></div>',

     chat_extend_time: 1000,
     chat_retract_time: 300,
     chat_entend_height: 450,
     chat_retract_height: 15,
     chat_extended_title: 'Click to retract',
     chat_retracted_title: 'Click to extend'
  },
  stateMap = { $container: null },
  jqueryMap = {},
  setJqueryMap, toggleChat, initModule;

  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $chat: $container.find('.spa-shell-chat')
    };
  };

  toggleChat = function(do_extend, callback) {
    var px_chat_ht = jqueryMap.$chat.height(),
      is_open = px_chat_ht === configMap.chat_entend_height,
      is_closed = px_chat_ht === configMap.chat_retract_height,
      is_sliding = !is_open && !is_closed;

    if (is_sliding) {
      return false;
    }

    if ( do_extend ) {
      jqueryMap.$chat.animate({
          height: configMap.chat_entend_height
        },
        configMap.chat_extend_time,
        function() {
          jqueryMap.$chat.attr(
            'title', configMap.chat_extended_title
          )
          if (callback) {
            callback(jqueryMap.$chat);
          }
        }
      );
      return true;
    }

    jqueryMap.$chat.animate(
      { height: configMap.chat_retract_height },
      configMap.chat_retract_time,
      function() {
        if (callback) {
          callback(jqueryMap.$chat);
        }
      }
    );
    return true;
  }

  initModule = function ($container) {
    stateMap.$container = $container;
    $container.html( configMap.main_html );
    setJqueryMap();
    setTimeout( function() {toggleChat(true);}, 3000);
    setTimeout( function() {toggleChat(false);}, 8000);
  };


  return { initModule: initModule };
}());
