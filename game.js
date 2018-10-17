$(document).ready(function () {

var funnyGif = ["what you talkin about", "Catch", "Game face", "Seriously", "wiggle", "cant get up", "Dangerous", "Excited"];

function displayGif(x) {
var searchTerm = $(this).attr("data-name");
console.log(x);
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x+ "&api_key=gNh4QzcjpRe4U2z2zyK7bairtLy3Q3WR&limit=10";

$.ajax({
    url: queryURL,
    method: "Get"
})

    .then(function(response) {
        var results = response.data;
        console.log(results);

        for (i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var gifImg = $("<img>");

            gifImg.attr("src", results[i].images.original_still.url);
            gifImg.attr("data-still", results[i].images.original_still.url);
            gifImg.attr("data-animate", results[i].images.original.url);
            gifImg.attr("data-state", "still");
            gifImg.attr("class", "gif-image");
            
            gifDiv.append(gifImg);

            $(".gif-here").prepend(gifDiv);
        }
})
}
// On page creation run "for" loop to generate buttons for items in array
function renderButton() {
    $(".gif-view").empty();
    
    for (i = 0; i < funnyGif.length; i++) {
        var b = $("<button>");
        b.addClass("gif");
        b.attr("data-name", funnyGif[i]);
        b.text(funnyGif[i]);
        $(".gif-view").append(b);
    }
}





// Create click function that takes value from search field and creates a button 

$(document).on("click", '#add-gif', function() {
event.preventDefault();

$(".gif-here").empty();

var gif = $("#gif-input").val().trim();
console.log(gif);
funnyGif.push(gif);

renderButton();
console.log(funnyGif);

displayGif(gif);


});

$(document).on("click", '.gif', function() {
    //event.preventDefault();
    var searchTerm = $(this).attr("data-name");
    console.log(this);
    $(".gif-here").empty();
    console.log("Click Me");
    
    displayGif(searchTerm);

});

    $(document).on("click", '.gif-image', function () {
    var state = $(this).attr("data-state");
    console.log(state);

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state","animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    });

renderButton();
// and displays 10 gifs in div field

// Create another click function that takes value of Giphy button clicked and puts 10 giphs in a allocated div
});