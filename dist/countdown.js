function timeLeft(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours   = Math.floor( (t/(1000*60*60)) % 24 );
    var days    = Math.floor( t/(1000*60*60*24) );
    return {
        'total'  : t,
        'days'   : days,
        'hours'  : hours,
        'minutes': minutes,
        'seconds': seconds
    };
};

jQuery(document).ready(function() {
    var today = new Date();
    var deadline = 'January 1 ' + (today.getFullYear() + 1) + " 00:00:00";
    if (today.getMonth() == 0 && today.getDate() == 1) {
        deadline = 'January 1 ' + (today.getFullYear()) + " 00:00:00";
    };

  var __ = window.wp.i18n.__;
  var cText  = __( 'Happy New Year!!!', 'otfm-countdown-to-new-year-block' ),
      cTextA = __( 'Happy', 'otfm-countdown-to-new-year-block' ),
      cTextB = __( 'New', 'otfm-countdown-to-new-year-block' ),
      cTextC = __( 'Year', 'otfm-countdown-to-new-year-block' ),
      cTextD = __( 'Countdown starts again tomorrow!', 'otfm-countdown-to-new-year-block' );

    var setClock = function(newyear){
        var timeinterval = setInterval(function(){
            var t = timeLeft(newyear);
            jQuery('#octny_days').text(t.days);
            jQuery('#octny_hours').text(t.hours);
            jQuery('#octny_mins').text(('0' + t.minutes).slice(-2));
            jQuery('#octny_secs').text(('0' + t.seconds).slice(-2));
            if(t.total<=0){
                clearInterval(timeinterval);
                var now = new Date();
                var yearStr = now.getFullYear().toString();
                jQuery('#octny_header').text(cText);
                jQuery('#octny_days').text(yearStr[0]);
                jQuery('#octny_days_text').text(cTextA);
                jQuery('#octny_hours').text(yearStr[1]);
                jQuery('#octny_hours_text').text(cTextB);
                jQuery('#octny_mins').text(yearStr[2]);
                jQuery('#octny_mins_text').text(cTextC);
                jQuery('#octny_secs').text(yearStr[3]);
                jQuery('#octny_secs_text').text("!!!");
                jQuery('#octny_info').text(cTextD);
            }
        },1000);
    };

  setClock(deadline);
});