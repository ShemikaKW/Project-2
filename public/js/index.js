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
      //email unique violation
      if (data.name === "SequelizeUniqueConstraintError") {
        $("#Signup-Error-Modal").modal("show");
      } else {
        //store user id
        sessionStorage.setItem("userID", parseInt(data.id));

        // Reroute to search page
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
        $("#InvalidPassword-Error-Modal").modal("show");
      } else if (data === "No Account") {
        $("#NoAccount-Error-Modal").modal("show");
      } else {
        //store user id
        sessionStorage.setItem("userID", parseInt(data.id));

        //redirect user
        window.location = "/search";
      }
    });
  });
});

$(document).ready(function() {
  //Hides certain nav buttons if the user is logged in or has created an account
  if (!sessionStorage.userID) {
    $("#searchNav, #postNav").hide();
  } else {
    $("#loginNav").hide();
  }
});

$(document).ready(function() {
  $("#all-items").on("click", ".purchaseBtn", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var itemId = parseInt($(this).data("id"));
    // Send the POST request to login
    $.ajax("/api/item/" + itemId, {
      type: "PUT"
    }).then(function() {
      //redirect user
      window.location = "/search";
    });
  });
});
