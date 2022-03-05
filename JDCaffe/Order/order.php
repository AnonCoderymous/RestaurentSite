<?php
	if(isset($_POST['OrderItems'])){
		$f=fopen("Order.txt", "w");
		fwrite($f, $_POST['OrderItems']);
		fclose($f);
		echo "Success";
	} else {
		echo "Failed";
	}
?>