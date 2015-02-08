var game = $(".game-container");
var man = $(".man");
var timeRemaining = $('.timer');
var instructions = $('.instructions');
var timer = 60;
var startEasyMode = $(".easy");
var startMediumMode = $(".medium");
var startHardMode = $(".hard");
var gameStart = false;

// collision function
var collision = function($div1, $div2) {
  var x1 = $div1.offset().left;
  var y1 = $div1.offset().top;
  var h1 = $div1.outerHeight(true);
  var w1 = $div1.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $div2.offset().left;
  var y2 = $div2.offset().top;
  var h2 = $div2.outerHeight(true);
  var w2 = $div2.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
  	return false;
  } else {
  	return true;
  }
}

//one minute timer countdown//
var countdown = function() {
	setInterval(function() {
		timer -= 1;
    if (timer <= 0) {
      timer = 0;
    }
		$(".timer span").html(timer);
    return timer;
	}, 1000);
};

// moving directional keys
var moveIcon = function() {
	var maxValue = (game.width() + 20) - man.width(),
	    keysPressed = {},
	    distancePerIteration = 3;

	function calculateNewValue(oldValue, keyCode1, keyCode2) {
    var newValue = parseInt(oldValue, 10) - (keysPressed[keyCode1] ? distancePerIteration : 0) + (keysPressed[keyCode2] ? distancePerIteration : 0);
    return newValue < 0 ? 0 : newValue > maxValue ? maxValue : newValue;
	}

	$(window).keydown(function(event) { keysPressed[event.which] = true; });
	$(window).keyup(function(event) { keysPressed[event.which] = false; });

	setInterval(function() {
	  man.css({
      left: function(index ,oldValue) {
         return calculateNewValue(oldValue, 37, 39);
      }
	  });
	}, 10);
}

//function for random falling rocks//
var fallingRocks = function() {
  var rock = $('<div class="rock"><img src="images/comet.gif" alt=""></div>');
  game.prepend(rock);
	var rockX = Math.floor(Math.random() * (game.width() - 10));
  var rockSpeed = 2000;

  rock.css({
    'left': (rockX - 10) + 'px'
  });

  rock.animate({
    top: game.height(),
  }, rockSpeed, function() {
    $(this).remove();
  });

  collision(man, rock);
  //redirects player to losing page if collision is true//
	setInterval(function() {
		var collide = collision(man, rock);
		if (collide) {
      rock.animate().stop().hide();
      man.hide();
      //show the hidden div ontop of man of man breaking
			$('.game-over').show();
		}
	}, 100)

  //redirects the page if the game-over status is shown//
  if ($('.game-over').css('display') != 'none') {
    setTimeout(function() {
      window.location.replace("gameover.html");
    }, 1000)
  };
}

















//SCRIPT EXECUTION//
$(window).load(function() {

  $('.reset-button').click(function() {
    window.location.replace("index.html");
  });

  //easy mode//
  startEasyMode.click(function() {
    $(".start").hide();
    gameStart = true;
    instructions.hide();
    timeRemaining.show();
    moveIcon();
    countdown();

    setInterval(function() {
      fallingRocks();
    }, 400) //make delay argument decrease with time

    //redirects player to winning page if they lasted 60 seconds//

    setTimeout(function() {
      $('.game-win').show();
      setTimeout(function() {
        window.location.replace("gamewin.html");
      }, 1000);
    }, 60000);

  });

  //medium mode//
  startMediumMode.click(function() {
    $(".start").hide();
    gameStart = true;
    instructions.hide();
    timeRemaining.show();
    moveIcon();
    countdown();

    setInterval(function() {
      fallingRocks();
    }, 300) //make delay argument decrease with time

    //redirects player to winning page if they lasted 60 seconds//
    setTimeout(function() {
      $('.game-win').show();
      setTimeout(function() {
        window.location.replace("gamewin.html");
      }, 1000);
    }, 60000);

  });

  //hard mode//
	startHardMode.click(function() {
		$(".start").hide();
		gameStart = true;
    instructions.hide();
    timeRemaining.show();
    moveIcon();
    countdown();

    setInterval(function() {
      fallingRocks();
    }, 200) //make delay argument decrease with time

    //redirects player to winning page if they lasted 60 seconds//
    setTimeout(function() {
      $('.game-win').show();
      setTimeout(function() {
        window.location.replace("gamewin.html");
      }, 1000);
    }, 60000);

  });
});