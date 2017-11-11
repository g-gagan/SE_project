<?php
	extract($_GET);

	$f = fopen("../info/".$tfile, "r");
	$txt = fread($f, filesize("../info/".$tfile));
	echo $txt;
?>