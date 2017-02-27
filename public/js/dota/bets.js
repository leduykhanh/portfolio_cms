
function displayTime(bet){
       var countDownDate = new Date($(bet).attr("time")).getTime();
    // Get todays date and time
      

      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var timeLeft = "";
      if (days > 0) timeLeft += days + "d ";
      if (hours > 0) timeLeft += hours + "h ";
      if (minutes > 0) timeLeft += minutes + "m";
      // Display the result in the element with id="demo"
      if (distance > 0)
      $(bet).html(timeLeft);
    else
    // If the count down is finished, write some text 
      $(bet).html("past");

}
$( ".expireDate" ).each(function( index, bet ) {
    displayTime(bet);
    
});
// Update the count down every 1 second
var x = setInterval(function() {
  var now = new Date().getTime();
  $( ".expireDate" ).each(function( index, bet ) {
    displayTime(bet);
    
});
 
}, 60000);