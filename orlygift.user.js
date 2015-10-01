// ==UserScript==
// @name Orlygift.com Cleaner
// @namespace https://github.com/Tackyou/orlygift-cleaner
// @description A userscript to clean the orlygift website up
// @author Tackyou
// @version 0.8
// @license https://raw.githubusercontent.com/Tackyou/orlygift-cleaner/master/LICENSE
// @icon http://i.imgur.com/ukYltA1.png
// @match https://www.orlygift.com/
// @supportURL https://github.com/Tackyou/orlygift-cleaner/issues
// @updateURL https://raw.githubusercontent.com/Tackyou/orlygift-cleaner/master/orlygift.user.js
// @downloadURL https://raw.githubusercontent.com/Tackyou/orlygift-cleaner/master/orlygift.user.js
// @grant none
// ==/UserScript==

// bypass adblock & steam review
var astop = false, rstop = false, cycle = setInterval(function() {
    if(!rstop && $('.user-blocked').length>0){
        $('.user-blocked').removeClass('user-blocked');
        $('.navbar-brand img').attr('src','http://i.imgur.com/0X4HGnP.png');
        rstop = true;
    }
    if(!astop && $('.sweet-alert').length>0 && $('.sweet-alert').text().indexOf('AdBlocker detected :(') != -1){
        $('#ad-enabled').show();
        $('#ad-disabled').hide();
        $('.sweet-overlay').remove();
        $('.sweet-alert').remove();
        $('body').removeClass('stop-scrolling');
        $('.navbar-brand img').attr('src','http://i.imgur.com/HF6LusY.png');
        astop = true;
    }
    if(rstop && astop){
        clearInterval(cycle);
        $('.navbar-brand img').attr('src','http://i.imgur.com/0Ol8yk1.png');
    }
}, 100);

// theres some overlay blocking the site sometimes, what ever lets remove it
$('.modal-backdrop.fade.in').remove();

// clean the page
$('.ad-container').remove();
$('.headline-container').first().remove();
$('.countdown-container').remove();
$('.last_claimed').remove();
$('.row').slice(0,3).remove();
// remove android app ad
$('#commander-cool-banner').parent().remove();

// make it a bit smaller
$('.row.headline-container.wizard').first().css('padding', '5px 0px 0px 0px').find('h3').remove();
$('.content-inner').css('padding', '5px');
$('.content-inner h3').css('font-size', '16px');
$('.content-inner h3').css('margin-top', '11px');
$('.thumb').remove();

// for in round
$('.content-inner .alert.alert-info').nextAll().remove();
// for not in round
$('.content-inner .alert.alert-warning').next().nextAll().remove();

// remove all leftover crap
$('.timeline').css('padding', '0 0 50px').css('margin-left', '0').nextAll().remove();
$('.alert-success').nextAll().remove();
