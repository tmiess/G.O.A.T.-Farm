//this is a list of the GOAT (Greatest of all Time) players in their respective sports.

var topics = ["michael jordan", "messi", "barry bonds", "tiger woods", "roger federer", "aaron rodgers", "dale earnhardt", "michael phelps", "usain bolt"];

function renderButtons() {

    $("#gifButtons").empty();

    for (var i = 0; i < topics.length; i++) {

        console.log("creating button for " + topics[i] + "...");

        //creates a new button for each athlete
        var newButton = $("<button>");

        // Adds a class of athlete to our button
        newButton.addClass("goat");

        // Adding a data-attribute
        newButton.attr("data-name", topics[i]);

        // Adding the button text
        newButton.text(topics[i]);
        console.log("button text is " + newButton.text());

        // Adding the button to the gifButton div
        $("#gifButtons").append(newButton);
        console.log(topics[i] + " button has been created");

    }
}

$(document).ready(function() {

    console.log("test.js connected");

    $(document).on("click", ".goat", function() {
        var person = $(this).text();
        alert("button works");
        console.log(person + "button works");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                //create new div for new gif
                var gifDiv = $("<div class='item'>");

                //create variable for gif rating
                var rating = results[i].rating;

                //create element to display rating
                var p = $("<p>").text("Rating: " + rating);

                //create image element for new gif
                var newGif = $("<img>");

                //create variable for animated gif url
                var animatedUrl = results[i].images.fixed_height.url;

                //create variable for still gif url
                var stillUrl = animatedUrl.replace(".gif", "_s.gif");

                //attatch attributes for new gif
                newGif.attr("src", stillUrl);
                newGif.attr("data-state", "still");
                newGif.attr("data-animate", animatedUrl);
                newGif.attr("data-still", stillUrl);
                newGif.attr("class", "gif");

                //prepend new gif and rating to previous gif and rating
                gifDiv.prepend(p);
                gifDiv.prepend(newGif);

                //display new gif to displayGif div
                $("#displayGifs").prepend(gifDiv);

            }
        });

    });

    $(document).on("click", ".gif", function() {

        var state = $(this).attr("data-state");
        console.log(this);

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        }

        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });

    $("#add-goat").on("click", function(event) {
        alert("button works");
        event.preventDefault();
        // This line grabs the input from the textbox
        var goat = $("#goat-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(goat);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    renderButtons();

});
