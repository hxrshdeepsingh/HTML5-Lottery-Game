const ballContainer = document.getElementById("ballContainer");
var stack = 60;
var count = 0;
var ballUpCounter = 0;
var gameChances = 0;
var intervalId;

var numberArray = [1, 5, 8, 12, 15, 27, 17, 11, 19, 21]
var ticketCounter = 2;
var initialPosition = -360;

function createBallPipe() {
    var randomIndex = Math.floor(Math.random() * numberArray.length);
    var selectedNumber = numberArray[randomIndex];
    numberArray.splice(randomIndex, 1);

    const ball = document.createElement("img");
    ball.src = `./static/images/${selectedNumber}.png`;
    ball.className = "ball";
    ballContainer.appendChild(ball);
    return ball;
}

function ballUp() {
    const ball = createBallPipe();
    gsap.to(ball, {
        y: -450,
        rotation: 360,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: function () {
            ball.style.transform = `translateY(${ball.y}px) rotate(${ball.rotation}deg)`;
        },
        onComplete: function () {
            ballDown(ball);
        },
    });
}

var initalx = 410;
var initalruns = 0;

function ballDown(ball) {
    initalruns++;
    if (initalruns >= 1 && initalruns <= 5) {
        initalx = 410;
    } else if (initalruns > 5 && initalruns <= 10) {
        initalx = 483;
    }

    var path = [
        { x: -220, y: -300 },
        { x: -150, y: 35 },
        { x: initalx, y: 60 },
    ];

    gsap.to(ball, {
        duration: 3,
        ease: "power2.inOut",
        rotation: 360 * 9,
        motionPath: {
            path: path,
            align: "#curve",
            transformOrigin: "left 100%",
        },
        onUpdate: function () {
            ball.style.transform = `translateY(${ball.y}px) rotate(${ball.rotation}deg)`;
        },
        onComplete: function () {
            count++;
            initialPosition += stack;

            gsap.to(ball, {
                y: initialPosition,
                rotation: 0,
                duration: 1.5,
                ease: "bounce.out",
            });

            if (count >= 5) {
                endGame();
            }
        },
    });
}

function startGame() {
    gameChances++;
    count = 0;
    initialPosition = -360; // Reset initialPosition here
    setTimeout(function() {
        intervalId = setInterval(startBallUpInterval, 4000);
    }, 4000);
}

function startBallUpInterval() {
    if (ballUpCounter < 5 && gameChances <= ticketCounter) {
        ballUp();
        upPipe();
        ballUpCounter++;
    } else if (gameChances > ticketCounter) {
        endGame();
    }
}

function endGame() {
    clearInterval(intervalId);
    stopRotation();
    if (gameChances >= ticketCounter) {
        var buttonw = document.getElementById("startButtonSphere");
        buttonw.src = "https://lotto.loveetechnologies.com/Lotto-Machine-3/assets/over_button.png";
        buttonw.classList = "disabled";
        console.log("game is over!!!");
    } else {
        ballUpCounter = 0;
        document.getElementById("startButtonSphere").style.display = "block";
    }
}

function starter() {
    startRotation();
    addNewImageToBarsContainer();
    document.getElementById("startButtonSphere").style.display = "none";
    startGame();
}

function addNewImageToBarsContainer() {
    var newImage = document.createElement('img');
    newImage.classList.add('ballBars');
    newImage.src = "./assets/bar.png";

    var barsContainerParent = document.getElementById('barsContainerParent');
    if (barsContainerParent) {
        var barsContainer = barsContainerParent.querySelector('.barsContainer');
        if (barsContainer) {
            barsContainer.appendChild(newImage);
        }
    }
}

