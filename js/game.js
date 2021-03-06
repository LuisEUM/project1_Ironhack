
class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.interval = null;
    this.background = null;

    this.player = new Player(ctx);
    this.arrwR = new ArrowR(ctx);
    this.arrwD = new ArrowD(ctx);
    this.transitions = []
    this.level = 0
    this.map = [];
    this.items = [];

    this.enemies = [];
    
    this.deleteEnemy = false;
    this.showMonsterLivesCooldown = 0;
    this.tick = 0;
    this.teck = 0
    this.origanlColor = this.ctx.fillStyle = "white";
    this.audio = new Audio("audio/theme.mp3");
    this.gameOverAudio = new Audio("audio/game-over.mp3");
    this.ctx.font = "80px Poppins";
    this.setListeners();
    this.init = true
    this.dark = false

    //status de el mapa 0 = normal 1= nextStage 2 = moster wave
    this.stageCombat = false

    this.stages = [
     {                                //NIVEL 1
          map: [
            //new Platform(this.ctx,50, 300, 200,40), izquierda
            //new Platform(this.ctx,750, 300, 200,40), derecha
            new Platform(this.ctx,400, 300, 200,40),
            new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
          ],
          items:[],
          enemies:[new DarkSlimes(this.ctx, 0, -300)],
          background: new Background(this.ctx)
      },
      {                                //NIVEL 2
        map: [
          //new Platform(this.ctx,50, 300, 200,40),izquierda
          new Platform(this.ctx,750, 300, 200,40),  
          //new Platform(this.ctx,400, 300, 200,40),
          new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
        ],
        items:[ new Item(this.ctx)],
        enemies:[new FastSlimes(this.ctx, 0, -100)],
        background: new Background(this.ctx)
    },
      {                                //NIVEL 3
        map: [
          new Platform(this.ctx,50, 300, 200,40),
          new Platform(this.ctx,750, 300, 200,40), 
          new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
        ],
        items:[ new Item(this.ctx)],
        enemies:[new FastSlimes(this.ctx), new DarkSlimes(this.ctx, 0, -300), new DarkSlimes(this.ctx, 960, -300)],
        background: new Background(this.ctx)
    },
    {                                //NIVEL 4
      map: [
        new Platform(this.ctx,50, 300, 200,40),
        new Platform(this.ctx,750, 300, 200,40),
        new Platform(this.ctx,400, 300, 200,40), 
        new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
      ],
      items:[ new Item(this.ctx)],
      enemies:[new SwordSlime (this.ctx), new DarkSlimes(this.ctx, 960, -300)],
      background: new Background(this.ctx)
  }, 
      {                                //NIVEL 5
      map: [
        new Platform(this.ctx,50, 300, 200,40),
        new Platform(this.ctx,750, 300, 200,40),
        new Platform(this.ctx,400, 300, 200,40), 
        new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
      ],
      items:[ new Item(this.ctx)],
      enemies:[new DarkSlimes(this.ctx, 0, -300, true), new AngrySlimes(this.ctx), new DarkSlimes(this.ctx, 960, -300)],
      background: new Background(this.ctx)
  }, 
  {                                //NIVEL 6
    map: [
      new Platform(this.ctx,5, 300, 200,40),
      new Platform(this.ctx,795, 300, 200,40),
      new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
    ],
    items:[ new Item(this.ctx)],
    enemies:[new LeafSlime (this.ctx, 0, -600, true), new FastSlimes(this.ctx, 0, -100)],
    background: new Background(this.ctx)
},
{                                //NIVEL 7
  map: [
    new Platform(this.ctx,50, 300, 200,40),
    new Platform(this.ctx,750, 300, 200,40),
    new Platform(this.ctx,400, 300, 200,40), 
    new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
  ],
  items:[ new Item(this.ctx)],
  enemies:[new LeafSlime (this.ctx, 0, -300, true), new LeafSlime (this.ctx, 960, -300),  new FastSlimes(this.ctx, 0, -100)],
  background: new Background(this.ctx)
},
{                                //NIVEL 8
  map: [
    new Platform(this.ctx,400, 300, 200,40), 
    new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR),
  ],
  items:[ new Item(this.ctx)],
  enemies:[new FireSlime (this.ctx, 0, 400, true), new SwordSlime (this.ctx, 900, 400, false)],
  background: new Background(this.ctx)
}, 
{                                //NIVEL 9
  map: [
    new Platform(this.ctx,50, 200, 200,40),
    new Platform(this.ctx,750, 200, 200,40), 
    new Platform(this.ctx,400, 350, 200,40),
    new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
  ],
  items:[],
  enemies:[new FastSlimes(this.ctx, 0, -300),new FastSlimes(this.ctx, 950, -300),new FireSlime(this.ctx, 550, -300),new LeafSlime(this.ctx, 0, -300),new LeafSlime(this.ctx, 950, -300)],
  background: new Background(this.ctx)
},
{                                //NIVEL 10
  map: [
    new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
  ],
  items:[],
  enemies:[new FireSlime(this.ctx, 0, null, true), new FireSlime(this.ctx, 960, -300)],
  background: new Background(this.ctx)
},
{                                //NIVEL 11
  map: [
    new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
  ],
  items:[],
  enemies:[new FastSlimes(this.ctx, 0, -300),new FastSlimes(this.ctx, 200, -300),new FastSlimes(this.ctx, 400, -300),new FastSlimes(this.ctx, 600, -300),new FastSlimes(this.ctx, 1000, -300)],
  background: new Background(this.ctx)
},
{                                //NIVEL 12
  map: [
    new Platform(this.ctx,50, 200, 200,40),
    new Platform(this.ctx,750, 200, 200,40), 
    new Platform(this.ctx,50, 350, 200,40),
    new Platform(this.ctx,750, 350, 200,40), 
    new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
  ],
  items:[],
  enemies:[new LeafSlime(this.ctx, 0, -300),new LeafSlime(this.ctx, 950, -300),new LeafSlime(this.ctx, 0, 290),new LeafSlime(this.ctx, 950, 290)],
  background: new Background(this.ctx)
},
{                                //NIVEL 13
  map: [
    new Platform(this.ctx,400, 300, 200,40),
    new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
  ],
  items:[],
  enemies:[new FireSlime(this.ctx, 0, -300),new LeafSlime(this.ctx, 950, -300),new FireSlime(this.ctx, 950, -300),new LeafSlime(this.ctx, 0, 290)],
  background: new Background(this.ctx)
},
{                                //NIVEL 14
  map: [
    new Platform(this.ctx,50, 200, 200,40),
    new Platform(this.ctx,750, 200, 200,40), 
    new Platform(this.ctx,50, 350, 200,40),
    new Platform(this.ctx,750, 350, 200,40), 
    new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
  ],
  items:[],
  enemies:[new LeafSlime(this.ctx, 0, -300),new LeafSlime(this.ctx, 950, -300),new LeafSlime(this.ctx, 0, 290),new LeafSlime(this.ctx, 950, 290),new LeafSlime(this.ctx, 0, 400),new LeafSlime(this.ctx, 950, 400)],
  background: new Background(this.ctx)
},
{                                //NIVEL 15
  map: [
    new Platform(this.ctx,50, 200, 200,40),
    new Platform(this.ctx,750, 200, 200,40), 
    new Platform(this.ctx,50, 350, 200,40),
    new Platform(this.ctx,750, 350, 200,40), 
    new Platform(this.ctx, 0,this.ctx.canvas.height - 65,this.ctx.canvas.width,65, PLATFORMS_FOREST_FLOOR)
  ],
  items:[],
  enemies:[new LeafSlime(this.ctx, 0, -300),new LeafSlime(this.ctx, 950, -300),new LeafSlime(this.ctx, 0, 290),new LeafSlime(this.ctx, 950, 290),new FireSlime(this.ctx, 0, 400),new FireSlime(this.ctx, 950, 400)],
  background: new Background(this.ctx)
},
    ]
    this.setupLevel()
  }


  start() {
    // TODO: play audio
    // TODO: init game loop: clear, draw, move, check collisions and randomly add enemy based on ticks
    this.interval = setInterval(() => {
      this.draw();
      this.move();

      this.tick++;

      if (this.tick > 100) {
        if (this.enemies.length < 2) {
          ///aqui agregamoos a los mounstruos
          this.tick = 0;
          //this.addEnemy();
        }
      }
      /// TODO implentar el ENDGAME
    }, 1000 / FPS);
  }

  stop() {
    this.audio.pause();
    clearInterval(this.interval);
    this.interval = null;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.enemies = this.enemies.filter((e) => e.isVisible());
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.checkCollisions();
    this.items.forEach((item) => item.draw());
    this.map.forEach((platform) => platform.draw());
    this.enemies.forEach((enemy) => enemy.draw());
    this.removeObjects()
    if(!this.stageCombat){
      this.arrwD.draw()
    }
    if(this.stageCombat && this.enemies.length === 0 && this.stages.length !== this.level + 1){
      this.arrwR.draw()
    }
    if(this.transitions.length !== 0){
      this.transitions.forEach((transition) => transition.draw());
    }
  }

  setupLevel(){
    this.map = this.stages[this.level].map
    this.items = this.stages[this.level].items
    this.background = this.stages[this.level].background
  }

  nextWave(){
    this.enemies = this.stages[this.level].enemies
  }

  nextLevel(){
    this.level++
    this.setupLevel()
  }

  move() {
    this.background.move();
    this.player.move();
    this.enemies.forEach((enemy) => enemy.move(this.player));
    this.items.forEach((item) => item.move());
    if(!this.stageCombat){
      this.arrwD.move()
    }
    if(this.stageCombat && this.enemies.length === 0 && this.stages.length !== this.level + 1){
      this.arrwR.move()
    }
    if(this.transitions.length !== 0){
      this.transitions.forEach((transition) => transition.move(this.dark,this.transitions));
    }
  }


  removeObjects(){ 
    this.enemies.forEach(
      (monster, index) => {
        if(monster.isAlive() === false){
          this.enemies.splice(index,1)
          if(Math.floor(Math.random() * 10) + 1>8){
            this.items.push(new Item(this.ctx, monster.x ,monster.y))
          } 
        }
      }
    );
  }

  Ctransition(){
    this.transitions.push(new Transition(ctx));
    setTimeout(() => {
      this.dark = true
    },1000);
    setTimeout(() => {
      this.dark = false
    },2000);
    
  } //circulo de transicion


  checkCollisions() {
    this.enemies.forEach((enemy) => {
      //checkear todos los enemigos del mapa
      if (this.player.collides(enemy, this.player)){
        
      }
    })
    //platform check
    let platformscheck = null
    this.map.forEach((platform) => {   
      platformscheck = platform.collider(this.player,platformscheck, true)
    this.enemies.forEach((enemy) => {  
      enemy.platformscheck =  platform.collider(enemy, enemy.platformscheck)
    })
    })
    //items check
    this.items.forEach((item,index) => {   
      if(item.collides(this.player)){
        this.items.splice(index,1);
      }
    })
    //Start monsterWave
    if(!this.stageCombat){ //se activa el colaider del centro
        const colMonX = 
            400 <= this.player.x  &&  //derecha del player
            600 >= this.player.x;  //el mounstro esta a la izquierda
        const colMonY = 
            350 <= this.player.y; //abajo del player
        if (colMonX && colMonY) {//se activan los enemigos
            this.nextWave()
            this.stageCombat = true
        }
    }
    //Next Stage
    else if(this.stageCombat && this.enemies.length === 0 && this.stages.length !== this.level + 1){ //no ha mas mounstros
        const colNextX = 
          900 <= this.player.x  &&  //derecha del player
          1100 >= this.player.x;  //el mounstro esta a la izquierda
        const colNextY = 
            200 <= this.player.y; //abajo del player      
        if (colNextX && colNextY) {//se activanla tansicion al siguiente mounstruo
          this.Ctransition()
          this.stageCombat = false
          setTimeout(() => {
            this.nextLevel()
            this.player.x = 0
            this.player.y = 340
          }, 500);  
        }
    }
    else if(this.stages.length == this.level + 1 && this.enemies.length === 0 ){
      this.ctx.font = "60px Poppins";
      this.ctx.fillText("Thanks for helping ghosty!!", 100, 200);
      this.ctx.font = "30px Poppins";
      this.ctx.fillText("We hope that you have enjoyed this game.", 100, 250);

    }

    if(this.player.life.isAlive() === false){
      this.player.characterImg.src = GOUSTY_GAMEOVER
      this.gameOver()
      game.stop()
    }
  }

  gameOver() {
    this.ctx.font = "80px Poppins";
    this.ctx.fillText("GAME OVER", 270, 300);
  setTimeout(() => {
    this.stop();
  }, 500);
  }

  setListeners() {
    document.addEventListener("keydown", (event) =>
      this.player.keyDown(event.key)
    );
    document.addEventListener("keyup", (event) => this.player.keyUp(event.key));
  }
}
//probando
