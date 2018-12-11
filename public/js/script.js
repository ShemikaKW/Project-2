/* eslint-disable no-irregular-whitespace */
function imageToBase64(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      // reader.result is the bsae64 string representing the file blob aka image data
      // will be passed to .then()
      resolve(reader.result);
    };
    reader.onerror = function(error) {
      reject(error);
    };
  });
}

function displayImgInBody2(base64ImgStr) {
  // Create elements
  var img = new Image();
  var canvas = $("<canvas>");

  // Set the image source
  img.src = base64ImgStr;
  // eslint-disable-next-line no-irregular-whitespace
  // eslint-disable-next-line no-irregular-whitespace

  // When the image loads
  img.onload = function() {
    canvas.height = img.height;
    canvas.width = img.width;

    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);

    // This will hold a base64 representation of the image
    var dataUrl = canvas.toDataURL("image/jpg");

    // Append the image to the DOM
    var newImg = $("<img>").attr("src", dataUrl);
    document.body.appendChild(newImg);
  };
}

$(document).ready(function() {
  $("#add-item").on("submit", function(event) {
    //Make sure to preventDefault on a submit event.
    event.preventDefault();

    var file = document.querySelector("input[type='file']").files[0]; //gets file from html

    imageToBase64(file)
      .then(function(data) {
        var itemInfo = {
          item: $("#item-name").val(),
          description: $("#item-description").val(),
          price: $("#item-price").val(),
          // data = the image as base64
          image: data,
          CategoryId: $("#new-item-catagory").val(),
          userId: sessionStorage.userID
        };

        displayImgInBody2(data);

        $.ajax({
          method: "POST",
          url: "/api/item",
          data: itemInfo
        })
          .then(function() {
            //redirect user
            window.location = "/search";
          })
          .catch(function(error) {
            console.log(
              "Error with PUT request to the backend: " + error.message
            );
          });
      })
      .catch(function(error) {
        console.log("Error converting image to base 64: " + error.message);
      });
  });
});
