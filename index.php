<?php

define('VALID_ACCESS', 1);
include('lib/idiorm/idiorm.php');

ORM::configure('mysql:host=localhost;dbname=virtuala_conoces');
ORM::configure('username', 'virtuala_conoces');
ORM::configure('password', 'g2t8rg#5B6G9h1cX');
ORM::configure('driver_options', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));





session_start();

if ($_POST) {
	if ($_GET) {
		$action = (isset($_GET['action'])) ? $_GET['action'] : 'none';
		$response = new stdClass();
		
		$response->status = 'fail';
		
		switch ($action) {
			case 'register':
				if (isset($_POST['name']) && isset($_POST['email'])) {
					$name	= $_POST['name'];
					$email	= $_POST['email'];
					$user	= ORM::forTable('user')->where('Email', $email)->findOne();
					
					if (!$user) {
						$user = ORM::forTable('user')->create();
						$user->FullName = $name;
						$user->Email = $email;
						$user->save();
					}
					
					$_SESSION['name'] = $name;
					$_SESSION['email'] = $email;
					
					$response->status = 'success';
					$response->userId = $user->UserID;
				}
				
				break;
			case 'answer':
				if (isset($_POST['id'])) {
					$id = intval($_POST['id']);
					$answer = ORM::forTable('answer')->where(array(
						'AnswerID' => $id,
					))->findOne();
					
					if ($answer->Correct) {
						$response->status = 'success';
					} else {
						$correct = ORM::forTable('answer')->where(array(
							'QuestionID' => $answer->QuestionID,
							'Correct' => 1
						))->findOne();
						
						if ($correct) {
							$response->correct = $correct->Text;
						}
					}
				}
				
				break;
			case 'correct':
				if (isset($_POST['id'])) {
					$id = intval($_POST['id']);
					$correct = ORM::forTable('answer')->where(array(
						'QuestionID' => $id,
						'Correct' => 1
					))->findOne();
					
					if ($correct) {
						$response->status = 'success';
						$response->correct = $correct->Text;
					}
				}
				break;
			case 'save':
				if (isset($_POST['id']) && isset($_POST['score'])) {
					$id = intval($_POST['id']);
					$score = intval($_POST['score']);
					
					$record = ORM::forTable('score')->create();
					$record->UserID = $id;
					$record->Points = $score;
					$record->save();
					
					$response->status = 'success';
				}
				
				break;
		}
		
		echo json_encode($response);
		exit();
	}
}

$data = array();
$questions = ORM::forTable('question')->findMany();

foreach ($questions as $_question) {
	$question = new stdClass();
	
	$question->id		= $_question->QuestionID;
	$question->text		= $_question->Text;
	$question->answers	= array();
	
	$answers = ORM::forTable('answer')->where('QuestionID', $question->id)->findMany();
	
	foreach ($answers as $_answer) {
		$answer = new stdClass();
		
		$answer->id		= $_answer->AnswerID;
		$answer->text	= $_answer->Text;
		
		$question->answers[] = $answer;
	}
	
	$data[] = $question;
}

$data = json_encode($data);

include('views/home.php');

?>