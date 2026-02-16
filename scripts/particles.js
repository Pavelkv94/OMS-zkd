(function () {
  const canvasBody = document.getElementById("zakodixnet_canvas");
  const drawArea = canvasBody.getContext("2d");

  let w, h, particles, tid;
  let isPaused = false;
  const delay = 200;

  const opts = {
    particleColor: "rgb(200,200,200)",
    lineColor: "rgb(200,200,200)",
    particleAmount: window.innerWidth < 640 ? 25 : 50,
    defaultSpeed: 1,
    variantSpeed: 1,
    defaultRadius: 2,
    variantRadius: 2,
    linkRadius: 200,
  };

  const rgb = opts.lineColor.match(/\d+/g);

  const resizeReset = function () {
    w = canvasBody.width = window.innerWidth;
    h = canvasBody.height = window.innerHeight;
  };

  const deBouncer = function () {
    clearTimeout(tid);
    tid = setTimeout(resizeReset, delay);
  };

  // Частица как класс для лучшей производительности
  function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = opts.particleColor;
    this.radius = opts.defaultRadius + Math.random() * opts.variantRadius;
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed
    };
  }

  Particle.prototype.update = function () {
    if (this.x >= w || this.x <= 0) this.vector.x *= -1;
    if (this.y >= h || this.y <= 0) this.vector.y *= -1;

  // Ограничение, чтобы не "улетали" за границы при ресайзе
    if (this.x > w) this.x = w;
    if (this.y > h) this.y = h;

    this.x += this.vector.x;
    this.y += this.vector.y;
  };

  Particle.prototype.draw = function () {
    drawArea.beginPath();
    drawArea.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    drawArea.fillStyle = this.color;
    drawArea.fill();
  };

  const linkPoints = function (p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const distanceSq = dx * dx + dy * dy;
    const limitSq = opts.linkRadius * opts.linkRadius;

    if (distanceSq < limitSq) {
      const opacity = 1 - Math.sqrt(distanceSq) / opts.linkRadius;
      drawArea.lineWidth = 0.5;
      drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
      drawArea.beginPath();
      drawArea.moveTo(p1.x, p1.y);
      drawArea.lineTo(p2.x, p2.y);
      drawArea.stroke();
    }
  };

  function loop() {
    if (!isPaused) {
      drawArea.clearRect(0, 0, w, h);

      // 1. Сначала обновляем и рисуем все точки
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      // 2. Рисуем линии (оптимизированный двойной цикл)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          linkPoints(particles[i], particles[j]);
        }
      }
    }
    window.requestAnimationFrame(loop);
  }

  function setup() {
    resizeReset();
    particles = [];
    for (let i = 0; i < opts.particleAmount; i++) {
      particles.push(new Particle());
    }
    window.requestAnimationFrame(loop);
  }

  // --- Оптимизации запуска ---

  // 1. Пауза, когда канвас вне экрана (экономит CPU/GPU)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      isPaused = !entries[0].isIntersecting;
    }, { threshold: 0.01 });
    observer.observe(canvasBody);
  }

  // 2. Слушатель ресайза
  window.addEventListener("resize", deBouncer);

  // 3. Отложенный старт после загрузки всей страницы (улучшает Lighthouse LCP/TBT)
  if (document.readyState === 'complete') {
    setTimeout(setup, 100);
  } else {
    window.addEventListener('load', () => setTimeout(setup, 200));
  }

})();