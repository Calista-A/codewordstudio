var LightPage = function(p) {
    let offLt, offLb, offMid, offRt, offRb;
    let onLt, onLb, onMid, onRt, onRb;

    // Track the state of each button
    let buttonStates = {
        Lt: false,  // Initially off
        Lb: false,  // Initially off
        Mid: false, // Initially off
        Rt: false,  // Initially off
        Rb: false   // Initially off
    };

    let clickedButtons = [];
    let connectors = [];

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
    };

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0);
    };

    p.draw = function() {
        p.background(0);

        // Draw buttons based on their state (on or off)
        drawButton('Lt', 3, 0, p.width / 3, p.height / 2.3, offLt, onLt);
        drawButton('Lb', 0, p.height / 2, p.width / 2, p.height / 2, offLb, onLb);
        drawButton('Mid', p.width / 4, p.height / 3, p.width / 2, p.height / 3.3, offMid, onMid);
        drawButton('Rt', p.width / 1.5, 0, p.width / 3, p.height / 2, offRt, onRt);
        drawButton('Rb', p.width / 1.805, p.height / 2, p.width / 2.2, p.height / 2, offRb, onRb);

        // Draw all connectors that have been activated
        for (let conn of connectors) {
            drawConnector(conn.start, conn.end);
        }
    };

    p.mousePressed = function() {
        // Check for clicks on buttons
        let x = p.mouseX;
        let y = p.mouseY;

        // Lt button area
        if (x > 3 && x < (3 + p.width / 3) && y > 0 && y < p.height / 2.3) handleClick('Lt');
        // Lb button area
        else if (x > 0 && x < p.width / 2 && y > p.height / 2 && y < p.height) handleClick('Lb');
        // Mid button area
        else if (x > p.width / 4 && x < p.width / 2 + p.width / 4 && y > p.height / 3 && y < p.height / 3 + p.height / 3.3) handleClick('Mid');
        // Rt button area
        else if (x > p.width / 1.5 && x < p.width && y > 0 && y < p.height / 2) handleClick('Rt');
        // Rb button area
        else if (x > p.width / 1.805 && x < p.width && y > p.height / 2 && y < p.height) handleClick('Rb');
    };

    // Function to handle button clicks
    function handleClick(buttonName) {
        // If this button is already on, do nothing
        if (buttonStates[buttonName]) return;

        // Add this button to the clicked list
        clickedButtons.push(buttonName);

        // If two buttons are clicked, turn them both on and draw the connector
        if (clickedButtons.length === 2) {
            let [first, second] = clickedButtons;

            // Turn on both buttons
            buttonStates[first] = true;
            buttonStates[second] = true;

            // Draw the connector between the two buttons
            connectors.push({ start: first, end: second });

            // Reset clicked buttons for the next pair
            clickedButtons = [];
        }
    }

    // Function to draw buttons (either on or off state)
    function drawButton(buttonName, x, y, w, h, offImage, onImage) {
        if (buttonStates[buttonName]) {
            p.image(onImage, x, y, w, h);  // Draw "on" state
        } else {
            p.image(offImage, x, y, w, h); // Draw "off" state
        }
    }

    // Function to draw the connector line between two buttons
    function drawConnector(start, end) {
        let startPos = getButtonPosition(start);
        let endPos = getButtonPosition(end);

        p.stroke(255);  // White connector line
        p.strokeWeight(3);
        p.line(startPos.x, startPos.y, endPos.x, endPos.y);
    }

    // Get the center position of a button for drawing connectors
    function getButtonPosition(buttonName) {
        switch (buttonName) {
            case 'Lt':
                return { x: 3 + p.width / 6, y: p.height / 4 };
            case 'Lb':
                return { x: p.width / 4, y: p.height * 3 / 4 };
            case 'Mid':
                return { x: p.width / 2, y: p.height / 2 };
            case 'Rt':
                return { x: p.width * 5 / 6, y: p.height / 4 };
            case 'Rb':
                return { x: p.width * 3 / 4, y: p.height * 3 / 4 };
        }
    }
};
