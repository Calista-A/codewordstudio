var bgSound;
var project1 = function(p) {
    let xPos, yPos;
    let leftGif, rightGif, arrowButton, playStopButton;

    p.preload = function() {
        leftGif = p.createImg('./data/IMG_2003.GIF');
        rightGif = p.createImg('./data/IMG_2003.GIF');
        if (!bgSound) {
            bgSound = p.loadSound('./data/bg.wav');
        }
    };

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        xPos = p.width / 2;
        yPos = p.height / 2;
        p.textFont('Courier');
        p.textAlign(p.CENTER, p.CENTER);
        p.rectMode(p.CENTER);

        // Setup GIFs
        leftGif.position(xPos - p.width / 3.4, yPos - p.height / 12);
        leftGif.size(p.width / 7, p.height / 7);

        rightGif.position(xPos + p.width / 6, yPos - p.height / 12);
        rightGif.size(p.width / 7, p.height / 7);

        // Play/Stop button to control the background sound
        playStopButton = p.createButton('Play Sound');
        playStopButton.style('font-size', '15px');
        playStopButton.style('cursor', 'pointer');
        playStopButton.style('background-color', 'grey');  
        playStopButton.style('border', 'none');  // Remove button border
        playStopButton.position(20, p.height - 40);  // Bottom left corner

        // Toggle play/stop functionality
        playStopButton.mousePressed(function() {
            if (bgSound.isPlaying()) {
                bgSound.stop();  // Stop the sound
                playStopButton.html('Play Sound');  // Update button text
            } else {
                bgSound.loop();  // Play the sound
                playStopButton.html('Stop Sound');  // Update button text
            }
        });

        // Arrow button to switch to the next page
        arrowButton = p.createButton('→');
        arrowButton.style('font-size', '40px');
        arrowButton.style('background', 'none');
        arrowButton.style('border', 'none');
        arrowButton.style('color', 'white');
        arrowButton.style('cursor', 'pointer');
        arrowButton.position(p.width - 80, p.height - 80);
        arrowButton.style('outline', 'none');

        // Transition to second page
        arrowButton.mousePressed(function () {
            removeCurrentSketch();  // Remove the current sketch
            activeSketch = new p5(secondPage);     // Load the second page
        });
    }

    p.draw = function() {
        p.background(0);
        p.textSize(p.width / 25);
        p.fill(255);
        p.text('Sharing', xPos, yPos - p.height / 7);
        p.text('is a', xPos, yPos - p.height / 24);
        p.text('moral', xPos, yPos + p.height / 17);
        p.text('imperative', xPos, yPos + p.height / 6.3);
    }

    function removeCurrentSketch() {
        p.remove();  // Remove the sketch
        leftGif.remove();  // Remove elements related to this sketch
        rightGif.remove();
        arrowButton.remove();
        playStopButton.remove();
    }
}


//whole code is from chat gpt, first builded by co-pilot with trial and errors
//bgsound button coppied from chat gpt, altered
//co-pilot helped in positioning text in split lines, with p5js rectMode function debug
