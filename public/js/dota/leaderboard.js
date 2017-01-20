$( document ).ready(function() {
    loadData("#americas");
});
function loadData(target){
  $.ajax({
      type: "GET",
      url: "http://jangkoo.com/projects/dota/leaderboards.php?division="+target.substr(1),
      // url: "http://localhost/dota/leaderboards.php?division="+target.substr(1),
      error: function(data){
        alert("There was a problem");
      },
      success: function(data){
        
        var table = $('<table class="table table-hover text-left"></table>');
        JSON.parse(data).leaderboard.map(function(value,index){
          table.append('<tr><td>' + value.rank + '</td><td>' + value.team_tag + '.' + value.name + '<span class="flag-icon flag-icon-'+ value.country+'"></span>' + '</td>' + '<td>' + value.solo_mmr + '</td>' + '</tr>');
        })
        $(target).html(table);
      }
  });
}
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).attr("href") ;// activated tab
  if ($(target).is(':empty')) {
    loadData(target);
    
 }
});