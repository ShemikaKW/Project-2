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

// function displayImgInBody(base64ImgStr) {
//  // create an image tag with data from the base 64 image
//  var img = $("<img />");
//  img.src = base64ImgStr;

//  //not sure if it should be "data" or "img"
//  //Creates an empty canvas element
//  var canvas = document.createElement("canvas");
//  canvas.width = img.width;
//  canvas.height = img.height;

//  //Copy the image contents to the canvas

//  var context = canvas.getContext("2d");
//  context.drawImage(img, 0, 0);

//  //This will hold a base64 representation of the image
//  var dataUrl = canvas.toDataURL("image/jpg");

//  // Append the image to the DOM
//  var newImg = document.createElement("img");
//  newImg.src = dataUrl;
//  document.body.appendChild(newImg);
// }

/*
   function displayImgInBody2(base64ImgStr) {
    // Create elements
    var img = new Image();
    var canvas = document.createElement("canvas");
   ​
    // Set the image source
    img.src = base64ImgStr;
   // eslint-disable-next-line no-irregular-whitespace
   // eslint-disable-next-line no-irregular-whitespace
   ​
    // When the image loads
    img.onload = function() {
     canvas.height = img.height;
     canvas.width = img.width;
   ​
     var context = canvas.getContext("2d");
     context.drawImage(img, 0, 0);
   ​
     // This will hold a base64 representation of the image
     var dataUri = canvas.toDataURL("image/jpg");
   ​
     // Append the image to the DOM
     var newImg = document.createElement("img");
     newImg.src = dataUri;
     document.body.appendChild(newImg);
    };
   }
   */

$(document).ready(function() {
  //Form not created yet replace ".devor-form" with new form name
  $(".upload-form").on("submit", function(event) {
    event.preventDefault();

    var that = this;
    var file = document.querySelector("input[type='file']").files[0]; //gets file from html

    imageToBase64(file).then(function(data) {
      //User info needs to be changed with correct info.
      var itemInfo = {
        // this was item_id, we changed it to item
        item: $(that)
          .children(".item-name")
          .val(),
        user: $(that)
          .children(".user_id")
          .val(),
        // data = the image as base64
        image: data
      };

      // TODO: do we need this?
      // displayImgInBody(data);
      $("#add-iem").on("submit", function() {
        var file = $("item-file").files[0];

        convertImgToBase64(file)
          .then(function(base64Data) {
            $.ajax({
              method: "POST",
              url: "/api/items",
              data: {
                name: $("#item-name").val(),
                descrition: $("#item-description").val(),
                price: $("#item-price").val(),
                image: base64Data
              }
            })
              .then(function(data) {
                console.log("Response from the server:", data);
                // reload page to display images in proper column
                location.reload();
              })
              .catch(function(error) {
                console.log(
                  "There was an error with PUT request to the backend",
                  error.message
                );
              });
          })
          .catch(function(error) {
            console.log("Error converting image to base 64: " + error.message);
          });
      });
    });
  });
});
