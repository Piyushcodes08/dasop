let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15; // random tilt
  currentPaperX = 0;
  currentPaperY = 0;

  // Get mouse/touch position
  getClientPos(e) {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else {
      return { x: e.clientX, y: e.clientY };
    }
  }

  init(paper) {
    // Move (mouse + touch)
    document.addEventListener("mousemove", (e) => this.onMove(e, paper));
    document.addEventListener("touchmove", (e) => this.onMove(e, paper));

    // Start dragging (mouse + touch)
    paper.addEventListener("mousedown", (e) => this.onStart(e, paper));
    paper.addEventListener("touchstart", (e) => this.onStart(e, paper));

    // End dragging (mouse + touch)
    window.addEventListener("mouseup", () => this.onEnd());
    window.addEventListener("touchend", () => this.onEnd());
  }

  onStart(e, paper) {
    e.preventDefault();
    if (this.holdingPaper) return;

    this.holdingPaper = true;
    paper.style.zIndex = highestZ++;
    
    const pos = this.getClientPos(e);
    this.mouseTouchX = pos.x;
    this.mouseTouchY = pos.y;
    this.prevMouseX = pos.x;
    this.prevMouseY = pos.y;
  }

  onMove(e, paper) {
    if (!this.holdingPaper) return;

    const pos = this.getClientPos(e);
    this.mouseX = pos.x;
    this.mouseY = pos.y;

    this.velX = this.mouseX - this.prevMouseX;
    this.velY = this.mouseY - this.prevMouseY;

    this.currentPaperX += this.velX;
    this.currentPaperY += this.velY;

    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;

    paper.style.transform =
      `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
  }

  onEnd() {
    this.holdingPaper = false;
  }
}

// Apply to all papers
const papers = document.querySelectorAll(".paper");
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
