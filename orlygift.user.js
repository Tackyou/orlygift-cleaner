// ==UserScript==
// @name Orlygift.com Cleaner
// @namespace https://github.com/Tackyou/orlygift-cleaner
// @description A userscript to clean the orlygift website up
// @author Tackyou
// @version 1.7
// @license https://raw.githubusercontent.com/Tackyou/orlygift-cleaner/master/LICENSE
// @icon http://i.imgur.com/ukYltA1.png
// @match https://www.orlygift.com/
// @supportURL https://github.com/Tackyou/orlygift-cleaner/issues
// @updateURL https://raw.githubusercontent.com/Tackyou/orlygift-cleaner/master/orlygift.user.js
// @downloadURL https://raw.githubusercontent.com/Tackyou/orlygift-cleaner/master/orlygift.user.js
// @grant none
// ==/UserScript==

var css = '';
// cleaning
css += '.col-md-12 p,'; // "WIN A KEY NOW"-button
css += '.ad-container,'; // all adcontainers
css += '.last_claimed,'; // last winners
css += '.fade,'; // not required
css += '.thumb,'; // images for the steps
css += '.row:nth-child(n+4):nth-child(-n+7),'; // description, video, etc
css += '.timeline ~ div,'; // leftover stuff after the steps
css += '.alert.alert-success ~ *,';// stuff after last step
css += '.timeline li:last-child .content-perspective .content-inner>div:last-child,'; // man I struggled 1 hour on this. now it works. guess what? the !important did the trick. programing sucks sometimes. it's always the simple stuff you don't think of. thanks for reading this ;)
css += '.event.finished:nth-last-child(n+2),'; // finished steps
css += '.cc_banner-wrapper,'; // cookie information
css += '.headline-container.animated h3,'; // "Share. Play. Rate."-text
css += '.col-xs-4:nth-child(n+1):nth-child(odd):nth-child(-n+3),'; // countdown
css += '.col-xs-4 *:nth-last-child(n+3),'; // countdown
css += '.col-xs-4 h3'; // countdown
css += '{display:none !important}';

// hide anti-adblock warning
css += '.sweet-alert,';
css += '.sweet-overlay,';
css += '{display:none !important}';

// resizing
css += '.timeline .content-inner{padding:5px}';
css += '.timeline .content-inner h3{font-size:16px;margin-top:11px}';
css += '.timeline .content-perspective{margin-left:30px}';
//
css += '.event label.arrow,';
css += '.event input[type="radio"]';
css += '{left:-50px}';
//
css += '.timeline:before{left:-30px}';
//
css += '.container-fluid .container{width:800px}';
//
css += '.headline-container{padding:10px 0 0}';
// total time left countdown
css += '#time_left_total_countdown{position:fixed;width:210px;z-index:9999}';

// finally, add the styles
var style = document.createElement('style');
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);

// ##################################### divide between styling and functions
console.log("[Userscript] OrlyCleaner is active");

// automatically accept the new TOS if required, saving you some clicks and time
if($('input#terms').length>0){
    $('form.ng-pristine input#terms').prop('checked', true);
    $('form.ng-pristine input#newsletter').prop('checked', false);
    $('form.ng-pristine div.col-xs-4 button').trigger('click');
    console.log('[Userscript] Orlygift TOS accepted');
}

// make timeleft countdown live
var timelem = $('div.callout.callout-info strong');
if(timelem.length>0){
    var fetchtime = timelem.text();
    var mins = +(fetchtime.split(':')[0]), secs = (mins * 60 + (+(fetchtime.split(':')[1].split(' min')[0]))), currentSeconds = 0, currentMinutes = 0, count = setInterval(function() {
        currentMinutes = Math.floor(secs / 60); currentSeconds = secs % 60; if(currentSeconds <= 9) currentSeconds = '0' + currentSeconds; secs--; timelem.text(currentMinutes + ':' + currentSeconds + ' min');
        if(secs == -1){ clearInterval(count); $('.callout.callout-info').empty().html('<h1 style="margin:0;text-align:center;font-weight:bold"><a href="javascript:location.reload()" style="text-decoration:none">&gt;&gt;&gt; Reload & try again &lt;&lt;&lt;</a></h1>'); }
    }, 1000);
}
