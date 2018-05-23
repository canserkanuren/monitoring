//Menu event
document.addEventListener('DOMContentLoaded', function() {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener('click', function() {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

//jQuery
$(function() {
  $("#loadmore").click(function() {
    var temp = $('div[style="display: none; align-content: center;"]').slice(0, 10).attr('style', "display: flex");
    if (temp.length == 0) {
      $("#loadmore").attr('style', "display: none");
    }
  });

  $("#loadmoreusr").click(function() {
    var temp = $('div[style="display: none; align-content: right;"]').slice(0, 10).attr('style', "display: flex");
    if (temp.length == 0) {
      $("#loadmoreusr").attr('style', "display: none");
    }
  });
});
