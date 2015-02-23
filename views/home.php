<?php if (!defined('VALID_ACCESS')) exit('No direct access allowed!'); ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimal-ui" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta property="og:title" content="¿Conoces a Colombia? ¡reta tus conocimientos con este juego!" />
	<meta property="og:description" content="Jugué y éste fue mi puntaje de cultura general sobre Colombia." />
	<meta property="og:image" content="http://level4studios.com/apps/conocesacolombia/images/home-title.png" />
	<link rel="stylesheet" type="text/css" href="css/cooperblackstd.css" />
	<link rel="stylesheet" type="text/css" href="css/cooperblackstd-italic.css" />
	<link rel="stylesheet" type="text/css" href="css/futurastd-book.css" />
	<link rel="stylesheet" type="text/css" href="css/futurastd-heavy.css" />
	<link rel="stylesheet" type="text/css" href="css/futurastd-light.css" />
	<link rel="stylesheet" type="text/css" href="css/futurastd-medium.css" />
	<link rel="stylesheet" type="text/css" href="css/normalize.css" />
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<title>¿Conoces a Colombia?</title>
</head>
<body>
	<div class="loading section active-section">
		<div class="body">
			<div class="logo">
				<img src="images/loading-logo.png" />
				<div class="text">cargando...</div>
			</div>
		</div>
	</div>
	<div class="register section">
		<div class="body">
			<div class="header">
				<div class="inner">
					<img src="images/register-logo.png" />
				</div>
			</div>
			<div class="content">
				<h2>Regístrate para jugar</h2>
				<form action="index.php?action=register" method="post">
					<ul class="no-list">
						<li>
							<input type="text" name="name" placeholder="Nombres y Apellidos" required />
						</li>
						<li>
							<input type="email" name="email" placeholder="E-mail" required />
						</li>
					</ul>
					<div class="submit">
						<input type="submit" value="Iniciar" />
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="home section">
		<div class="wrapper">
			<div class="body">
				<div class="frame">
					<div class="inner">
						<div class="title">
							<img src="images/home-title.png" />
						</div>
						<div class="bar"></div>
						<div class="text">Un divertido juego de preguntas</div>
						<a href="#" class="back">
							<img src="images/bt-home-back.png" />
						</a>
						<a href="#" class="play">
							<img src="images/bt-home-play.png" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="game section">
		<div class="wrapper">
			<div class="body">
				<div class="frame">
					<div class="inner">
						<div class="bar">
							<div class="question">
								<div class="text"></div>
							</div>
						</div>
						<a href="#" class="pause">
							<img src="images/bt-game-pause.png" />
						</a>
						<a href="#" class="help">
							<img src="images/bt-game-help.png" />
						</a>
						<div class="timer"><span class="sec"></span>.<span class="dec"></span></div>
						<ul class="answers no-list">
							<li class="first">
								<a href="#"><span></span></a>
							</li>
							<li class="second">
								<a href="#"><span></span></a>
							</li>
							<li class="third">
								<a href="#"><span></span></a>
							</li>
							<li class="fourth">
								<a href="#"><span></span></a>
							</li>
							<li class="fifth">
								<a href="#"><span></span></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="score section">
		<div class="wrapper">
			<div class="body">
				<div class="frame">
					<div class="inner">
						<div class="title">
							<img src="images/score-title.png" />
						</div>
						<p class="name"></p>
						<p>Alcanzaste</p>
						<p class="total"></p>
						<p>Puntos</p>
						<ul class="no-list">
							<li>
								<a href="#" class="back">
									<img src="images/bt-score-back.png" />
								</a>
							</li>
							<!--<li>
								<a href="#" class="share">
									<img src="images/bt-score-like.png" />
								</a>
							</li>-->
						</ul>
						<p class="url">
							<a href="http://www.virtualab.co" target="_blank">www.virtualab.co</a>
						</p>
						<div class="coffee">
							<img src="images/score-coffee.png" />
						</div>
						<a href="#" class="go-home">
							<img src="images/bt-score-home.png" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="fake section">&nbsp;</div>
	<div class="modal">
		<div class="body">
			<div class="help window">
				<div class="inner">
					<a href="#" class="close">
						<img src="images/bt-modal-close.png" />
					</a>
					<h3>Instrucciones</h3>
					<p>Responde la pregunta tocando la respuesta correcta</p>
					<div class="ins">
						<img src="images/help-answer.png" />
					</div>
					<p>Ten cuidado con el tiempo<img src="images/help-clock.png" /></p>
				</div>
			</div>
			<div class="options window">
				<div class="inner">
					<a href="#" class="close">
						<img src="images/bt-modal-close.png" />
					</a>
					<h3>Pausa</h3>
					<ul class="no-list">
						<li>
							<a href="#" class="resume">
								<img src="images/bt-opt-play.png" />
							</a>
						</li>
						<li>
							<a href="#" class="restart">
								<img src="images/bt-opt-replay.png" />
							</a>
						</li>
						<li>
							<a href="#" class="go-home">
								<img src="images/bt-opt-home.png" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="alert">
		<div class="body">
			<div class="success window">
				<img src="images/alert-success.png" />
			</div>
			<div class="fail window">
				<div class="inner">
					<a href="#" class="close">
						<img src="images/bt-modal-close.png" />
					</a>
					<h3>Lo sentimos,</h3>
					<p>La respuesta correcta es:</p>
					<p class="answer"></p>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" charset="utf-8">
		var questions = <?php echo $data; ?>;
	</script>
	<script>
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '1497438073841612',
			xfbml      : true,
			version    : 'v2.1'
		});
	};
	
	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	</script>
	<script type="text/javascript" charset="utf-8" src="js/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="js/PxLoader.js"></script>
	<script type="text/javascript" charset="utf-8" src="js/PxLoaderImage.js"></script>
	<script type="text/javascript" charset="utf-8" src="js/howler.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="js/chronometer.js"></script>
	<script type="text/javascript" charset="utf-8" src="js/main.js"></script>
</body>
</html>
