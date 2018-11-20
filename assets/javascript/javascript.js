var movies = ["Avengers", "Pixars Cars", "Disney Frozen", "Finding Nemo", "The Incredibles"];



function createButtons() {
    $("#tags").empty();
    for(let i = 0; i < movies.length; i++) {
        var btn = $("<button>");
        btn.text(movies[i]);
        btn.attr("data-name", movies[i]);
        btn.addClass("movie");
        $("#tags").append(btn);
    }
}

$("#add-movie").on("click", function(event) {
    var movie = $("#movie-input").val().trim();
    movies.push(movie);
    createButtons();
});

$(document).on("click", ".movie", function(){
    var apiKey = "ySUTTjyxe3UcphMuiT2Lt9QbIhQWNJD6";
    var search = $(this).attr("data-name");
    var limit = 10;
    console.log(search);
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`;
    queryURL += `&q=${search}`
    queryURL += `&limit=${limit}`
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
        var data = response.data;
        for(var i = 0; i < data.length; i++) {
            var div = $("<div>");
            div.attr("style", `float: left`);
            div.addClass("gif-holder");

            var image = $("<img>");
            image.addClass("gif");
            image.attr("data-still", data[i].images.fixed_height_small_still.url);
            image.attr("data-animated", data[i].images.fixed_height_small.url);
            image.attr("data-state", "still");
            image.attr("src", data[i].images.fixed_height_small_still.url);
            image.attr("alt", "gif");
            div.append(image);

            div.prepend(`<div>Rating: ${data[i].rating}</div>`);
            
            // console.log(data[i].images.fixed_height_small.url)


            $("#gifs").prepend(div);
        }
    });
});

createButtons();

$("#gifs").on("click", ".gif", function() {
    if($(this).attr("data-state") === "still") {
        console.log($(this).attr("data-animated"));
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#clear-gifs").on("click", function(){
    $("#gifs").empty();
});