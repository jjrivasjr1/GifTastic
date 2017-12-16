// alert("touch down");
// Initial array of cars
var cars = ["Ferrari Enzo", "Lamborgini Aventador", "Bently GT", "Rolls Royce wraith"];
//Displays Auto Mobile Gifs

 $('#cars-view').on("click", "img", function(){
    console.log("clicked");
        if ($(this).attr("data-state") == "still"){
            // var imageNumber = $(this).attr("id");
            // var gifUrl = $("#gifImage" + imageNumber).val();
            var animate = $(this).attr("data-animate");
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        } else {
            var still = $(this).attr("data-still");
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
    });



function displayCarGif(){
  
  var carName = $(this).attr("data-name");
  // URL constructed
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+ carName+"&limit=10&rating=pg";

        // Creates AJAX call to run the giphy API
        $.ajax({
          url: queryURL,
          method: "GET"
        }).
        //store all of the retreved dat inside of a object called "response"
        done(function(response) {
          console.log(response);
          $("#cars-view").empty();
          for(y=0;y<response.data.length; y++){

          var carDiv = $("<div>");

          carDiv.addClass('');

          var url = response.data[y].images.fixed_height_still.url;
         
          //element to hold the image
          var image = $("<img>");

          image.attr("src", url);

          image.attr("id",y);
          
          image.attr("data-state", "still");

          image.attr("data-still", url);

          image.attr("data-animate",response.data[y].images.fixed_height.url);

          //rating display
          var rated =response.data[y].rating;

          var rating = $("<p>").text("Rating: " + rated);

          //still image display
          var stillImage = $("<input>").attr("type", "hidden");

          stillImage.val(url);

          stillImage.attr("id", "stillImage"+y);


          var gifImage = $("<input>").attr("type", "hidden");

          gifImage.val(response.data[y].images.fixed_height.url);

          gifImage.attr("id","gifImage"+y);

          carDiv.append(rating);
          carDiv.append(image);
          carDiv.append(gifImage);
          carDiv.append(stillImage);

          $("#cars-view").prepend(carDiv);
          }
         
        });



}

//alert(carName);
 

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

      $(document).on("click", ".car", displayCarGif);

      renderButtons();

