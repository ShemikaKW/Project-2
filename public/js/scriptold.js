/* eslint-disable no-irregular-whitespace */
function imageToBase64(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      // reader.result is the base64 string representing the file blob aka image data
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
  var canvas = document.createElement("canvas");

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
    var newImg = document.createElement("img");
    newImg.src = dataUrl;
    document.body.appendChild(newImage);
  };
}

$(document).ready(function() {
  $("#add-item").on("submit", function(event) {
    //Make sure to preventDefault on a submit event.
    event.preventDefault();

    // var that = $(this);
    // var img64 = " ";
    var file = document.querySelector("input[type='file']").files[0]; //gets file from html

    imageToBase64(file)
      .then(function(data) {
        // img64 = data;
        var itemInfo = {
          uname: $("uname-read").val(),
          item: $("#item-name").val(),
          CategoryId: $("#new-item-catagory").val(),
          description: $("#item-description").val(),
          price: $("#item-price").val(),
          // data = the image as base64
          image: data
        };
        displayImgInBody2(data);
        console.log("Before ajax");

        $.ajax({
          method: "POST",
          url: "/api/item",
          data: itemInfo
        })
          .then(function(data) {
            console.log("Response from the server:", data);
            // reload page to display images in proper column
            // location.reload();
          })
          .catch(function(error) {
            console.log(
              "There was an error with POST request to the backend",
              error.message
            );
          });
      })
      .catch(function(error) {
        console.log("Error converting image to base 64: " + error.message);
      });
  });
});
