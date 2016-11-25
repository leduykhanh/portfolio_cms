
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).attr("href") ;// activated tab
  
  if ($(target).is(':empty')) {
    $.ajax({
      type: "GET",
      url: "http://jangkoo.com/projects/dota/leaderboards.php?division="+target.substr(1),
      error: function(data){
        alert("There was a problem");
      },
      success: function(data){
        
        var table = $('<table class="table table-hover"></table>');
        JSON.parse(data).leaderboard.map(function(value,index){
          table.append('<tr><td>' + value.name + '</td>' + '<td>' + value.solo_mmr + '</td>' + '</tr>');
        })
        $(target).html(table);
      }
  })
 }
})