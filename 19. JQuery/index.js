$("h1").css("color", "red");

$(document).keydown(function(e) {
    $("h1").text(e.key);
})

