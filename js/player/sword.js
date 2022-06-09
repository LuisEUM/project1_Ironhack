class Sword {
    constructor (ctx, x, y, playerIsLookingRigth, PlayerIsLookingLeft, changeSprite, isOnEarth){
        this.ctx = ctx

        this.w = 182.4574
        this.h = 175.5429
        this.x = x
        this.y = y
        this.playerIsLookingRigth = playerIsLookingRigth
        this.PlayerIsLookingLeft = PlayerIsLookingLeft
        this.vx = 0;
        this.vy = 0;
        this.changeSprite = changeSprite;
        this.tick = 0;
    
        this.gravity = GRAVITY;
    
        this.swordImg = new Image();
        this.swordImg.frames = 3;
        this.swordImg.frameIndex = 0;
        this.swordImg.src = undefined
        this.isOnEarth= isOnEarth
    }

    draw() {
        if(this.isOnEarth === true){
            if(this.PlayerIsLookingLeft === true){ //Animacion en tierra
                switch (this.changeSprite) {
                    case 1:
                        this.swordImg.src = '/img/GOUSTY/SWORD/OnEarth/SWORD-ON_EARTH_LOOKING_LEFT1.png'  
                        break;
                    case 2:
                        this.swordImg.src = '/img/GOUSTY/SWORD/OnEarth/SWORD-ON_EARTH_LOOKING_LEFT2.png'  
                        break;
                    default:
                        this.swordImg.src = '/img/GOUSTY/SWORD/OnEarth/SWORD-ON_EARTH_LOOKING_LEFT1.png'
                        break;
                }
            }
            if(this.playerIsLookingRigth === true){
                switch (this.changeSprite) {
                    case 1:
                        this.swordImg.src = '/img/GOUSTY/SWORD/OnEarth/SWORD-ATTACK-RIGTH2_3FPS.png'  
                        break;
                    case 2:
                        this.swordImg.src = '/img/GOUSTY/SWORD/OnEarth/SWORD-ATTACK-RIGTH1_3FPS.png'  
                        break;
                    default:
                        this.swordImg.src = '/img/GOUSTY/SWORD/OnEarth/SWORD-ATTACK-RIGTH2_3FPS.png'
                        break;
                }
            }
        }
        
        if(this.isOnEarth === false){ //Animacion en el aire
            if(this.PlayerIsLookingLeft === true){
                this.swordImg.src = '/img/GOUSTY/SWORD/OnAir/SWORD_ON_AIR_LEFT.png'  
            }
            if(this.playerIsLookingRigth === true){
                this.swordImg.src = '/img/GOUSTY/SWORD/OnAir/SWORD_ON_AIR_RIGTH.png'  
            }
        }
        
        this.ctx.drawImage(
            this.swordImg,
            (this.swordImg.width * this.swordImg.frameIndex) / this.swordImg.frames , 
            0, 
            this.swordImg.width / this.swordImg.frames, 
            this.swordImg.height,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }
    
    move() {
        this.tick++
        if ((this.tick % 2 === 0 )) { //velocidad de la animación, recuerda cambiar a la vez la velocidad de la animación en el personaje con el mismo valor
            this.swordImg.frameIndex++;
            if (this.swordImg.frameIndex >= this.swordImg.frames) {
            }
        }
    }
    }
