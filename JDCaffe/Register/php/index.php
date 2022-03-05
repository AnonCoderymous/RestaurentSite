<?php
	if(isset($_POST['btn']) && $_SERVER['REQUEST_METHOD'] === 'POST'){
		$file = fopen("Users.txt", "a");
		foreach ($_POST as $key => $value) {
			if(strpos($value, "'")!==false){
				$value = str_replace("'", "", $value);
			}
			fwrite($file, $key);
			fwrite($file, "=");
			fwrite($file, $value);
			fwrite($file, "\n");
		}
		fwrite($file, "\n");
		fclose($file);
		if(file_exists("Users.txt")){
			$content = file_get_contents("Users.txt");
			if(strlen($content) > 0){
				echo "Success";
			} else {
				echo "Failed";
			}
		}
	} else {
		echo "NOT A POST REQUEST_METHOD";
	}
	exit;
?>