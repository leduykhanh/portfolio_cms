
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-53329462-14', 'auto');
  ga('send', 'pageview');


$('.carousel').carousel({
    interval: 5000 //changes the speed
})
// init
var $authmodal = $('#modal-auth');
var authmodalPanes = $authmodal.find('.auth-box');

// start on the right pane
// defaults to "join"
// options "signin" | "join" | "password"
// MAKESHIFT WAY TO EXPOSE JQUERY AUTH LOGIC TO REACT
window.signinModalTrigger = function signinModalTrigger(e) {

  e.preventDefault();

  var initial = $(this).data("initial") || 'join';
  var initialPane = $authmodal.find('.modal-pane-' + initial);
  var from = $(this).data("from");

  $authmodal.modal('show');

  authmodalPanes.addClass('hidden');
  initialPane.removeClass('hidden');

  // only focus the first field on large devices where showing
  // the keyboard isn't a jarring experience
  if ($(window).width() >= 768) {
    initialPane.find('input[type!=hidden],textarea').eq(0).click().focus();
  }

  if (from) {
    $authmodal.find('[name="from"]').val(from);
  }
}

$("[href='#modal-auth'], [data-modal='auth'], .js-auth-trigger").on('click', signinModalTrigger);
function animateValue(id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}
$(window).scroll(function() {
    var wS = $(this).scrollTop();
    if($('#order-counts').length){
      var hT = $('#order-counts').offset().top,
         hH = $('#order-counts').outerHeight(),
         wH = $(window).height();
         
     if (wS > (hT+hH-wH)){
         animateValue("order-count",0,1532,1500);
         animateValue("customer-count",0,53,500);
     }
   }
   if (wS > 35){
    $(".navbar-inverse").css({"background-color": "rgba(225,225,225,0.9)"});
    $(".navbar-inverse .navbar-nav > li > a").css({"color":"black"});
    $(".navbar-inverse .navbar-nav > .active > a").css({"color":"white","background-color": "rgba(0,0,0,0.9)"});
   }
   else {
    $(".navbar-inverse").css({"background-color": "rgba(0,0,0,1)", "color":"white"});
    $(".navbar-inverse .navbar-nav > li > a").css({"color":"white"});
  }
});
mixpanel.track("About");
mixpanel.track("Leaderboards");
mixpanel.track("Blog");
mixpanel.track("Bets");
