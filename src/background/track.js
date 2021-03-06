let execute = require('./execute');
let collectCode = require('raw!uglify!babel!../content/collect');

let track = () => {
  chrome.storage.local.get(["track"], function(data) {
    var info = data.track;
    if(!info) return;
    if(!window.ga) {
      /* jshint ignore:start */
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                               m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      /* jshint ignore:end */
      ga('create', 'UA-58271438-2', 'auto');
      ga('set', 'checkProtocolTask', null);
      ga('set','userId', info.name);
      ga('set','page', info.title);
      ga('send', 'pageview', info.url);
    } else {
      ga('send', 'event', 'action', 'clickEx');
    }
  });
};

chrome.browserAction.onClicked.addListener(tab => execute(collectCode, track));

