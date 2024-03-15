const ballContainer = document.getElementById("ballContainer");
var stack = 60;
var count = 0;
var ballUpCounter = 0;
var gameChances = 0;
var intervalId;

var numberArray = [1, 5, 8, 12, 15, 27, 17, 11, 19, 21]
var ticketCounter = 1;
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

function ballDown(ball) {
    gsap.to(ball, {
        duration: 3,
        ease: "power2.inOut",
        rotation: 360 * 9,
        motionPath: {
            path: [
                { x: -220, y: -300 },
                { x: -150, y: 35 },
                { x: 410, y: 60 },
            ],
            align: "#curve",
            transformOrigin:"left 100%",
        },
        onUpdate: function () {
            ball.style.transform = `translateY(${ball.y}px) rotate(${ball.rotation}deg)`;
        },
        onComplete: function () {
            count++;
            initialPosition += stack;

            gsap.to(ball, {
                // y: -(stack * count),
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
    document.getElementById("startButtonSphere").style.display = "none";
    startGame();
    moveBallContainer();
}

function createResultBars() {
    var existingImgs = document.getElementsByClassName('ballBars');
    var barsContainer = document.getElementsByClassName('barsContainer')[0];

    if (existingImgs.length > 0) {
        var existingImg = existingImgs[0];

        var newImg = document.createElement('img');

        newImg.src = existingImg.src;

        existingImg.classList.forEach(function (className) {
            newImg.classList.add(className);
        });

        var newLeft = 0;
        if (barsContainer.children.length > 0) {
            var previousElement = barsContainer.children[barsContainer.children.length - 1];
            var previousElementStyle = window.getComputedStyle(previousElement);
            var previousElementLeft = parseFloat(previousElementStyle.left);
            newLeft = previousElementLeft + 55;
        }
        newImg.style.left = newLeft + 'px';

        barsContainer.appendChild(newImg);
    }
}

function setResultBars() {
    if (ticketCounter != 1) {
        for (let i = 0; i < ticketCounter; i++) {
            createResultBars();
        }
    }
}

function moveBallContainer() {
    var ballContainer = document.querySelector("#ballContainer");

    if (ballContainer && ballContainer.children.length >= 5) {
        console.log("images available");

        var containerWidth = ballContainer.offsetWidth;
        var windowWidth = window.innerWidth;
        var newPosition = windowWidth - containerWidth - 20; // Adjust this value for desired spacing

        ballContainer.style.background = "red";
        ballContainer.style.left = newPosition + "px";

        var children = ballContainer.children;
        var columnWidth = 33;
        var spacing = 0;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var column = Math.floor(i / 5);
            var positionInColumn = i % 5;
            child.style.left = (column * columnWidth) + (positionInColumn * spacing)  + "px";
        }
    } else {
        console.log("images not available");
    }
}

setResultBars();
