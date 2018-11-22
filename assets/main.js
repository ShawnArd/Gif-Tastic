// $(".gif").on("click", function() {
//     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//     var state = $(this).attr("data-state");
//     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//     // Then, set the image's data-state to animate
//     // Else set src to the data-still value
//     if (state === "still") {
//       $(this).attr("src", $(this).attr("data-animate"));
//       $(this).attr("data-state", "animate");
//     } else {
//       $(this).attr("src", $(this).attr("data-still"));
//       $(this).attr("data-state", "still");
//     }
//   });


//   $("button").on("click", function() {
//     // Grabbing and storing the data-animal property value from the button
//     var animal = $(this).attr("data-animal");

//     // Constructing a queryURL using the animal name
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//       animal + "&api_key=dc6zaTOxFJmzC&limit=10";

//     // Performing an AJAX request with the queryURL
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//       // After data comes back from the request
//       .then(function(response) {
//         console.log(queryURL);

//         console.log(response);
//         // storing the data from the AJAX request in the results variable
//         var results = response.data;

//         // Looping through each result item
//         for (var i = 0; i < results.length; i++) {

//           // Creating and storing a div tag
//           var animalDiv = $("<div>");

//           // Creating a paragraph tag with the result item's rating
//           var p = $("<p>").text("Rating: " + results[i].rating);

//           // Creating and storing an image tag
//           var animalImage = $("<img>");
//           // Setting the src attribute of the image to a property pulled off the result item
//           animalImage.attr("src", results[i].images.fixed_height.url);

//           // Appending the paragraph and image tag to the animalDiv
//           animalDiv.append(p);
//           animalDiv.append(animalImage);

//           // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
//           $("#gifs-appear-here").prepend(animalDiv);
//         }
//       });
//   });

var animeShows = ["Cowboy Bebop", "Dragon Ball Z", "Sailor Moon"]

// console.log("here")

function renderButtons(){

	$("#gif-btn").empty();
	for(var i = 0; i < animeShows.length; i++){
		var animeBtn = $("<button>").text(animeShows[i]).addClass('animeBtn').attr({'data-name': animeShows[i]});
		$("#gif-btn").append(animeBtn);
  }
//   console.log("here")
 }
$("#add-anime").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var anime = $("#anime-input").val().trim();
  // The movie from the textbox is then added to our array
  animeShows.push(anime);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});
renderButtons(); 

$(document).on("click", ".animeBtn", function() {

  $("#gif-display").empty();
  
  var anime = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    anime + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing an AJAX request 
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var animeDiv = $("<div class='gif-style'>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var animeImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        animeImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the animalDiv
        animeDiv.append(p);
        animeDiv.append(animeImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gif-display").prepend(animeDiv);
      }
    });
});

//having trouble incorporating the stop and starting on click, so that would be next