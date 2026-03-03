// Particle Background Setup
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];

// Configuration
const particleCount = 100;
const connectionDistance = 150;
const colors = ["#00f2fe", "#ff4b2b", "#2bff88", "#a020f0"];

function init() {
  resize();
  createParticles();
  animate();
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around edges
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function createParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  // Update and draw particles
  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        const opacity = 1 - distance / connectionDistance;
        // Create a gradient line between the two particles' colors
        const gradient = ctx.createLinearGradient(
          particles[i].x,
          particles[i].y,
          particles[j].x,
          particles[j].y,
        );

        // Extract base color values to add opacity
        const color1 = hexToRgb(particles[i].color);
        const color2 = hexToRgb(particles[j].color);

        if (color1 && color2) {
          gradient.addColorStop(
            0,
            `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${opacity * 0.2})`,
          );
          gradient.addColorStop(
            1,
            `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${opacity * 0.2})`,
          );

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  requestAnimationFrame(animate);
}

// Helper to convert hex to rgb for opacity control
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Event Listeners
window.addEventListener("resize", resize);

// Add interaction to nodes
document.querySelectorAll(".node").forEach((node) => {
  node.addEventListener("mouseenter", () => {
    // Accelerate particles slightly when hovering over nodes
    particles.forEach((p) => {
      p.vx *= 1.1;
      p.vy *= 1.1;
    });
  });

  node.addEventListener("mouseleave", () => {
    // Reset speed
    particles.forEach((p) => {
      p.vx = (Math.random() - 0.5) * 0.5;
      p.vy = (Math.random() - 0.5) * 0.5;
    });
  });
});

// Start the animation
init();
