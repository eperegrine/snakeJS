var canvas;
/** @type CanvasRenderingContext2D */
var ctx;

const deltaTime = 1/60;
const gridUnit = 50;

class RenderObject {
  position = {x:0, y:0}
  size = { width:50, height:50 }
  fillStyle = "blue"

  render() {
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
  }
}

class Snake extends RenderObject {
  position = {x:200, y:200}
  size = { width:50, height:50 }
  direction = { x: 1, y: 0 }
  speed = 1
  fillStyle = "green";

  interval = 1/4;
  counter = 0;

  tail = []

  lastPosition = {x:150, y:200};

  update() {
    this.counter += deltaTime;
    if (this.counter > this.interval) {
      this.lastPosition = {...this.position};
      this.counter = 0;
      for (var i = this.tail.length-1; i >= 0; i--) {
        if (i > 0) {
          this.tail[i].position = this.tail[i-1].position
        } else {
          this.tail[i].position = this.lastPosition;
        }
      }

      this.position.x += this.direction.x * gridUnit;
      this.position.y += this.direction.y * gridUnit;
    }

    this.render();
    this.tail.forEach(t => {
      t.render();
    });
  }

  addTail() {
    var newTail = new RenderObject();
    if (this.tail.length > 0) {
      newTail.position = this.tail[this.tail.length - 1].position
    } else {
      newTail.position = this.lastPosition;
    }
    console.log(newTail, this);
    // debugger;
    this.tail.push(newTail)
  }

}

var snake = new Snake();

window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left
      snake.direction = { x: -1, y: 0 };
    break;

    case 38: // Up
      snake.direction = { x: 0, y: -1 };
    break;

    case 39: // Right
      snake.direction = { x: 1, y: 0 };
    break;

    case 40: // Down
      snake.direction = { x: 0, y: 1 };
      break;
    case 32: //Space
      snake.addTail();
      break;
  }
}, false);

$(document).ready(function () {
  console.log("Hello, World!");

  canvas = document.getElementById("appCanvas");
  ctx = canvas.getContext("2d");

  requestAnimationFrame(render);

});

function render() {
  ctx.clearRect(0,0, canvas.width, canvas.height);

  // console.log("A");
  
  ctx.fillStyle = "black";  // darken display
  ctx.globalAlpha = 0.5;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.globalAlpha = 1;

  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, 50, 50);

  snake.update();

  requestAnimationFrame(render);
}

