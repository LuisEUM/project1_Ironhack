class DarkSlimes {
  constructor(ctx) {
    // TODO: init player attributes: position, size, v, a, img, audio, score, tick
    this.ctx = ctx

    this.w = 100
    this.h = 100
    this.x = 150
    this.y = ctx.canvas.height - EARTH - this.h - 100

    this.vx = 0;
    this.vy = 0;

    this.tick = 0;

    this.tock = 0;
    this.bounceAttack = 0
    this.gravity = GRAVITY;

    this.characterImg = new Image();
    this.characterImg.frames = 6;
    this.characterImg.frameIndex = 0;
    this.characterImg.src = '/img/Dark_Slimes_Basic_Looking_LEFT.pnG'
    this.shadowballs = []

    // hacer saber al juego a donde mira el personaje principal
    this.characterIsLookingRigth = false;
    this.characterIsLookingLeft = true;

    // TODO: init enemy. set x,y randomly top or right.
    // TODO: play fireball audio
  }

  draw() {
    this.ctx.drawImage(
      this.characterImg,
      (this.characterImg.width * this.characterImg.frameIndex) / this.characterImg.frames , 
      0, 
      this.characterImg.width / 6, 
      this.characterImg.height,
      this.x,
      this.y + 10,
      this.w,
      this.h
    )

    this.shadowballs.forEach(shadowball => {
      shadowball.draw()
    })
  }

  move() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.tock++

    if (this.tock >= 120) {
      this.bounceAttack = Math.floor(Math.random()*10)
        if(this.bounceAttack >= 5){
          this.bigJumpAttack()
        }
      this.tock = 0
    } 

    if (this.y >= ctx.canvas.height - EARTH - this.h) {
      this.y = ctx.canvas.height - EARTH - this.h;
      this.vy = -6; // CON ESTO HACEMOS QUE SE MUEVA SALTANDO
    }

    if (this.characterIsLookingLeft){
      this.vx = -1
      this.characterImg.src = '/img/Dark_Slimes_Basic_Looking_LEFT.pnG'
    }

    if (this.characterIsLookingRigth){
      this.vx = 1
      this.characterImg.src = '/img/Dark_Slimes_Basic_Looking_RIGTH.pnG'
    }

    this.tick++;

    if (this.tick >= 15 && this.y >= ctx.canvas.height - EARTH - this.h) { 
      this.tick = 0;
      this.animate();
    }

    if (this.x + this.w > this.ctx.canvas.width) { //pared de la derecha
      this.x = this.ctx.canvas.width - this.w;
      this.vx = 0;
      this.characterIsLookingRigth = false
      this.characterIsLookingLeft = true
    }

    if (this.x < 0) {  //pared de la izquierda
      this.x = 0;
      this.vx = 0;
      this.characterIsLookingRigth = true
      this.characterIsLookingLeft = false
    }   
  }

  animate() {
    if (this.vy) {
      this.characterImg.frameIndex++;

      if (this.characterImg.frameIndex >= this.characterImg.frames) {
        this.characterImg.frameIndex = 0;
      }
    }
  }

  isVisible() {
    // TODO: return if enemy is inside the canvas based on x and y
  }

  collides(player) {
    const colX =
      this.x <= player.x + player.w - 20 && this.x + this.w > player.x;
    const colY = this.y + this.h > player.y && this.y < player.y + player.h;

    return colX && colY;
  }

  bigJumpAttack(){
    this.vy = -12;
  }
}


