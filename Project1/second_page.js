var secondPage = function(p) {
    let xPos, yPos;
    let secondPageGif, arrowButton;

    p.preload = function() {
        secondPageGif = p.createImg('./data/IMG_2004.GIF');
    }

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        xPos = p.width / 2;
        yPos = p.height / 2;
        p.textFont('Courier');
        p.textAlign(p.CENTER, p.CENTER);
        p.rectMode(p.CENTER);

        // Setup GIF
        secondPageGif.position(xPos + p.width / 3.7, yPos - p.height / 5.2);
        secondPageGif.size(p.width / 5, p.height / 4);

        // Arrow button to switch to the third page
        arrowButton = p.createButton('→');
        arrowButton.style('font-size', '40px');
        arrowButton.style('background', 'none');
        arrowButton.style('border', 'none');
        arrowButton.style('color', 'white');
        arrowButton.style('cursor', 'pointer');
        arrowButton.position(p.width - 80, p.height - 80);
        arrowButton.style('outline', 'none');

        // Transition to third page
        arrowButton.mousePressed(function () {
            removeCurrentSketch();  // Remove this sketch before transitioning
            activeSketch = new p5(LightPage);      // Load the third page
        });
    }

    p.draw = function() {
        p.background(0);
        p.textSize(p.width / 30);
        p.fill(255);
        p.text('Click on the wires to connect them!', xPos, yPos);
    }

    function removeCurrentSketch() {
        p.remove();  // Remove the sketch
        secondPageGif.remove();  // Remove elements related to this sketch
        arrowButton.remove();
    }
}




//whole code was copied from chat gpt for debugging
//with own changes for the textSize, Gif & arrowButton and copied function and setup from Project1.js file
