
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).attr("href") ;// activated tab
  console.log(target);
  if ($(target).is(':empty')) {
    $.ajax({
      type: "GET",
      url: "http://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division="+target.substr(1),
      error: function(data){
        alert("There was a problem");
      },
      success: function(data){
        $(target).html(data);
      }
  })
 }
})