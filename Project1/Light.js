var bgSound;
var LightPage = function(p) {
    let offLt, offLb, offMid, offRt, offRb;
    let onLt, onLb, onMid, onRt, onRb;
    let a, b, c, d, e, f, g, h, i, j;

    // Track the clicked buttons
    let clickedButtons = [];
    let permanentlyOn = [];  // Track buttons that should stay "on" after clicking
    let showAlphabet = {a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false, i: false, j: false};

    p.preload = function() {
        // Load off button images
        offLt = p.loadImage('./data/LtopOff.PNG');
        offLb = p.loadImage('./data/LtomOff.PNG');
        offMid = p.loadImage('./data/MidOff.PNG');
        offRt = p.loadImage('./data/RtopOff.PNG');
        offRb = p.loadImage('./data/RtomOff.PNG');

        // Load on button images
        onLt = p.loadImage('./data/LtopOn.PNG');
        onLb = p.loadImage('./data/LtomOn.PNG');
        onMid = p.loadImage('./data/MidOn.PNG');
        onRt = p.loadImage('./data/RtopOn.PNG');
        onRb = p.loadImage('./data/RtomOn.PNG');

        // Load alphabet connectors
        a = p.loadImage('./data/A.PNG');
        b = p.loadImage('./data/B.PNG');
        c = p.loadImage('./data/C.PNG');
        d = p.loadImage('./data/D.PNG');
        e = p.loadImage('./data/E.PNG');
        f = p.loadImage('./data/F.PNG');
        g = p.loadImage('./data/G.PNG');
        h = p.loadImage('./data/H.PNG');
        i = p.loadImage('./data/I.PNG');
        j = p.loadImage('./data/J.PNG');
        
        bgSound = p.loadSound('./data/bg.wav');
    };

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0);
        
        // Play/Stop button to control the background sound
        playStopButton = p.createButton('Play Sound');
        playStopButton.style('font-size', '15px');
        playStopButton.style('cursor', 'pointer');
        playStopButton.style('background-color', 'grey');  
        playStopButton.style('border', 'none');  // Remove button border
        playStopButton.position(20, p.height - 30);  // Bottom left corner

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

    p.draw = function() {
        p.background(0);
        p.noFill();
        p.stroke(255);
        p.strokeWeight(3);

        // Display off buttons if they are not permanently on
        if (!permanentlyOn.includes('Lt')) p.image(offLt, 3, 0, p.width / 3, p.height / 2.3);
        if (!permanentlyOn.includes('Lb')) p.image(offLb, 0, p.height / 2, p.width / 2, p.height / 2);
        if (!permanentlyOn.includes('Mid')) p.image(offMid, p.width / 4, p.height / 3, p.width / 2, p.height / 3.3);
        if (!permanentlyOn.includes('Rt')) p.image(offRt, p.width / 1.5, 0, p.width / 3, p.height / 2);
        if (!permanentlyOn.includes('Rb')) p.image(offRb, p.width / 1.805, p.height / 2, p.width / 2.2, p.height / 2);

        // Display on buttons for permanently clicked ones
        if (permanentlyOn.includes('Lt')) p.image(onLt, 3, 0, p.width/2.5, p.height/2.3);
        if (permanentlyOn.includes('Lb')) p.image(onLb, 0, p.height/2, p.width/2, p.height/2);
        if (permanentlyOn.includes('Mid')) p.image(onMid, p.width/4.8, p.height/4.8, p.width/1.79, p.height/1.85);
        if (permanentlyOn.includes('Rt')) p.image(onRt, p.width/1.5, 0, p.width/3, p.height/2);
        if (permanentlyOn.includes('Rb')) p.image(onRb, p.width/1.805, p.height/2, p.width/2.2, p.height/2);

        // Display alphabet connectors based on clicks
        if (showAlphabet.a) p.image(a, p.width/4.22, 2, p.width/1.95, p.height/5);
        if (showAlphabet.b) p.image(b, p.width/20, p.height/5.5, p.width/4.25, p.height/4.21);
        if (showAlphabet.c) p.image(c, p.width/19, p.height/5.3, p.width/17, p.height/2.6);
        if (showAlphabet.d) p.image(d, p.width/18, p.height/5.2, p.width/1.85, p.height/1.6);
        if (showAlphabet.e) p.image(e, p.width/1.4, p.height/8, p.width/3.6, p.height/2.9);
        if (showAlphabet.f) p.image(f, p.width/1.06, p.height/8, p.width/15, p.height/2.3);
        if (showAlphabet.g) p.image(g, p.width/2.32, p.height/7.85, p.width/1.72, p.height/1.48);
        if (showAlphabet.h) p.image(h, p.width/13.4, p.height/3.05, p.width/4.7, p.height/4.8);
        if (showAlphabet.i) p.image(i, p.width/1.38, p.height/2.65, p.width/3.6, p.height/4.7);
        if (showAlphabet.j) p.image(j, p.width/2.34, p.height/1.33, p.width/5.9, p.height/11.8);
    };

    p.mousePressed = function() {
        // Check for clicks on buttons (both off and permanently on)
        let x = p.mouseX;
        let y = p.mouseY;

        // Lt button area
        if (x > 3 && x < (3 + p.width / 3) && y > 0 && y < p.height / 2.3) toggleButton('Lt');
        // Lb button area
        else if (x > 21 && x < p.width / 2 && y > p.height / 2 && y < p.height - 31) toggleButton('Lb');
        // Mid button area
        else if (x > p.width / 4 && x < p.width / 2 + p.width / 4 && y > p.height / 3 && y < p.height / 3 + p.height / 3.3) toggleButton('Mid');
        // Rt button area
        else if (x > p.width / 1.5 && x < p.width && y > 0 && y < p.height / 2) toggleButton('Rt');
        // Rb button area
        else if (x > p.width / 1.805 && x < p.width && y > p.height / 2 && y < p.height) toggleButton('Rb');
    };

    // Helper function to toggle buttons and track clicks
    function toggleButton(buttonName) {
        // Add clicked button to list (even if it is already permanently on)
        if (!clickedButtons.includes(buttonName)) {
            clickedButtons.push(buttonName);
        }

        // If two buttons are clicked, connect them and make any non-permanently on buttons stay on
        if (clickedButtons.length === 2) {
            let [first, second] = clickedButtons;

            // Ensure both buttons are set to stay on permanently
            if (!permanentlyOn.includes(first)) {
                permanentlyOn.push(first);
            }
            if (!permanentlyOn.includes(second)) {
                permanentlyOn.push(second);
            }

            // Show the connector between the two clicked buttons
            showConnector(first, second);

            // Clear clickedButtons to allow for new button pairs
            clickedButtons = [];
        }
    }

    // Function to show the correct alphabet connector
    function showConnector(first, second) {
        if ((first === 'Lt' && second === 'Rt') || (first === 'Rt' && second === 'Lt')) showAlphabet.a = true;
        if ((first === 'Lt' && second === 'Mid') || (first === 'Mid' && second === 'Lt')) showAlphabet.b = true;
        if ((first === 'Lt' && second === 'Lb') || (first === 'Lb' && second === 'Lt')) showAlphabet.c = true;
        if ((first === 'Lt' && second === 'Rb') || (first === 'Rb' && second === 'Lt')) showAlphabet.d = true;
        if ((first === 'Rt' && second === 'Mid') || (first === 'Mid' && second === 'Rt')) showAlphabet.e = true;
        if ((first === 'Rt' && second === 'Rb') || (first === 'Rb' && second === 'Rt')) showAlphabet.f = true;
        if ((first === 'Rt' && second === 'Lb') || (first === 'Lb' && second === 'Rt')) showAlphabet.g = true;
        if ((first === 'Mid' && second === 'Lb') || (first === 'Lb' && second === 'Mid')) showAlphabet.h = true;
        if ((first === 'Mid' && second === 'Rb') || (first === 'Rb' && second === 'Mid')) showAlphabet.i = true;
        if ((first === 'Rb' && second === 'Lb') || (first === 'Lb' && second === 'Rb')) showAlphabet.j = true;
    }
};
}

//starting and positioning
//function by chatgpt, altered using 2 prompts and mixing them together
//sound was copied from secondpage.js
