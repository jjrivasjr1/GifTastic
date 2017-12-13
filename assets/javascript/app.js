// alert("touch down");
// Initial array of cars
var cars = ["Ferrari", "Lamborgini", "Bently", "Rolls Royce"];
//Displays Auto Mobile Gifs
function alertCarName(){
  var carName = $(this).attr("data-name");
  // URL constructed
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+ carName+"&limit=10";

        // Creates AJAX call to run the giphy API
        $.ajax({
          url: queryURL,
          method: "GET"
        }).
        //store all of the retreved dat inside of a object called "response"
        done(function(response) {
          console.log(response);
          for(y=0;y<response.data.length; y++){

          var carDiv = $("<div class='car'>");

          var imgURL = response.data[y].images.original.url;
          //element to hold the image
          var image = $("<img>").attr("src", imgURL);
          //Append the image
          carDiv.append(image);

          // var carImage = $("<img>");

         
          // carImage.attr("alt", "Car Image");

          $("#cars-view").prepend(carDiv);
          }
        });

  // alert(carName);
}

// Function for displaying movie data
      function renderButtons() {

        // Delete the content inside the movies-view div prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loop through the array of movies, then generate buttons for each movie in the array
        for (var i = 0; i < cars.length; i++){
          //Then dynamicaly generatingbuttons for each movie in the array.
          //This code $("<button") is all jquery need to create the start and end tag. (<button></button>)
          var a = $("<button>");
          //adding a class
          a.addClass("car");
          //adding a dat-atributewith a value of the movie at index i
          a.attr("data-name", cars[i]);
          //Providing the button's textwith a value of the movie at index i
          a.text(cars[i]);
          //Adding the button to the HTML
          $("#buttons-view").append(a);

        }

      }

     
      // displayMovieInfo function re-renders the HTML to display the appropriate content
      
      // function displayMovieInfo() {

      $("#add-car").on("click", function(event){

        event.preventDefault();
        //grab the text from the input box
        var car = $("#car-input").val().trim();
        //The car from the textbox is added to the array
        cars.push(car);
        
        renderButtons();

      });

      $(document).on("click", ".car", alertCarName);

      renderButtons();

     