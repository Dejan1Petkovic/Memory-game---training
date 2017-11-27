var level = 1;
var grid = 4;
var gridSize = 200;
var theEnd = 2;
var move = 0;
var secondsBack = 10;
nivo();

function nivo() {
  if (localStorage.getItem('level') == null) {
    level1();
  } else if (localStorage.getItem('level') == 2) {
    level2();
  }else if (localStorage.getItem('level') == 3) {
    level3();
  }
}

function level1() {
  playGame();
}

function level2() {
  level = 2
  grid = 16;
  theEnd = 8;
  icons1 = icons2;
  gridSize = 400;
  secondsBack = 60;
  playGame();
}

function level3() {
  level = 3
  grid = 36;
  theEnd = 18;
  icons1 = icons3;
  gridSize = 600;
  secondsBack = 60;
  playGame();
}

function playGame() {
  var con = document.getElementsByClassName('tableGrid')[0];
  var textLevel = document.getElementById('textLevel');
  var timer = document.querySelector('.timer');
  var twoClicks = [];
  var rand;
  var counter = 0;
  var finish = 0;
  createGrid1();
  var boxes = document.getElementsByClassName('kockica');
  returnCliks();

  function flipCards() {
    counter++;
    twoClicks.push(this);
    this.removeEventListener('click', flipCards);
    var back = this.children[0];
    var front = this.children[1];
    front.style.transform = "perspective(900px) rotateY(180deg)";
    back.style.transform = "perspective(900px) rotateY(0deg)";
    if (counter == 2) {
      removeCliks();
      checkCards();
    }
  }

  function checkCards() {
    var back1 = twoClicks[0].children[0];
    var back2 = twoClicks[1].children[0];
    var front1 = twoClicks[0].children[1];
    var front2 = twoClicks[1].children[1];
    if (back1.innerHTML == back2.innerHTML) {
      finish++;
      move -= secondsBack;
      twoClicks.length = 0;
      counter = 0;
      returnCliks()
      if (finish == theEnd) {
        if (level == 3) {
          alert('KRAJ IGRICE');

        }else {
          localStorage.setItem('level',level + 1);
          alert('Igra je zavrsena, idemo na level'+ (level +1));
          move = 0;
          nivo();
        }
      }
    } else {
      setTimeout(function() {
        front1.style.transform = "perspective(900px) rotateY(0deg)";
        back1.style.transform = "perspective(900px) rotateY(180deg)";
        front2.style.transform = "perspective(900px) rotateY(0deg)";
        back2.style.transform = "perspective(900px) rotateY(180deg)";
        twoClicks.length = 0;
        counter = 0;
        returnCliks();
      }, 700);
    }
  }

  function returnCliks() {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].addEventListener('click', flipCards);
    }
  }

  function removeCliks() {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].removeEventListener('click', flipCards);
    }
  }

  function createGrid1() {
    textLevel.innerHTML = 'Level' + level;
    con.style.width = gridSize + 'px';
    con.style.height = gridSize + 'px';
    var boxes = '';
    for (let i = 0; i < grid; i++) {
      rand = Math.floor(Math.random() * icons1.length);
      boxes += '<div class="kockica">';
      boxes += '<div class="back">' + icons1[rand] + '</div>';
      boxes += '<div class="front"></div>';
      boxes += '</div>';
      icons1.splice(rand, 1);
    }
    con.innerHTML = boxes;
    createTimer();
  }

  function createTimer() {
    timer.style.height = gridSize+'px';
    timer.innerHTML = `<div class="time"></div>`;
    var time = document.querySelector('.time');
    var loop = setInterval(function () {
      move += 5;
      time.style.height = move + 'px';
      if (move >= gridSize) {
        clearInterval(loop);
        alert('Isteklo je vreme');
        move = 0;
        nivo();
      }
    },750);
  }
}
