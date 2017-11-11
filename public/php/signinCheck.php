<?php

	extract($_GET);

	$f = fopen("../info/usrname.txt","r");
	$txt = fread($f,filesize("../info/usrname.txt"));

	/*foreach ($f as $value) 
	{
		echo $value."    ";
	}*/

	if(strpos($txt, $val) === false)
	{
		echo "Invalid User ID";
	}
	else
	{
		echo "Valid User ID";
	}

?>