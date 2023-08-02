const canvasBodyTech = document.getElementById("tech_canvas");
const ctxTech = canvasBodyTech.getContext("2d");

let resizeResetTech = function () {
  w = canvasBodyTech.width = window.innerWidth;
  hTech = canvasBodyTech.height = 686;
};

let symbols = [
  "OpenShift",
  "OpenStack",
  "Linux",
  "HTML",
  "SCSS",
  "CSS",
  "JS",
  "Node.js",
  "Java",
  "Redmine",
  "Kubernetes",
  "Ruby",
  "RoR",
  "Python",
  "React",
  "C#",
  "C++",
  "S3",
  "Ceph",
  "MiQ",
  "RHEL",
  "RHEV",
  ".NET",
  "TypeScript",
  "Jenkins",
  "Project",
  "Figma",
  "Waterfall",
  "Agile",
  "Oracle DB",
  "MSSQL DB",
  "MySQL",
  "PostgreSQL",
];
const optsTech = {
  particleColor: "rgb(200,200,200)",
  lineColor: "rgb(200,200,200)",
  defaultSpeed: 1,
  variantSpeed: 1,
};

window.addEventListener("resize", function () {
  deBouncerTech();
});

let deBouncerTech = function () {
  clearTimeout(tidTech);
  tidTech = setTimeout(function () {
    resizeResetTech();
  }, delayTech);
};

Letter = function (id, xPos, yPos) {
  this.x = Math.random() * w;
  this.y = Math.random() * hTech;
  this.symbol = symbols[id];
  this.speed = optsTech.defaultSpeed + Math.random() * optsTech.variantSpeed;
  this.directionAngle = Math.floor(Math.random() * 360);
  this.color = optsTech.particleColor;
  this.size = Math.floor(Math.random() * 40 + 12);
  this.vector = {
    x: Math.cos(this.directionAngle) * this.speed,
    y: Math.sin(this.directionAngle) * this.speed,
  };
  this.update = function () {
    this.border();
    this.x += this.vector.x;
    this.y += this.vector.y;
  };
  this.border = function () {
    if (this.x >= w || this.x <= 0) {
      this.vector.x *= -1;
    }
    if (this.y >= hTech || this.y <= 0) {
      this.vector.y *= -1;
    }
    if (this.x > w) this.x = w;
    if (this.y > hTech) this.y = hTech;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
  };
  this.draw = function () {
    ctxTech.beginPath();
    ctxTech.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctxTech.closePath();
    ctxTech.fillStyle = this.color;
    ctxTech.fill();
    ctxTech.save();
    ctxTech.translate(this.x, this.y);
    ctxTech.font = this.size + "px Arial";
    ctxTech.fillText(this.symbol, -30, 20);
    ctxTech.restore();
  };
};

function setupTech() {
  letters = [];
  resizeResetTech();
  for (let i = 0; i < symbols.length; i++) {
    letters.push(new Letter(i));
  }
  window.requestAnimationFrame(loopTech);
}

function loopTech() {
  window.requestAnimationFrame(loopTech);
  ctxTech.clearRect(0, 0, w, hTech);
  for (let i = 0; i < letters.length; i++) {
    letters[i].update();
    letters[i].draw();
  }
}

let delayTech = 200,
  tidTech,
  rgbTech = optsTech.lineColor.match(/\d+/g);
resizeResetTech();
setupTech();
