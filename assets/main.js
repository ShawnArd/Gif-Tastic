//having trouble incorporating the stop and starting on click, so that would be next

//much of the base code started as activities from trilogy eductions class work

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
    
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
     //getting results and looping through to create multiple items
      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag and adding a class so you can float the gifs
        var animeDiv = $("<div class='gif-style'>");

      
        var p = $("<p>").text("Rating: " + results[i].rating);

        
        var animeImage = $("<img>");
        
        animeImage.attr("src", results[i].images.fixed_height.url);

        
        animeDiv.append(p);
        animeDiv.append(animeImage);

        
        $("#gif-display").prepend(animeDiv);
      }
    });
});

