const { ipcRenderer } = require("electron");
const Motor = require("./js/Motor.js").Motor;
const robot = require("robotjs");

class SimulatedMechanics {
  constructor() {
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.LineW = 0;
    this.filter = "blur(0px)";
    this.strokeStyle = "rgb(255, 255, 255)";

    this.ctx = this.canvas.getContext("2d");
    this.initListeners();
    this.buildMotors();
    this.draw();
  }

  initListeners() {
    window.addEventListener("resize", this.onResize.bind(this));

    ipcRenderer.on("requestounds", (event, bounds) => {
      console.log(bounds);
    });
    // ELECTRON MAIN THREAD MESSAGE

    //
    ipcRenderer.on("filter1", (event, message) => {
      document.body.style.backgroundColor = "rgb(51, 153, 255)";
      this.lineW = 100;
      this.filter = "blur(20px)";
      // this.strokeStyle = "rgb(0, 0, 0)";
    });
    ipcRenderer.on("filter2", (event, message) => {
      this.lineW = 170;
      this.filter = "blur(10px)";
      this.secondMotor.radius = "250";

      document.body.style.backgroundColor = "rgb(47, 215, 139)";
    });
    ipcRenderer.on("filter3", (event, message) => {
      document.body.style.backgroundColor = "rgb(255, 147, 38)";
      this.lineW = 70;
      this.filter = brightness(0.4);
      this.secondMotor.radius = "150";
    });
    ipcRenderer.on("filter4", (event, message) => {
      document.body.style.backgroundColor = "rgb(142, 255, 157)";
    });
    ipcRenderer.on("start", (event, message) => {
      robot.keyToggle("g", "down", "alt");
      this.reset();
      this.secondMotor.radius = "150";
      this.lineW = 70;
      this.filter = "blur(0px)";
      document.body.style.backgroundColor = "rgb(0, 0, 0)";

      setTimeout(() => {
        // AVOIR LA TOUCHE ALT APPUYEZ EN CONTINUE //
        console.log("2");
        robot.moveMouse(0, 1190); // 1. move mouse upon the window
        robot.mouseToggle("down", "left"); // 2. toggle left key, 'down'
        setTimeout(() => {
          robot.dragMouse(610, 910); // 3. drag window to (100, 100) from default (0, 0)
          robot.mouseToggle("up", "left"); // 4. toggle 'up'
        }, 100);
      }, 200);

      console.log("start");
    });
    ipcRenderer.on("1", (event, message) => {
      ipcRenderer.send("asynchronous-message", "createNewWindow");

      this.secondMotor.radius = "100";

      setTimeout(() => {
        robot.moveMouse(1020, 300); // 1. move mouse upon the window
        robot.mouseClick("left", true);
      }, 100);

      console.log("roboto");
    });

    ipcRenderer.on("2", (event, message) => {
      this.secondMotor.radius = "500";

      setTimeout(() => {
        robot.moveMouse(1020, 30); // 1. move mouse upon the window
        robot.mouseClick("left", true);
      }, 100);
    });

    // ipcRenderer.on("3", (event, message) => {
    //   setTimeout(() => {
    //     console.log("2");
    //     robot.moveMouse(1020, 25); // 1. move mouse upon the window
    //     robot.mouseToggle("down", "left"); // 2. toggle left key, 'down'
    //     setTimeout(() => {
    //       robot.dragMouse(1020, 300); // 3. drag window to (100, 100) from default (0, 0)
    //       robot.mouseToggle("up", "left"); // 4. toggle 'up'
    //     }, 500);
    //   }, 600);
    //   console.log("like");
    //   //   this.reset();
    //   this.secondMotor.speed = -1 * Math.min(message / 5, 10);
    // });

    ipcRenderer.on("3", (event, message) => {
      setTimeout(() => {
        robot.moveMouse(1020, 900); // 1. move mouse upon the window
        robot.mouseClick("left", true);
      }, 100);

      console.log("roboto");
    });

    ipcRenderer.on("4", (event, message) => {
      setTimeout(() => {
        robot.moveMouse(1020, 1190); // 1. move mouse upon the window
        robot.mouseClick("left", true);
      }, 100);
    });

    // ipcRenderer.on("6", (event, message) => {
    //   setTimeout(() => {
    //     robot.moveMouse(1020, 1190); // 1. move mouse upon the window
    //     robot.mouseToggle("down", "left"); // 2. toggle left key, 'down'
    //     setTimeout(() => {
    //       robot.dragMouse(1020, 900); // 3. drag window to (100, 100) from default (0, 0)
    //       robot.mouseToggle("up", "left"); // 4. toggle 'up'
    //     }, 500);
    //   }, 600);
    //   console.log("like");
    //   //   this.reset();
    //   this.secondMotor.speed = -1 * Math.min(message / 5, 10);
    // });

    ipcRenderer.on("5", (event, message) => {
      setTimeout(() => {
        robot.moveMouse(610, 590); // 1. move mouse upon the window
        robot.mouseClick("left", true);
      }, 100);

      console.log("roboto");
    });

    ipcRenderer.on("6", (event, message) => {
      setTimeout(() => {
        robot.moveMouse(0, 590); // 1. move mouse upon the window
        robot.mouseClick("left", true);
      }, 100);
    });

    // ipcRenderer.on("9", (event, message) => {
    //   setTimeout(() => {
    //     robot.moveMouse(0, 900); // 1. move mouse upon the window
    //     robot.mouseToggle("down", "left"); // 2. toggle left key, 'down'
    //     setTimeout(() => {
    //       robot.dragMouse(610, 900); // 1. move mouse upon the window
    //       robot.mouseToggle("up", "left"); // 4. toggle 'up'
    //     }, 1000);
    //   }, 100);
    //   console.log("like");
    //   //   this.reset();
    //   this.secondMotor.speed = -1 * Math.min(message / 5, 10);
    // });

    ipcRenderer.on("7", (event, message) => {
      setTimeout(() => {
        robot.moveMouse(1305, 900); // 1. move mouse upon the window
        robot.mouseToggle("down", "left"); // 2. toggle left key, 'down'
        setTimeout(() => {
          robot.dragMouse(1920, 900); // 1. move mouse upon the window
          robot.mouseToggle("up", "left"); // 4. toggle 'up'
        }, 1000);
      }, 100);

      console.log("roboto");
    });

    ipcRenderer.on("8", (event, message) => {
      setTimeout(() => {
        robot.moveMouse(0, 590); // 1. move mouse upon the window
        robot.mouseClick("left", true);
      }, 100);
    });

    // ipcRenderer.on("12", (event, message) => {
    //   setTimeout(() => {
    //     robot.moveMouse(0, 900); // 1. move mouse upon the window
    //     robot.mouseToggle("down", "left"); // 2. toggle left key, 'down'
    //     setTimeout(() => {
    //       robot.dragMouse(610, 900); // 1. move mouse upon the window
    //       robot.mouseToggle("up", "left"); // 4. toggle 'up'
    //     }, 1000);
    //   }, 100);
    //   console.log("like");
    //   //   this.reset();
    //   this.secondMotor.speed = -1 * Math.min(message / 5, 10);
    // });

    ipcRenderer.on("clap", (event, message) => {
      setTimeout(() => {
        robot.dragMouse(10, 900); // 3. drag window to (100, 100) from default (0, 0)
        robot.mouseToggle("down", "left"); // 2. toggle left key, 'down'
        setTimeout(() => {
          robot.dragMouse(200, 900); // 3. drag window to (100, 100) from default (0, 0)
          robot.mouseToggle("up", "left"); // 4. toggle 'up'
          // this.thirdMotor.radius = 200;
        }, 500);
      }, 100);
      //   change properties from motor 2:
      this.thirdMotor.radius = message * 100;
      this.thirdMotor.speed = Math.min(message / 120, 10);
      this.thirdMotor.tint = 50 + message * 4;
      console.log(event);
    });
  }

  onResize(e) {
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    // update mainmotor
    this.mainMotor.ancestor = {
      targetx: this.w / 2,
      targety: this.h / 2,
    };
  }

  buildMotors() {
    this.mainMotor = new Motor(this.ctx, {
      targetx: this.w / 2,
      targety: this.h / 2,
    });

    this.secondMotor = new Motor(this.ctx, this.mainMotor);
    this.secondMotor.color = "rgba(255,255,255,1)";
    this.secondMotor.radius = 250;
    this.secondMotor.shouldDraw = true;
    this.secondMotor.speed = -3 / 5;
    // this.secondMotor.log = true;

    this.thirdMotor = new Motor(this.ctx, this.secondMotor);
    this.thirdMotor.color = "rgba(255,255,255,1)";
    this.thirdMotor.radius = 60;
    this.thirdMotor.tint = 54;
    this.thirdMotor.shouldDraw = true;
    // this.thirdMotor.log = true;
    this.thirdMotor.speed = 0.1;
  }

  reset() {
    this.mainMotor.angle = 0;
    this.secondMotor.angle = 0;
    this.secondMotor.points = [];
    this.thirdMotor.angle = 0;
    this.thirdMotor.points = [];
  }

  draw() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.mainMotor.update();
    this.secondMotor.update();
    this.secondMotor.draw(this.lineW, this.filter, this.strokeStyle);
    this.thirdMotor.update();
    this.thirdMotor.draw(this.lineW, this.filter, this.strokeStyle);
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = () => {
  new SimulatedMechanics();
};
