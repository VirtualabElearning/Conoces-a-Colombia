var bucket = [];
var score = 0;
var name;
var userId;
var chrono;
var qCount = 0;
var loop;
var asLoops;
var sound;
var asSounds;
var canChoose = false;
var times = [
	6.0, 5.4, 4.9, 4.4, 3.9, 3.5, 3.2, 2.9, 2.6, 2.3,
	2.1, 1.9, 1.7, 1.5, 1.4, 1.2, 1.1, 1.0, 0.9, 0.8,
	0.7, 0.6, 0.5, 0.5, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3,
	0.2, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1,
	0.1, 0.1, 0.1, 0.1, 0.1
];

var SCORE_POINTS = 1;
var MIN_HEIGHT = 280;

$(document).ready(function () {
	
	// Fix low resolution on iOS
	
	var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
	
	if (iOS) {
		fixLowRes();
		$(window).resize(fixLowRes);
	}
	
	// Image preloading
	
	var loader = new PxLoader();
	
	loader.addImage('images/alert-success.png');
	loader.addImage('images/bg-alert-fail.png');
	loader.addImage('images/bg-game-timer.png');
	loader.addImage('images/bg-home-clouds.png');
	loader.addImage('images/bg-home-vintage.png');
	loader.addImage('images/bg-score-seeds.png');
	loader.addImage('images/bt-game-answer.png');
	loader.addImage('images/bt-game-help.png');
	loader.addImage('images/bt-game-pause.png');
	loader.addImage('images/bt-home-back.png');
	loader.addImage('images/bt-home-play.png');
	loader.addImage('images/bt-modal-close.png');
	loader.addImage('images/bt-opt-home.png');
	loader.addImage('images/bt-opt-play.png');
	loader.addImage('images/bt-opt-replay.png');
	loader.addImage('images/bt-score-back.png');
	loader.addImage('images/bt-score-home.png');
	loader.addImage('images/bt-score-like.png');
	loader.addImage('images/help-answer.png');
	loader.addImage('images/help-clock.png');
	loader.addImage('images/home-title.png');
	loader.addImage('images/register-logo.png');
	loader.addImage('images/score-coffee.png');
	loader.addImage('images/score-title.png');
	
	loader.addCompletionListener(function () {
		$('.loading').removeClass('active-section');
		$('.register').addClass('active-section');
		loop.play('introConocesColombia');
	});
	
	loader.start();
	
	// Chronometer countdown initialization & callbacks
	
	chrono = new Chrono(function () {
		$('.game .timer .sec').html(chrono.getSeconds());
		$('.game .timer .dec').html(chrono.getDecimals());
	}, function () {
		canChoose = false;
		$('.game').find('.pause, .help, .timer').hide();
		
		$.ajax({
			url : 'index.php?action=correct',
			type : 'post',
			data : $.param([{ name: "id", value: $('.game .question').data('id') }]),
			dataType : 'json'
		}).done(function (response) {
			if (response) {
				if (response.status == 'success') {
					gameOver(response.correct);
				}
			}
		});
	});
	
	// Audio sprites & game sounds
	
	asLoops = {
		introConocesColombia:	[0, 14811],
		loop1:					[15000, 7419],
		loop2:					[23000, 7419],
		loop3:					[31000, 7419],
		loop4:					[39000, 7393],
		loop5:					[47000, 3709],
		loop6:					[51000, 1881],
		puntaje:				[53500, 14811],
	};
	
	asSounds = {
		abrirPopupCambio:		[0, 470],
		botonAyuda:				[1000, 967],
		botonJugarInicio:		[2500, 967],
		botonPausa:				[4000, 967],
		cerrarPopupCambio:		[5500, 888],
		entradaPregunta:		[7000, 1437],
		reintentar:				[9000, 470],
		respuestaCorrecta:		[10000, 1332],
		respuestaIncorrecta:	[12000, 3265],
		respuestaSeleccionada:	[16000, 888]
	};
	
	loop = new Howl({
		urls: ['audio/loops.mp3', 'audio/loops.ogg'],
		sprite: asLoops,
		loop : true
	});
	
	sound = new Howl({
		urls: ['audio/sounds.mp3', 'audio/sounds.ogg'],
		sprite: asSounds
	});
	
	// Register screen events
	
	$('.register form').submit(function () {
		var form = $(this);
		var inputName = form.find('input[name="name"]');
		var inputEmail = form.find('input[name="email"]');
		
		if (inputName.val() != '' && inputEmail.val() != '') {
			form.find('input').blur();
			
			$.ajax({
				url : form.attr('action'),
				type : form.attr('method'),
				data : form.serialize(),
				dataType : 'json'
			}).done(function (response) {
				if (response) {
					if (response.status == 'success') {
						userId = response.userId;
						name = inputName.val();
						
						$('.register').removeClass('active-section');
						$('.home').addClass('active-section');
					}
				}
			}).fail(function (req, status, error) {
				console.log(status + ":" + error);
			});
		} else {
			alert('Es necesario que diligencies todos los datos para jugar');
		}
		
		return false;
	});
	
	// Home screen events
	
	$('.home .back').on('mouseup touchend', function () {
		$('.home').removeClass('active-section');
		$('.register').addClass('active-section');
		return false;
	});
	
	$('.home .play').on('mouseup touchend', function () {
		$('.home').removeClass('active-section');
		$('.game').addClass('active-section');
		loop.stop();
		sound.play('botonJugarInicio');
		showModal('help');
		return false;
	});
	
	// Game screen events
	
	$('.game .pause').on('mouseup touchend', function () {
		chrono.stop();
		loop.stop();
		loop.play('puntaje');
		sound.play('botonPausa');
		showModal('options');
		return false;
	});
	
	$('.game .help').on('mouseup touchend', function () {
		chrono.stop();
		loop.stop();
		loop.play('puntaje');
		sound.play('botonAyuda');
		showModal('help');
		return false;
	});
	
	$('.game .answers a').on('mousedown touchstart', function () {
		var anchor = $(this);
		
		if (canChoose) {
			canChoose = false;
			chrono.stop();
			anchor.addClass('selected');
			sound.play('respuestaSeleccionada');
			$('.game').find('.pause, .help, .timer').hide();
			
			$.ajax({
				url : 'index.php?action=answer',
				type : 'post',
				data : $.param([{ name: "id", value: anchor.data('id') }]),
				dataType : 'json'
			}).done(function (response) {
				if (response) {
					if (response.status == 'success') {
						score += SCORE_POINTS;
						qCount++;
						qCount -= (qCount == times.length) ? 1 : 0;
						showAlert('success');
						sound.play('respuestaCorrecta');
						setTimeout(function () {
							hideAlert();
							showNextQuestion();
						}, 1000);
					} else if (response.status == 'fail') {
						if (response.correct) {
							gameOver(response.correct)
						}
					}
				}
			});
		}
		
		return false;
	});
	
	// Score screen events
	
	$('.score .share').on('mouseup touchend', function () {
		FB.ui({
			method: 'share',
			href: 'http://level4studios.com/apps/conocesacolombia',
		}, function(response){});
		
		return false;
	});
	
	$('.score .back').on('mouseup touchend', function () {
		sound.play('reintentar');
		restart();
		return false;
	});
	
	$('.score .go-home').on('mouseup touchend', function () {
		clean();
		$('.score').removeClass('active-section');
		$('.home').addClass('active-section');
		loop.play('introConocesColombia');
		return false;
	});
	
	// Help modal events
	
	$('.modal .help .close, .modal .help .ins').on('mouseup touchend', function () {
		if (!bucket.length) {
			startGame();
		} else {
			chrono.start();
			playQuestionLoop();
		}
		
		hideModal();
		return false;
	});
	
	// Options modal events
	
	$('.modal .options .close, .modal .options .resume').on('mouseup touchend', function () {
		chrono.start();
		playQuestionLoop();
		hideModal();
		return false;
	});
	
	$('.modal .options .restart').on('mouseup touchend', function () {
		chrono.stop();
		clean();
		showModal('help');
		return false;
	});
	
	$('.modal .options .go-home').on('mouseup touchend', function () {
		chrono.stop();
		clean();
		
		hideModal();
		$('.game').removeClass('active-section');
		$('.home').addClass('active-section');
		loop.play('introConocesColombia');
		return false;
	});
	
	// Alert events
	
	$('.alert .fail .close').on('mouseup touchend', function () {
		hideAlert();
		loop.stop();
		loop.play('puntaje');
		
		$('.score .name').html(name);
		$('.score .total').html(score);
		$('.game').removeClass('active-section');
		$('.score').addClass('active-section');
		return false;
	});
});

var fixLowRes = function () {
	var h = window.innerHeight;
	
	if (h < MIN_HEIGHT) {
		$('body').addClass('low-res');
	} else {
		$('body').removeClass('low-res');
	}
};

function shuffle(o)
{
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function showModal(window)
{
	if (window) {
		if (window.length > 0) {
			sound.play('abrirPopupCambio');
			$('.modal .active').removeClass('active');
			$('.modal .' + window).addClass('active');
			$('.modal').addClass('show-modal');
		}
	}
}

function hideModal()
{
	sound.play('cerrarPopupCambio');
	$('.modal').removeClass('show-modal');
}

function showAlert(window, answer)
{
	if (window) {
		if (window.length > 0) {
			$('.alert .active').removeClass('active');
			$('.alert .' + window).addClass('active');
			
			if (answer) {
				if (answer.length > 0) {
					$('.alert .' + window + ' .answer').html(answer);
				}
			}
			
			$('.alert').removeClass('hide-alert').addClass('show-alert');
			canChoose = false;
		}
	}
}

function hideAlert()
{
	$('.alert').removeClass('show-alert').addClass('hide-alert');
	canChoose = true;
}

function clean()
{
	questions = questions.concat(bucket);
	bucket.splice(0);
	score = 0;
	qCount = 0;
	loop.stop();
	
	$('.game .question .text').html('');
	$('.game .answers li a span').html('');
	$('.game .timer .sec').html('');
	$('.game .timer .dec').html('');
	$('.game').find('.pause, .help, .timer').hide();
}

function startGame()
{
	showNextQuestion();
}

function restart()
{
	clean();
	
	$('.score').removeClass('active-section');
	$('.game').addClass('active-section');
	
	showModal('help');
}

function gameOver(correct) {
	chrono.stop();
	loop.stop();
	showAlert('fail', correct);
	sound.play('respuestaIncorrecta');
	
	$.ajax({
		url : 'index.php?action=save',
		type : 'post',
		data : $.param([
			{
				name: "id",
				value: userId
			},
			{
				name: "score",
				value: score
			}
		]),
		dataType : 'json'
	}).done(function (response) {
		if (response) {
			if (response.status == 'success') {}
		}
	});
}

function playQuestionLoop()
{
	loop.stop();
	
	if (qCount < 5) {
		loop.play('loop' + (qCount + 1));
	} else {
		loop.play('loop6');
	}
}

function showNextQuestion()
{
	var i = Math.floor(Math.random()*questions.length);
	var question = questions[i];
	var answers = shuffle(question.answers);
	var group = Math.floor(Math.random()*5) + 1;
	
	group = 'group-' + group;
	bucket.push(question);
	questions.splice(i, 1);
	
	$('.game .answers')
		.removeClass('group-1')
		.removeClass('group-2')
		.removeClass('group-3')
		.removeClass('group-4')
		.removeClass('group-5')
		.addClass(group);
	
	$('.game .answers a.selected').removeClass('selected');
	$('.game .question').data('id', question.id);
	$('.game .question .text').html(question.text);
	
	for (var j in answers) {
		var answer = answers[j];
		var anchor = $($('.game .answers li')[j]).find('a');
		
		anchor.find('span').html(answer.text);
		anchor.data('id', answer.id);
	}
	
	sound.play('entradaPregunta');
	$('.game').addClass('question-intro');
	$('.game .answers').hide();
	playQuestionLoop();
	
	setTimeout(function () {
		$('.game .answers').show();
	}, 2500);
	
	setTimeout(function () {
		canChoose = true;
		$('.game').removeClass('question-intro');
		$('.game').find('.pause, .help, .timer').show();
		chrono.start(times[qCount]);
	}, 3000);
}