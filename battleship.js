/* global createCanvas, colorMode, HSB, color, noStroke, fill, noFill, strokeWeight,
background, ellipse, text, stroke, line, globalS, globalB
width, height, mouseX, mouseY, rect, ellipse, random
mouseIsPressed, priorX, priorY, collideCircleCircle
keyCode, UP_ARROW, textSize, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, consol, collideRectCircle
drop1, drop2, drop, windowWidth, windowHeight, HSL, old_dots, Dot
sqrt, round, loadImage, image, createButton
*/

// Idea: create a "hidden" battleship and use hotter/colder to find it. 
// Clicking will draw a small which is the color of the warmer/colder in relation to the ship


let backgroundColor, spherePosition, rectPosition, mousePosition, battleship, isHit, shipImg, button, intro, fishImg



function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 5;
  
  //load image of the ship from assets folder
  shipImg = loadImage('https://cdn.glitch.com/68dc6901-a6d9-4e2a-b3d0-e72d8300793f%2Fbattleship.png?v=1627310701977');

  // load fish background image
  fishImg = loadImage('https://cdn.glitch.com/68dc6901-a6d9-4e2a-b3d0-e72d8300793f%2Ffish.jpeg?v=1627313053526')
  
  // create reset button
  button = createButton('Reset');
  button.mousePressed(resetGame);

  // This variable contains a JSON object
  // create a hidden battleship rectangle
  battleship = {
    "x": random(width), 
    "y": random(height)
  }
  
  // variable to keep track of whether to display the ship
  isHit = false;
  // variable to keep track of whether the intro is over
  intro = true;
}

function draw() {
  
  // TODO intro screen at the beginning with moving fish, key for colors
  if (intro) {
    background(fishImg);
    fill(color("yellow"));
    textSize(16);
    text("Press any key to begin.", width/2-80, height/2-40)
  }
    
  // Use this for warmer/colder from battleship
  mousePosition = {
    "x": mouseX,
    "y": mouseY
  }  
  
  // draw ship once we hit it
  if (isHit) {
    // shifting by -18, -18 moves the image to be over the red dot
    image(shipImg, battleship.x-18, battleship.y-18, 36, 36);
    fill(color('purple'))
    textSize(20);
    text("Congratulations, you found the ship!", width/2-150, 40);
  }
  
  //troubleshooting:
//  image(shipImg, 0, 0);
}

function computeDistance(point1, point2) {
  let answer = sqrt((point2.x-point1.x)**2 + (point2.y-point1.y)**2);
  return answer
}

function computeCategoryOfDistance(point1, point2) {
  // Return the color of warmer/colder
  let distance = computeDistance(point1, point2);
    
  if (distance < 10) { // hot - reddish
    // change isHit to true
    isHit = true;
    return color(0, 70, 100);
  } else if (distance < 40) { // med-hot orange?g
    return color(30, 70, 100);
  } else if (distance < 75) { // med- yellow
    return color(60, 70, 100);
  } else if (distance < 150) { // cool - green
    return color(120, 70, 100);
  } else { //ice cold - blue
    return color(240, 70, 100);
  }
}

function mousePressed() {
  // draw a circle in mouse location with color of warmer/colder relative to battleship
  
  //get color for the distance from the mouse location to battleship
  let tempColor = computeCategoryOfDistance(battleship, mousePosition);
  
  fill(tempColor);
  
  // draw a circle at the mouse position
  ellipse(mouseX, mouseY, 10)
  
}

function resetGame() {
  // change ship to new random location
  battleship.x = random(width);
  battleship.y = random(height);
  
  // reset the isHit variable
  isHit = false;
  
  // clear the background (redraw the background)
  drawGameStart();
  
}

// This will draw the black screen and the "click" text
function drawGameStart() {
    background(backgroundColor);
    // draw instructions
    fill(color('grey'));
    textSize(16);
    text("Click to find the battleship.", width/2 - 80, height/2);
}

function keyPressed() {
  if (intro) {
     drawGameStart();
  }
  intro = false;
}
