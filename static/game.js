let words = [
	{
		inputs: 5,
		category: "Sports",
		word: "chess",
	},
	{
		inputs: 5,
		category: "Intrument",
		word: "piano",
	},
];

var gameOver = false;
var correctGuess = false;

$(document).ready(function () {
	getTemplates();
});
function getTemplates() {

	$.ajax({
		type: "get",
		url: "/get-template",
		success: function (result) {
	console.log("randomWord");

			fillBlanks(result.word);
		},
		error: function (e) {
			alert(e.responseJSON.message);
		},
	});
}
function fillBlanks(randomWord) {
	console.log(randomWord);
	for (var i = 0; i < randomWord.word.length; i++) {
		let html = `<span class="fill_blanks"> _ </span>`;
		$("#blanks").append(html);
	}
	$("#Hint").text(randomWord.category);

	$(".clickable").click(function () {
		var id = $(this).attr("id");
		var lifes = parseInt($("#life").text());
		for (var i = 0; i < randomWord.word.length; i++) {
			console.log(randomWord.word[i]);
			console.log(id);
			if (randomWord.word[i].toLowerCase() == id) {
				if (lifes > 0 && $(".fill_blanks").eq(i).text() == " _ ") {
					$(".fill_blanks").eq(i).text(id);
					correctGuess = true;
					if ($("#blanks").text() == randomWord.word.toLowerCase()) {
						$("#result").text("You Win!!");
						correctGuess = true;
						gameOver = true;
					}

					break;
				}
			} else if (lifes > 0 && correctGuess == false && gameOver == false) {
				lifes = lifes - 1;

				$("#life").text(lifes);
				break;
			}
			if (lifes == 0) {
				$("#result").text("You Lost");
			}
		}
	});
}
