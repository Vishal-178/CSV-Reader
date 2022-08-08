$("#footerData").after('<div id="nav"></div>');
// no of rows in the table
var rowsShown = 100;
var rowsTotal = $("#data tbody tr").length;
var numPages = rowsTotal / rowsShown;

function showPage(start, end) {
  for (i = start; i < end; i++) {
    var pageNum = i + 1;
    $("#nav").append('<a href="#" rel="' + i + '">' + pageNum + "</a>");
  }
}
// if the input field is empty then show all the rows in the table
if (numPages > 4) {
  showPage(0, numPages);
  $("#nav").append('<a href="#" id="next">&raquo;</a>');
} else {
  showPage(0, numPages);
}

$("#data tbody tr").hide();
$("#data tbody tr").slice(0, rowsShown).show();
$("#nav a:first").addClass("active");
$("#nav a").bind("click", function () {
  $("#nav a").removeClass("active");
  $(this).addClass("active");
  var currPage = $(this).attr("rel");
  var startItem = currPage * rowsShown;
  var endItem = startItem + rowsShown;
  $("#data tbody tr")
    .css("opacity", "0.0")
    .hide()
    .slice(startItem, endItem)
    .css("display", "table-row")
    .animate({ opacity: 1 }, 300);
});

// search functionality
$(document).ready(function () {
  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#dataBody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
