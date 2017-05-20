// GIPHY.js

var topics = ["Woody Woodpecker", "Voltron", "Dragon Ball Z"];
var myLimit = 10;
// var myRating = "y";



function makeGifs(buttonText) {
        var imgDiv;

        var myQueryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonText + "&limit=" + myLimit + "&api_key=dc6zaTOxFJmzC";
        console.log(buttonText);
        $.ajax({
            url: myQueryURL,
            method: "GET"
        }).done(function(response) {
            imgDiv = $("<div></div>");
            $("#myObject").append(imgDiv);            

            for (count = 0; count < myLimit; count++) {
                var imgFrame = $("<figure></figure>");
                var myImageStillURL = response.data[count].images.original_still.url;
                var myImageAniURL = response.data[count].images.original.url;
                var myImageRating = response.data[count].rating;
                var myImage = $("<img>");

                console.log(response.data[count].id);
                console.log(response.data[count].rating);

                myImage.attr("src", myImageStillURL);
                myImage.attr("still", myImageStillURL);
                myImage.attr("moving", myImageAniURL);
                myImage.attr("status", "stop");

                myImage.addClass("imageStyle");

                myImage.on("click", function() {
                    var typeTest = this.src;
                    if ($(this).attr("status") === "stop") {
                        $(this).attr("src", $(this).attr("moving"));
                        $(this).attr("status", "go");
                    } else {
                        $(this).attr("src", $(this).attr("still"));
                        $(this).attr("status", "stop");
                    };
                });

                imgFrame.addClass("picFrame");
                imgFrame.append(myImage);
                imgFrame.append("<figcaption>" + "Rating: " + myImageRating + "</figcaption>");

                imgDiv.append(imgFrame);
            };
        });
        $("#myObject").append(imgDiv);
    };





// create buttons
function createGifButtons() {

for (btnCount = 0; btnCount < topics.length; btnCount++) {
    var btnName = topics[btnCount];
    var newButton = $("<button>").attr("type", "button");
    newButton.html(btnName);
    newButton.addClass("myBtn");
    newButton.on("click", function() {
        var buttonText = $(this).text();
        console.log(this);
        makeGifs(buttonText);
    });
    $("#myButtons").append(newButton);
};
}


function clearMyButtons() {

	$("#myButtons").empty();
}


function createBtnAction() {



	var theCreateBtn = $("#createBtn");
	theCreateBtn.on("click", function() {
			
			var btnText = ($("#yourNewBtn").val().trim());

			if(btnText != "") {

				$("#message").html("TIM BYNUM");
				console.log(btnText);
				topics.push(btnText);
				console.log(topics);
				clearMyButtons();
				createGifButtons();
			}
			else {
				$("#message").html("NULL !!!!!!!");
				console.log(btnText);
			}

			$("#yourNewBtn").val("");



			
				

	});


}

// ----------------------------------------------------------------------------------------------

createBtnAction();
createGifButtons();