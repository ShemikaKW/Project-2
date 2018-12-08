//New user form
$(function() {
  //Creating a new User
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
    }).then(function(data) {
      console.log("Created new user " + data);
      if (data === 1) {
        console.log("data " + data);
        $("#Signup-Error-Modal").modal("show");
        // $("#Signup-Error-Modal").attr({
        //   class: "modal fade show",
        //   style: "block"
        // });
        // $("#Signup-Error-Modal").removeAttr("aria-hidden");
        $("#create-form").val("");
      } else {
        $("#create-form").val("");
        window.location = "/search";
      }
    });
  });
});

//Login Form
$(function() {
  //log in
  $("#create-login-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    //created variable to save the input from form
    var userLogin = {
      email: $("#email")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim()
    };

    // Send the POST request to login
    $.ajax("/api/login", {
      type: "POST",
      data: userLogin
    }).then(function(data) {
      if (data === "Incorrect Password") {
        alert("Invalid Password!");
      } else if (data === "No Account") {
        alert("No Account Found!");
      } else {
        window.location = "/search";
      }
    });
  });
});
