// to start we need to onclick event where it starts and removes 
// Set up the structure
// Show the questions
// On submit, show the results
// Put it all together

$('#start').on('click', function () {
    $('#start').remove();
    game.loadQuestions();
})
var timer;

$(document).on("click", '#start-over', function () {
    console.log("uploadAgain");

    game.reset();

});

$(document).on("click", '.ansButton', function (e) {
    game.clicked(e);
});

$(document).on("click", "#start", function () {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>20</span> Seconds</h2>");
    game.loadQuestions();
});


var questions = [
    {
        questions: " When does Mary Poppins say she will leave the Banks’ house?",
        answers: ["When the Wind Changes", "At 12:00pm", "When bert comes", "When she wants to"],
        correctAnswers: "When the Wind Changes",
        image: "assets/images/flyingmp.png"
    },
    {
        questions: "What animal does the sultan’s throne resemble in Aladdin?",
        answers: ["A cobra", "An elephant", " Monkey", "A tiger"],
        correctAnswers: "An elephant",
        image: "assets/images/LightheartedEnlightenedCollardlizard-size_restricted.gif"
    }, {
        questions: "In Toy Story, what game does the slinky play?",
        answers: ["Cards", "Catch", "Chess", "Checkers"],
        correctAnswers: "Checkers",
        image: "assets/images/ts.gif"
    }, {
        questions: "In Mary Poppins, what animal was on the end of Mary Poppins’ umbrella that spoke?",
        answers: ["Penguin", "Parrot", "Pegion", "Puffin"],
        correctAnswers: "Parrot",
        image: "assets/images/parrot.jpg"
    }, {
        questions: "In Alice in Wonderland, what is the name of Alice’s kitten?",
        answers: ["Kitty", "rosy", "Dinah", "Kitty-Kitty"],
        correctAnswers: "Dinah",
        image: "assets/images/200.webp",
    }, {
        questions: "What time does the royal ball start in Cinderella?",
        answers: ["8:00 P.M", "12:00 P.M", "9:00 P.M", "10: P.M"],
        correctAnswers: "8:00 P.M",
        image: "assets/images/cinderalla giphy.gif"
    }, {
        questions: "What animal does Jafar turn into during his fight with Aladdin? ",
        answers: ["A Bird", "A Dragon", "A Monkey", "A Cobra"],
        correctAnswers: "A Cobra",
        image: "assets/images/snake.gif"
    }, {
        questions: "What was the first Mickey Mouse cartoon made in color?",
        answers: ["The Band Concert", "Plane Crazy", "The Gallopin' Gaucho", "Mickey mouse club house"],
        correctAnswers: "The Band Concert",
        image: "assets/images/source.gif"
    }, {
        questions: "Which is the only Disney animated film with a main character that doesn’t speak?",
        answers: ["Bambi", "Dumbo", "the frog", "Crocodile(peter pan"],
        correctAnswers: "Dumbo",
        image: "assets/images/dumbo.webp"
    }, {
        questions: " What two animals always antagonize Donald Duck?",
        answers: ["Two raccoons", "Two squirrels", "Two chipmunks", "Two beavers"],
        correctAnswers: "Two chipmunks",
        image: "assets/images/dd.gif"
    }
];

var game = {
    questions: questions,
    currentQuestions: 0,
    counter: 20,
    incorrect: 0,
    correct: 0,

    countdown: function () {
        game.counter--;
        $('#counterNumber').html(game.counter);
        if (game.counter <= 0) {
            console.log("Time Up!")
            game.timesUp();
        }

    },
    loadQuestions: function () {
        timer = setInterval(game.countdown, 1000);
        $('#subwrapper').html('<h2>' + questions[game.currentQuestions].questions + '</h2>');
        for (var i = 0; i < questions[game.currentQuestions].answers.length; i++) {
            $('#subwrapper').append('<button class="ansButton" id="button- ' + i + ' " data-name="' + questions[game.currentQuestions].answers[i] + '">' + questions[game.currentQuestions].answers[i] + '</button>');
        }
    },
    nextQuestion: function () {
        game.counter = 20;
        $("#counterNumber").html(game.counter);
        game.currentQuestions++;
        game.loadQuestions();

    },
    timesUp: function () {
        clearInterval(timer);
        // Game.unAnswered++
        $("#counterNumber").text(game.counter);
        $("#subwrapper").html("<h2>Out of time!</h2>");
        $("#subwrapper").append("<h3>The correct answer was " + questions[game.currentQuestions].correctAnswers + "</h3> ");
        $("#subwrapper").append("<img src='" + questions[game.currentQuestions].image + "'/>");
        if (game.currentQuestions === questions.length -1) {
            setTimeout(game.results,3000);
        } else {
            setTimeout(game.nextQuestion,3000);
        }
    },
    results: function () {
        clearInterval(timer);
        $("#subwrapper").html("<h2> All Done! </h2>");
        $("#counterNumber").text(game.counter);
        $("#subwrapper").append("<h3>Correct Answers: " + game.correct + "</h3>");
        $("#subwrapper").append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        $("#subwrapper").append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
        $("#subwrapper").append("<br><button id='start-over'>Start Over</button>");
    },
    clicked: function (e) {
        clearInterval(timer);
        if (e.target.dataset.name === questions[game.currentQuestions].correctAnswers) {
            game.answeredCorrectly();
        }
        else {
            game.answeredIncorrectly();
        }
    },

    answeredCorrectly: function () {
        console.log("you got it!");
        clearInterval(timer);
        game.correct++;
        $("#subwrapper").html("<h2>Correct Answer!</h2>");
        $("#subwrapper").append("<img src='" + questions[game.currentQuestions].image + "' />");
        if (game.currentQuestions === questions.length - 1) {
            setTimeout(game.results,3000);
        }
        else {
            setTimeout(game.nextQuestion,3000);
        }
    },
    answeredIncorrectly: function () {
        console.log("oops!");
        clearInterval(timer);
        game.incorrect++;
        $("#subwrapper").html("<h2>You got it wrong!</h2>");
        $("#subwrapper").append("<img src='" + questions[game.currentQuestions].image + "' />");

        if (game.currentQuestions === questions.length - 1) {
            setTimeout(game.results,3000);
        }
        else {
            setTimeout(game.nextQuestion,3000);
        }
    },

    reset: function () {
        game.currentQuestions = 0;
        game.counter = counterNumber;
        game.correct = 0;
        game.incorrect = 0;
        game.loadQuestions();
    }

};









