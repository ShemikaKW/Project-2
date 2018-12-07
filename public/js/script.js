$(document).ready(function() {
  function imageToBase64(file) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function(error) {
        reject(error);
      };
    });
  }
  //Form not created yet replace ".devor-form" with new form name
  $(".upload-form").on("submit", function(event) {
    event.preventDefault();

    var that = this;
    var img64 = " ";
    var file = document.querySelector("input[type='file']").files[0]; //gets file from html

    imagetobase64(file).then(function(data) {
      img64 = data;

      //User info needs to be changed with correct info.
      var itemInfo = {
        item_id: $(that)
          .children(".item_id")
          .val(),
        user: $(that)
          .children(".user_id")
          .val(),
        image: img64
      };

      function getImageToBase64(img) {
        //not sure if it should be "data" or "img"
        //Creates an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        //Copy the image contents to the canvas

        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);

        //This will hold a base64 representation of the image
        var dataUrl = canvas.toDataURL("image/jpg");

        // Append the image to the DOM
        var newImg = document.createElement("img");
        newImg.src = dataUrl;
        document.body.appendChild(newImg);
      }
    })();

    // (function() {
    //   // Create elements
    //   var img = new Image();
    //   var canvas = document.createElement("canvas");

    //   // Set the image source
    //   img.src = "img.jpg";

    //   // When the image loads
    //   img.onload = function() {
    //     canvas.height = img.height;
    //     canvas.width = img.width;

    //     var context = canvas.getContext("2d");
    //     context.drawImage(img, 0, 0);

    //     // This will hold a base64 representation of the image
    //     var dataUri = canvas.toDataURL("image/jpg");

    //     // Append the image to the DOM
    //     var newImg = document.createElement("img");
    //     newImg.src = dataUri;
    //     document.body.appendChild(newImg);
    //   };
    // })();

    $.ajax({
      method: "PUT",
      url: "/item/update",
      data: iteminfo
    }).then(function(data) {
      // reload page to display images in proper column
      location.reload();
    });
  });
});
