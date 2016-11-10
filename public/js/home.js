
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
