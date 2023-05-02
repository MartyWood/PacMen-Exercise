var pos = 0;
const pacArray = [
  ['./images/pacman1.png', './images/pacman2.png'],
  ['./images/pacman3.png', './images/pacman4.png'],
];
var direction = 0;
const pacMen = [];

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
// Factory to make PacMen
function makePac() {
  // Returns an object with values scaled {x: 33, y: 21}  Math.random function returns 0-1 and scaled returns 0-10 or 0-200 
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  // Add image to div id 'game'
  let game = document.getElementById('game');
  // Create new image
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  // Can create different images by inserting below
  newimg.src = './images/pacman1.png';
  newimg.width = 100;
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  // New image appended to the div id 'game'
  game.appendChild(newimg);
  // New style of creating an object.  Make PacMan, keep track and return velocity and position
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // Loop over pacMen array, check updated position for collision and updated each position and update image in DOM.  Velocity might come back minus velocity to bounce back from edge of screen.  setTimeout update function is calling itself every 20ms
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

// Adding velocity, how much position will change, need to add width of image
function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  )
    item.velocity.x = -item.velocity.x;
  if (
    item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0
  )
    item.velocity.y = -item.velocity.y;
}

// Add a new PacMan by calling makePac function returns a value that is pushed into the pacMen array
function makeOne() {
  pacMen.push(makePac());
}

// Don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
