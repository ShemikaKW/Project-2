$(function() {
  //Creating a new burger
  $("#create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    //created variable to save the input from form
    var newUser = {
      firstName: $("#firstName")
        .val()
        .trim(),
      lastName: $("#lastName")
        .val()
        .trim(),
      email: $("#email")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim()
    };

    // Send the POST request
    $.ajax("/api/user", {
      type: "POST",
      data: newUser
    }).then(function() {
      console.log("Created new user");
      // Reroute to search page
      $("#create-form").val("");
      window.location = "/search";
    });
  });
});
