
//  Botones animados
let info = document.querySelector('.buttonInfo');

let showInfo = bodymovin.loadAnimation({
  container: info,
  remderer: 'svg',
  loop: true,
  autoplay: false,
  path: '/js/animations/help.json',
  mode:"cursor", 
})


  info.addEventListener('click', (e) => {
      showInfo.play();
      setTimeout(() => {
      showInfo.stop();

      }, 1500);
    });


let animationArrowGousty = bodymovin.loadAnimation({
  container: document.getElementById('gousty-arrow'),
  remderer: 'svg',
  loop: true,
  autoplay: true,
  path: '/js/animations/arrorForGousty.json'
})


let iconPlay = document.querySelector('.buttonPlayAndPause')
let playButton = bodymovin.loadAnimation({
  container: iconPlay,
  remderer: 'svg',
  loop: false,
  autoplay: false,
  path: '/js/animations/playPause.json',
  mode:"cursor", 
})

var directionMenu = 1;  
    iconPlay.addEventListener('click', (e) => {
      playButton.setDirection(directionMenu);
      playButton.play();
      directionMenu = -directionMenu;
      iconPlay.classList.toggle('pause')
      iconPlay.classList.toggle('play')
      game.stop()

      if(iconPlay.classList.contains('play') === true){
        let tutorialSection = document.getElementById('tutorial-canvas')
        tutorialSection.classList.add('hiddenStart')
        let gameSection = document.getElementById('canvas')
        gameSection.classList.remove('hiddenStart')
        game.start()
      } else {
        game.stop()
      }
    });

let reload = document.querySelector('.buttonRestart');

let doReload = bodymovin.loadAnimation({
  container: reload,
  remderer: 'svg',
  loop: false,
  autoplay: false,
  path: '/js/animations/restart.json',
  mode:"cursor", 
})

  reload.addEventListener('click', (e) => {
      doReload.play();
      setTimeout(() => {
        location.reload();
      }, 1000);
    });


let animation = bodymovin.loadAnimation({
    container: document.getElementById('downArrow'),
    remderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/js/animations/downArrows.json'
})

let animationYesButton = bodymovin.loadAnimation({
    container: document.getElementById('yesButton'),
    remderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/js/animations/yesButton.json'
})

let animationNoButton = bodymovin.loadAnimation({
    container: document.getElementById('noButton'),
    remderer: 'svg',
    loop: false,
    autoplay: false,
    path: '/js/animations/noButton.json',
},
)

const element = document.getElementById("noButton");
element.addEventListener("click", noButton);

function noButton() {
    animationNoButton.play= true
      alert('Really?!... Are you sure?:(')
}



// hero con fondo de burbujas
const colors = [
    '#652d90',
  
  ];

  createSquare = () => {
    const section = document.querySelector('section');
    const square = document.createElement('span');
    square.classList.add('bubbles')
    const size = Math.random() * 50;
    
    square.style.width = 20 + size + 'px';
    square.style.height = 20 + size + 'px';
    
    square.style.top = Math.random() * innerHeight -50 + 'px' ;
    square.style.left = Math.random() * innerWidth- 50 + 'px';
    
    square.style.background = colors[Math.floor(Math.random() * colors.length)];
    section.appendChild(square);
    
    setTimeout(() => {
      square.remove()
    }, 5000);
  }
  
  setInterval(createSquare, 150);

    window.addEventListener("keydown", function(e) {
      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
      }
  }, false);


//setear todos los eventos por defecto con las flechas
    window.addEventListener("keydown", function(e) {
      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
      }
  }, false);
  //inicio de las lineas coloridas


function startNewGame(){
    game.start()
    let tutorialSection = document.getElementById('tutorial-canvas')
    tutorialSection.classList.add('hiddenStart')
    let gameSection = document.getElementById('canvas')
    gameSection.classList.remove('hiddenStart')
}